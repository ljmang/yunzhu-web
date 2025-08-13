<template>
  <div v-if="blog" class="max-w-7xl mx-auto p-4 lg:p-10">
    <!-- 面包屑导航 -->
    <nav class="flex items-center space-x-2 mb-8">
      <NuxtLink to="/" class="hover:text-yellow-500 flex items-center gap-2">
        <HomeIcon class="w-4 h-4" />Home
      </NuxtLink>
      <span>/</span>
      <NuxtLink to="/blog" class="hover:text-yellow-500 flex items-center gap-2">
        <ListBulletIcon class="w-4 h-4" />Blog
      </NuxtLink>
      <span class="display-none">/</span>
      <span class="text-gray-400 display-none">{{ blog.attributes.slug }}</span>
    </nav>

    <!-- 文章 -->
    <div class="flex gap-10">
      <article class="flex-1">
        <h1 class="text-3xl lg:text-4xl font-bold mb-4">
          {{ blog.attributes.title }}
        </h1>
        <!-- 日期 -->
        <div class="flex items-center text-gray-500 mb-6">
          <Icon name="mdi:calendar" class="w-4 h-4 mr-2" />
          <span>{{ formatDate(blog.attributes.createdAt) }}</span>
          <span class="mx-2">•</span>
          <Icon name="mdi:account" class="w-4 h-4 mr-2" />
          <span>{{ blog.attributes.author || 'Admin' }}</span>
        </div>

        <!-- 摘要 -->
        <div
          v-if="blog.attributes.summary"
          class="my-8 text-sm p-2 lg:p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500"
        >
          <p class="text-gray-700 leading-relaxed italic">
            {{ blog.attributes.summary }}
          </p>
        </div>

        <!-- 内容 -->
        <div class="prose prose-lg prose-green max-w-none leading-relaxed" v-html="renderedHtml"></div>
      </article>

      <!-- 目录 -->
      <div v-if="tableOfContents.length" class="w-70 lg:w-90 display-none">
        <div class="sticky top-10">
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-sm border border-gray-200">
            <h3 class="text-lg font-bold mb-4 text-gray-900 flex items-center">
              <Icon name="mdi:format-list-bulleted" class="w-5 h-5 mr-2 text-green-600" />
              Table of Contents
            </h3>
            <nav class="space-y-2">
              <a
                v-for="item in tableOfContents"
                :key="item.id"
                :href="`#${item.id}`"
                @click.prevent="scrollToSection(item.id)"
                class="block text-sm text-gray-600 hover:text-green-600 transition-all duration-200 hover:bg-green-50 px-2 py-1 rounded-md"
                :class="{
                  'pl-4': item.level === 2,
                  'pl-8': item.level === 3,
                  'pl-12': item.level === 4,
                  'font-medium text-green-700 bg-green-100': activeSection === item.id
                }"
              >
                <span class="text-green-500 font-mono mr-2">{{ item.number }}</span>
                {{ item.text }}
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 加载中 -->
  <div v-else-if="loading" class="max-w-4xl mx-auto py-10 px-4">
    <div class="text-center">
      <p>Loading...</p>
    </div>
  </div>

  <!-- 博客未找到 -->
  <div v-else class="max-w-4xl mx-auto py-10 px-4">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Blog Not Found</h1>
      <p class="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
      <NuxtLink to="/blog" class="text-green-800 hover:text-yellow-500"> Back to Blog </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  import {ref, onMounted, onUnmounted} from 'vue'
  import {useRoute} from 'vue-router'
  import {useStrapi} from '#imports' // 使用 Nuxt Strapi 模块的标准方式
  import {parseMarkdown} from '@/utils/markdownParser.js' // 导入 markdown 解析器

  const route = useRoute()
  const {getBlog} = useStrapi() // 从 useStrapi 获取 getBlog 方法

  const blog = ref(null) // 博客数据
  const loading = ref(true) // 加载状态
  const renderedHtml = ref('') // 渲染后的 HTML
  const tableOfContents = ref([]) // 目录
  const activeSection = ref('') // 活动章节

  // 滚动到指定章节
  const scrollToSection = id => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'})
      activeSection.value = id
    }
  }

  // 监听滚动，更新活动章节
  const updateActiveSection = () => {
    const headings = tableOfContents.value.map(item => document.getElementById(item.id)).filter(Boolean)
    const offset = 100

    for (let i = headings.length - 1; i >= 0; i--) {
      const heading = headings[i]
      if (heading.getBoundingClientRect().top <= offset) {
        if (activeSection.value !== heading.id) {
          activeSection.value = heading.id
        }
        return
      }
    }

    if (window.pageYOffset < 200) {
      activeSection.value = ''
    }
  }

  // 格式化日期
  const formatDate = dateString => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  onMounted(async () => {
    try {
      const blogData = await getBlog(route.params.slug) // 使用 getBlog 方法获取博客
      if (blogData) {
        blog.value = blogData

        if (blog.value?.attributes?.content) {
          // 关键！一次调用，同时获取转换后的 HTML 和目录
          const {html, toc} = parseMarkdown(blog.value.attributes.content)
          renderedHtml.value = html
          tableOfContents.value = toc
        }
      } else {
        blog.value = null // 博客未找到
      }
    } catch (error) {
      console.error('Error fetching blog:', error)
      blog.value = null
    } finally {
      loading.value = false
    }

    // 添加滚动监听
    window.addEventListener('scroll', updateActiveSection)
  })

  onUnmounted(() => {
    // 组件卸载时清理事件监听，防止内存泄漏
    window.removeEventListener('scroll', updateActiveSection)
  })
