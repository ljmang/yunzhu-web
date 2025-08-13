<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 面包屑导航 -->
    <div class="max-w-7xl mx-auto px-4 py-4">
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NuxtLink
              to="/"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-yellow-500"
            >
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                ></path>
              </svg>
              Home
            </NuxtLink>
          </li>
          <li>
            <div class="flex items-center">
              <svg
                class="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <NuxtLink
                :to="`/blog/${article?.category?.slug || ''}`"
                class="ml-1 text-sm font-medium text-gray-700 hover:text-yellow-500 md:ml-2"
              >
                {{ article?.category?.name || 'Learn' }}
              </NuxtLink>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg
                class="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">{{
                article?.title || 'Article'
              }}</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>

    <!-- 文章内容 -->
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex gap-4">
        <!-- 文章分类列表 -->
        <div class="w-60 display-none p-2">
          <div class="flex flex-col gap-2">
            <h2 class="text-2xl font-bold mb-4">Learn Categories</h2>
            <div v-for="item in articleCategoryList" :key="item.id">
              <NuxtLink
                :to="`/blog/${item.slug}`"
                class="text-green-800 hover:text-yellow-500"
              >
                {{ item.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <!-- 文章内容 -->
        <div class="flex-1">
          <div v-if="article" class="prose max-w-none">
            <!-- 文章标题 -->
            <h1 class="text-4xl font-bold text-gray-900 mb-4">
              {{ article.title }}
            </h1>

            <!-- 文章元信息 -->
            <div class="flex items-center text-sm text-gray-500 mb-6">
              <Icon name="mdi:calendar" class="w-4 h-4 mr-2" />
              {{ formatDate(article.createdAt) }}
              <Icon name="mdi:folder" class="w-4 h-4 mx-2" />
              {{ article.category?.name }}
            </div>

            <!-- 文章摘要 -->
            <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <p class="text-green-800">{{ article.summary }}</p>
            </div>

            <!-- 文章封面图 -->
            <img
              v-if="article.cover"
              :src="article.cover"
              :alt="article.title"
              class="object-cover mb-6"
            />

            <!-- 文章内容 -->
            <div v-html="article.content" class="article-content"></div>
          </div>
          <div v-else class="text-center py-12">
            <p class="text-gray-500">文章加载中...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const articleSlug = computed(() => route.params.name)

  // 获取文章详情
  const { data: article } = await useFetch(
    `/api/articles/article/${articleSlug.value}`
  )
  console.log('article:', article.value)

  // 获取文章分类
  const { data: articleCategoryList } = await useFetch(
    '/api/article-categories'
  )
  console.log('category:', articleCategoryList.value)

  // 格式化日期
  const formatDate = dateString => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // SEO
  useHead({
    title: computed(() =>
      article.value
        ? `${article.value.title} - Yunzhu Industry`
        : 'Article - Yunzhu Industry'
    ),
    meta: [
      {
        name: 'description',
        content: computed(
          () => article.value?.summary || 'Article detail page'
        ),
      },
    ],
  })
</script>

<style scoped>
  .display-none {
    display: none;
  }

  @media (min-width: 1024px) {
    .display-none {
      display: block;
    }
  }

  .article-content {
    line-height: 1.8;
    color: #374151;
  }

  .article-content h2 {
    font-size: 1.875rem;
    font-weight: 600;
    color: #111827;
    margin-top: 2rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0.5rem;
  }

  .article-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .article-content p {
    margin-bottom: 1.5rem;
    color: #4b5563;
  }

  .article-content ul,
  .article-content ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  .article-content li {
    margin-bottom: 0.5rem;
    color: #4b5563;
  }

  .article-content ul li {
    list-style-type: disc;
  }

  .article-content ol li {
    list-style-type: decimal;
  }

  .article-content blockquote {
    border-left: 4px solid #3b82f6;
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #6b7280;
    background-color: #f8fafc;
    padding: 1rem;
    border-radius: 0.25rem;
  }

  .article-content code {
    background-color: #f3f4f6;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    color: #dc2626;
  }

  .article-content pre {
    background-color: #1f2937;
    color: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .article-content img {
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    max-width: 100%;
    height: auto;
  }

  .article-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }

  .article-content th,
  .article-content td {
    border: 1px solid #e5e7eb;
    padding: 0.75rem;
    text-align: left;
  }

  .article-content th {
    background-color: #f9fafb;
    font-weight: 600;
  }
</style>
