<template>
  <div>
    <!-- banner -->
    <div class="banner">
      <div class="p-8 mx-auto flex flex-col justify-center h-full text-white">
        <h1 class="text-3xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p class="text-base lg:text-xl max-w-2xl">
          Find answers to the most common questions about release agents, mold release solutions, and industrial
          applications. Our comprehensive FAQ covers everything from product selection to troubleshooting.
        </p>
      </div>
    </div>

    <!-- 内容区加 loading/error 包裹 -->
    <div class="max-w-7xl mx-auto py-10 px-4">
      <div v-if="loading" class="py-10">
        <LoadingSpinner text="Loading FAQs..." />
      </div>
      <div v-else-if="error" class="py-10">
        <ErrorState 
          title="Loading Failed" 
          description="Unable to load FAQs. Please try again later."
          :error="error"
          @retry="fetchFaqs"
        />
      </div>
      <div v-else>
        <!-- 搜索框 -->
        <!-- <div class="mb-8">
        <div class="relative max-w-md mx-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search FAQs..."
            class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-200 focus:scale-105"
          />
          <Icon name="mdi:magnify" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div> -->

        <!-- FAQ分类 -->
        <div class="mb-8">
          <div class="flex flex-wrap gap-2 justify-center">
            <button v-for="category in faqCategories" :key="category.id" @click="selectedCategory = category.id" :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              selectedCategory === category.id
                ? 'bg-green-600 text-white shadow-md scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]">
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- FAQ列表 -->
        <div class="space-y-6">
          <div v-for="faq in filteredFaqs" :key="faq.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg faq-item">
            <button @click="toggleFaq(faq.id)"
              class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
              <h3 class="text-lg font-semibold text-gray-900 pr-4">
                {{ faq.attributes?.question }}
              </h3>
              <Icon :name="expandedFaqs.includes(faq.id) ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                class="w-5 h-5 text-gray-500 flex-shrink-0" />
            </button>
            <div v-show="expandedFaqs.includes(faq.id)" class="px-6 pb-4 border-t border-gray-100">
              <div class="pt-4 prose prose-md max-w-none">
                <div v-html="faq.attributes?.answer" class="text-gray-700 leading-relaxed"></div>
                <div v-if="faq.attributes?.tips" class="bg-gray-100 border-l-4 border-green-400 rounded-lg p-4 mt-4">
                  <h4 class="text-gray-800 text-sm font-semibold mb-2">💡 Pro Tip:</h4>
                  <p class="text-gray-800 text-sm leading-6 m-0">{{ faq.attributes?.tips }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 联系支持 -->
        <div class="mt-12 text-center">
          <div class="bg-gradient-to-r from-green-50 via-green-100 to-blue-100 rounded-xl p-8 mt-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our technical support team is here to help with any specific
              questions about release agents and their applications.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink to="/contact-us"
                class="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center gap-2">
                <Icon name="mdi:email" class="w-5 h-5 mr-2" />
                Contact Support
              </NuxtLink>
              <a href="tel:+1234567890"
                class="bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 transition-all duration-300 hover:bg-gray-100 flex items-center gap-2">
                <Icon name="mdi:phone" class="w-5 h-5 mr-2" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'

// 响应式数据
const searchQuery = ref('') // 搜索关键词
const selectedCategory = ref(0) // 默认选中“全部”
const expandedFaqs = ref([]) // 展开的FAQ列表

// 从 Strapi 获取 FAQ 数据
const { getFaqs, getFaqCategories } = useStrapi()

// FAQ分类和内容
const faqCategories = ref([]) // FAQ分类
const faqs = ref([]) // FAQ列表
const loading = ref(true) // 加载状态
const error = ref(null) // 错误信息

// 获取 FAQ 分类
const fetchFaqCategories = async () => {
  const strapiFaqCategories = await getFaqCategories()
  console.log('strapiFaqCategories', strapiFaqCategories)
  if (strapiFaqCategories && strapiFaqCategories.length > 0) {
    faqCategories.value = [
      { id: 0, name: 'All Questions' },
      ...strapiFaqCategories.map(cat => ({
        id: cat.id,
        name: cat.attributes.name
      }))
    ]
  }
}

// 获取 FAQ 数据
const fetchFaqs = async () => {
  try {
    loading.value = true // 设置加载状态
    const strapiFaqs = await getFaqs() // 获取FAQ数据
    console.log('strapiFaqs', strapiFaqs)
    if (strapiFaqs && strapiFaqs.length > 0) {
      faqs.value = strapiFaqs // 设置FAQ列表
    }
  } catch (err) {
    console.error('Failed to fetch FAQs from Strapi:', err)
    error.value = 'Failed to load FAQs'
  } finally {
    loading.value = false
  }
}

// 页面加载时获取数据
onMounted(() => {
  fetchFaqCategories()
  fetchFaqs() // 页面加载时获取数据
})

// 计算属性：过滤FAQ
const filteredFaqs = computed(() => {
  let filtered = faqs.value // 过滤后的FAQ列表
  // 按分类过滤
  if (selectedCategory.value !== 0) {
    // 0 表示全部
    filtered = filtered.filter(faq => faq.attributes?.cate_faq?.data?.id === selectedCategory.value)
  }
  // 按搜索关键词过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase() // 搜索关键词
    filtered = filtered.filter(
      faq => faq.attributes?.question?.toLowerCase().includes(query) || faq.attributes?.answer?.toLowerCase().includes(query)
    )
  }
  return filtered
})

// 方法：切换FAQ展开状态
const toggleFaq = (faqId) => {
  const index = expandedFaqs.value.indexOf(faqId) // 切换FAQ展开状态
  if (index > -1) {
    expandedFaqs.value.splice(index, 1) // 收起FAQ
  } else {
    expandedFaqs.value.push(faqId) // 展开FAQ
  }
}

// SEO优化
useHead({
  title: 'Release Agent FAQs - Common Questions & Answers | Yunzhu Industry',
  meta: [
    {
      name: 'description',
      content:
        'Find answers to frequently asked questions about release agents, mold release solutions, application methods, troubleshooting, and safety guidelines. Expert advice for industrial applications.'
    },
    {
      name: 'keywords',
      content:
        'release agent FAQ, mold release questions, demolding agent help, release agent troubleshooting, mold release safety, release agent application guide'
    },
    {
      property: 'og:title',
      content: 'Release Agent FAQs - Common Questions & Answers'
    },
    {
      property: 'og:description',
      content:
        'Comprehensive FAQ guide for release agents, covering product selection, application methods, troubleshooting, and safety guidelines.'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://yunzhu-industry.com/faqs'
    }
  ]
})

// 结构化数据
watchEffect(() => {
  if (faqs.value && faqs.value.length > 0) {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.value.map(faq => ({
              '@type': 'Question',
              name: faq.attributes?.question || '',
              acceptedAnswer: {
                '@type': 'Answer',
                text: (faq.attributes?.answer || '').replace(/<[^>]*>/g, '')
              }
            }))
          })
        }
      ]
    })
  }
})
</script>

<style scoped>
/* 仅保留极少量自定义样式，主要用 Tailwind 类 */
.banner {
  background-image: url('../../public/image/banner-project.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 40vh;
}
</style>