</script>

<style>
  .display-none {
    display: none;
  }

  @media (min-width: 1024px) {
    .display-none {
      display: block;
    }
  }

  /* 确保 prose 内容正确显示 */
  .prose {
    max-width: none !important;
  }

  .prose h1,
  .prose h2,
  .prose h3,
  .prose h4,
  .prose h5,
  .prose h6 {
    color: #111827 !important;
    font-weight: 700 !important;
    margin-top: 2em !important;
    margin-bottom: 1em !important;
  }

  /* 标题编号样式 */
  .prose h1::before,
  .prose h2::before,
  .prose h3::before,
  .prose h4::before,
  .prose h5::before,
  .prose h6::before {
    content: attr(data-number);
    color: #10b981 !important;
    font-weight: 600 !important;
    margin-right: 0.5rem !important;
    font-family: 'Courier New', monospace !important;
  }

  .prose h1 {
    font-size: 2.25rem !important;
    border-bottom: 2px solid #10b981 !important;
    padding-bottom: 0.5rem !important;
  }

  .prose h2 {
    font-size: 1.6rem !important;
    border-bottom: 1px solid #d1fae5 !important;
    padding-bottom: 0.25rem !important;
  }

  .prose h3 {
    font-size: 1.4rem !important;
  }

  .prose p {
    margin-bottom: 1.4em !important;
    line-height: 1.75 !important;
    color: #374151 !important;
  }

  .prose ul,
  .prose ol {
    margin-bottom: 1.5em !important;
    padding-left: 1.5em !important;
  }

  .prose li {
    margin-bottom: 0.5em !important;
    color: #374151 !important;
  }

  .prose ul > li {
    list-style-type: disc !important;
  }

  .prose ol > li {
    list-style-type: decimal !important;
  }

  .prose blockquote {
    border-left-color: #10b981 !important;
    background-color: #f0fdf4 !important;
    padding: 1rem 1.5rem !important;
    border-radius: 0.5rem !important;
    font-style: italic !important;
    margin: 2em 0 !important;
  }

  .prose blockquote p {
    margin: 0 !important;
    color: #111827 !important;
  }

  .prose code {
    background-color: #f3f4f6 !important;
    color: #dc2626 !important;
    padding: 0.2em 0.4em !important;
    border-radius: 0.375rem !important;
    font-size: 0.875em !important;
    font-weight: 600 !important;
  }

  .prose pre {
    background-color: #1f2937 !important;
    color: #f9fafb !important;
    padding: 1.5rem !important;
    border-radius: 0.75rem !important;
    overflow-x: auto !important;
    margin: 2em 0 !important;
  }

  .prose pre code {
    background-color: transparent !important;
    color: inherit !important;
    padding: 0 !important;
    border-radius: 0 !important;
    font-size: inherit !important;
    font-weight: inherit !important;
  }

  .prose a {
    color: #059669 !important;
    text-decoration: underline !important;
    text-decoration-color: #d1fae5 !important;
    text-underline-offset: 2px !important;
  }

  .prose a:hover {
    color: #047857 !important;
    text-decoration-color: #10b981 !important;
  }

  .prose table {
    width: 100% !important;
    border-collapse: collapse !important;
    margin: 2em 0 !important;
  }

  .prose thead th {
    background-color: #f9fafb !important;
    border-bottom: 2px solid #e5e7eb !important;
    padding: 0.75rem !important;
    text-align: left !important;
    font-weight: 600 !important;
  }

  .prose tbody td {
    border-bottom: 1px solid #e5e7eb !important;
    padding: 0.75rem !important;
  }

  .prose tbody tr:hover {
    background-color: #f9fafb !important;
  }

  .prose hr {
    border-color: #e5e7eb !important;
    margin: 3em 0 !important;
  }
</style>
