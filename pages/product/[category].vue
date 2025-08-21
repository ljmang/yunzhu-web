<template>
  <!-- banner -->
  <div class="h-120 2xl:h-160 relative">
    <!-- 产品图片 -->
    <img :src="bannerImageUrl" alt="product" class="w-full h-full object-cover" />
    <!-- 产品介绍 -->
    <div class="p-4 lg:p-8 flex flex-col gap-2 text-white absolute -bottom-12 left-0 lg:left-80 bg-green-800/80">
      <!-- 面包屑导航 -->
      <nav class="flex items-center space-x-2 text-sm mb-4">
        <NuxtLink to="/" class="hover:text-yellow-500 flex items-center gap-2">
          <HomeIcon class="w-4 h-4" />Home
        </NuxtLink>
        <span>/</span>
        <NuxtLink to="/product" class="hover:text-yellow-500 flex items-center gap-2">
          <ListBulletIcon class="w-4 h-4" />Products
        </NuxtLink>
        <span v-if="currentCate?.name && currentCate.name !== 'All Products'">/</span>
        <span v-if="currentCate?.name && currentCate.name !== 'All Products'" class="text-gray-300">
          {{ currentCate.name }}
        </span>
      </nav>
      <h1 class="text-3xl lg:text-5xl font-bold mb-2">
        {{ currentCate?.title || 'Products' }}
      </h1>
      <p class="text-xl">
        {{ currentCate?.description }}
      </p>
    </div>
  </div>

  <!-- 产品列表 -->
  <div class="px-4 lg:px-10  flex gap-10 mt-8 2xl:text-lg">
    <!-- 产品分类 -->
    <div class="w-60 display-none">
      <div class="text-2xl font-bold mb-2">Category</div>
      <div class="flex flex-col gap-2">
        <NuxtLink v-for="item in cateProducts" :key="item.id" :to="`/product/${item.slug}`"
          class="hover:text-yellow-500 cursor-pointer">
          {{ item.name }}</NuxtLink>
      </div>
    </div>

    <!-- 产品介绍 -->
    <div class="flex flex-wrap gap-6 flex-1 py-10">
      <!-- 加载中 -->
      <div v-if="loading" class="w-full py-20">
        <LoadingSpinner text="Loading products..." />
      </div>

      <!-- 产品介绍 -->
      <div v-else-if="products.length >= 0" class="relative">
        <!-- 行业痛点 -->
        <div v-if="currentCate.industry_pain_points" class="mb-10">
          <h2 class="text-3xl font-bold mb-2 text-green-800">{{ currentCate.industry_pain_points.title }}</h2>
          <p class="mb-4">{{ currentCate.industry_pain_points.description }}</p>
          <!-- 行业痛点图片 -->
          <div v-if="currentCate.industry_pain_points_images?.data" class="flex flex-wrap gap-4 mb-2">
            <img v-for="(item, index) in currentCate.industry_pain_points_images.data" :key="item.id"
              :src="getStrapiImageFromArray(currentCate.industry_pain_points_images.data, index)"
              :alt="item.attributes?.caption || 'Industry pain point image'"
              class="w-40  lg:w-48  2xl:w-64 h-full object-cover" />
          </div>
          <!-- 行业痛点列表 -->
          <ul v-if="currentCate.industry_pain_points_list" class="list-disc list-inside">
            <li v-for="item in currentCate.industry_pain_points_list" :key="item.id">
              <text class="font-bold text-green-800">{{ item.title }}: </text>{{ item.description }}
            </li>
          </ul>
        </div>

        <!-- 产品介绍 -->
        <div v-if="currentCate.product_introduction" class="mb-10">
          <h2 class="text-3xl font-bold mb-2 text-green-800">{{ currentCate.product_introduction.title }}</h2>
          <p class="mb-4">{{ currentCate.product_introduction.description }}</p>
          <!-- 分层图片 -->
          <div class="flex flex-wrap gap-4 mb-2">
            <img :src="getStrapiImageUrl(currentCate, 'layered')" alt="Product introduction image"
              class="w-180 h-full object-cover" />
          </div>
          <!-- 产品参数 -->
          <table class="w-full mb-4 border-collapse border border-gray-300 text-left">
            <thead class="bg-gray-200">
              <tr>
                <th class="min-w-20 lg:min-w-50 border border-gray-300 p-2">Property</th>
                <th class="border border-gray-300 p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in currentCate.basic_information" :key="item.id">
                <td class="border border-gray-300 p-2 font-bold text-green-800">{{ item.title }}</td>
                <td class="border border-gray-300 p-2">{{ item.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 产品列表标题 -->
        <h2 class="text-3xl font-bold mb-2 text-green-800">Product List</h2>
        <!-- 产品列表 -->
        <div v-for="item in products" :key="item.id" class="w-80 flex flex-col gap-2 mb-10">
          <!-- 产品图片 -->
          <img v-if="item.attributes && getStrapiImageUrl(item.attributes, 'cover')"
            :src="getStrapiImageUrl(item.attributes, 'cover')" :alt="item.attributes.name"
            class="w-full h-80 object-cover" />
          <div v-else class="w-full h-80 bg-gray-200 flex items-center justify-center">
            <span class="text-gray-500">No Image</span>
          </div>
          <!-- 产品名称 -->
          <h3 class="text-lg font-bold">{{ item.attributes.name }}</h3>
          <!-- 产品描述 -->
          <p class="text-sm text-gray-500">{{ item.attributes.directions }}</p>
          <!-- 产品按钮 -->
          <div class="flex justify-between gap-2 text-center">
            <NuxtLink :to="`/product/detail/${item.attributes.slug}`"
              class="flex-1 text-sm bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600 transition-colors">Get a
              Quote
            </NuxtLink>
            <NuxtLink :to="`/product/detail/${item.attributes.slug}`"
              class="flex-1 text-sm border border-green-600 text-green-600 px-4 py-2 hover:bg-green-600 hover:text-white transition-colors">
              View Details</NuxtLink>
          </div>
        </div>

        <!-- 产品优势 -->
        <div class="mb-10">
          <h2 class="text-3xl font-bold mb-2 text-green-800">{{ currentCate.product_advantages.title }}</h2>
          <p class="mb-4">{{ currentCate.product_advantages.description }}</p>
          <ol class="flex flex-col gap-4">
            <li v-for="(item, index) in currentCate.product_advantages_list" :key="item.id"
              class="flex items-center gap-6">
              <div class="w-20 h-20 text-yellow-500 flex items-center justify-center display-none">
                <Icon :name="item.icon" class="w-16 h-16" />
              </div>
              <div class="flex flex-col gap-2">
                <h3 class="font-bold text-green-800">{{ index + 1 + '. ' + item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </li>
          </ol>
        </div>

        <!-- 服务流程 -->
        <div v-if="serviceProcess" class="mb-10 max-w-7xl">
          <div class="mb-8">
            <h2 class="text-3xl font-bold mb-4 text-green-800">{{ serviceProcess.name }}</h2>
            <p class="text-gray-600 mb-6">{{ serviceProcess.description }}</p>
          </div>

          <!-- 步骤列表 -->
          <div class="grid md:grid-cols-3 gap-8 mb-4">
            <div v-for="(step, index) in serviceProcess.list" :key="step.id"
              class="relative flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-300">
              <!-- 步骤编号 -->
              <div
                class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                {{ index + 1 }}
              </div>
              <!-- 步骤图标 -->
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mt-4">
                <Icon v-if="step.icon" :name="step.icon" class="w-8 h-8 text-green-600" />
                <Icon v-else :name="getStepIcon(index)" class="w-8 h-8 text-green-600" />
              </div>
              <!-- 步骤内容 -->
              <h3 class="text-xl font-bold text-green-800 mb-3">{{ step.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ step.description }}</p>
            </div>
          </div>
          <p class="text-sm text-gray-500 italic">{{ serviceProcess.information }}</p>
        </div>

        <!-- FAQ -->
        <div v-if="faqList.length > 0" class="mb-10">
          <h2 class="text-3xl font-bold mb-2 text-green-800">FAQ</h2>
          <ul class="flex flex-col gap-2">
            <li v-for="item in faqList" :key="item.id" class="border border-gray-200">
              <h3 @click="toggleFaq(item.id)"
                class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors bg-white">
                <span class="font-medium text-gray-800">{{ item.attributes.question }}</span>
                <Icon :name="expandedFaqs.includes(item.id) ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                  class="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform" />
              </h3>
              <div v-show="expandedFaqs.includes(item.id)" class="px-4 pb-4 border-t border-gray-100">
                <div v-html="item.attributes.answer" class="text-gray-700 leading-relaxed mt-4"></div>
                <div v-if="item.attributes.tips" class="bg-gray-100 border-l-4 border-green-400 rounded-lg p-4 mt-4">
                  <h4 class="text-gray-800 text-sm font-semibold mb-2">💡 Pro Tip:</h4>
                  <p class="text-gray-800 text-sm leading-6 m-0">{{ item.attributes.tips }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- 相关文章 -->
        <div class="max-w-7xl">
          <h2 class="text-3xl font-bold mb-2 text-green-800">Related Articles</h2>
          <div class="grid  sm:grid-cols-1 lg:grid-cols-3  gap-4">
            <ArticleCard v-for="article in relatedArticles" :key="article.id" :article="article" />
          </div>
        </div>
      </div>

      <!-- 内容为空 -->
      <div v-else class="w-full py-20">
        <EmptyState title="No Products"
          description="There are no products in this category yet. Please check other categories."
          icon="mdi:package-variant-closed">
          <template #action>
            <NuxtLink to="/product"
              class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              View All Products
            </NuxtLink>
          </template>
        </EmptyState>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue' // 响应式
import { useRoute } from 'vue-router' // 路由

const route = useRoute() // 路由
const category = computed(() => route.params.category) // 当前产品分类(产品分类的slug)
const { getCateProducts, getStrapiImageUrl, getProducts, getStrapiImageFromArray, getFaqs, getBlogs, getServiceProcess } = useStrapi() // 获取产品分类
const cateProducts = ref([]) // 产品分类列表
const currentCate = ref(null) // 当前产品分类(产品分类的name)
const loading = ref(true) // 加载状态
const products = ref([]) // 产品列表

// 手动设置页面标题
const updatePageTitle = () => {
  if (typeof document !== 'undefined') {
    document.title = currentCate.value?.name || 'Products'
  }
}

// 获取Banner图片URL
const bannerImageUrl = computed(() => {
  if (!currentCate.value) return ''
  return getStrapiImageUrl(
    currentCate.value,
    'banner',
    '/image/banner.webp'
  )
})

// 获取服务流程
const serviceProcess = ref([])
const getServiceProcessData = async () => {
  const serviceProcessResponse = await getServiceProcess()
  serviceProcess.value = serviceProcessResponse || []
  console.log('serviceProcess:', serviceProcess.value)
}

// 获取步骤图标
const getStepIcon = (index) => {
  const icons = [
    'mdi:chat-processing', // 需求沟通
    'mdi:cog-outline', // 定制方案
    'mdi:headphones' // 技术支持
  ]
  return icons[index] || 'mdi:check-circle'
}

// 获取FAQ列表
const faqList = ref([])
const expandedFaqs = ref([]) // 存储展开的FAQ ID
const getFaqList = async () => {
  const faqResponse = await getFaqs()
  faqList.value = faqResponse || []
  console.log('faqList:', faqList.value)
}

// 切换FAQ展开/收起状态
const toggleFaq = (faqId) => {
  const index = expandedFaqs.value.indexOf(faqId)
  if (index > -1) {
    expandedFaqs.value.splice(index, 1) // 收起
  } else {
    expandedFaqs.value.push(faqId) // 展开
  }
}

// 获取相关文章
const relatedArticles = ref([])
const getRelatedArticles = async () => {
  const articlesResponse = await getBlogs(3, 1)
  relatedArticles.value = articlesResponse.data || []
  console.log('relatedArticles:', relatedArticles.value)
}

// 初始化数据
const initializeData = async () => {
  try {
    loading.value = true

    // 获取所有产品分类
    const cateResponse = await getCateProducts()
    cateProducts.value = cateResponse.map(item => item.attributes)

    // 根据当前路由参数找到对应的分类
    const foundCategory = cateProducts.value.find(
      item => item.slug === category.value
    )

    // 如果找到分类，则获取对应分类的产品
    if (foundCategory) {
      currentCate.value = foundCategory
      console.log('currentCate:', currentCate.value)
      // 使用服务端过滤获取对应分类的产品
      const productsResponse = await getProducts(10, 1, foundCategory.slug)
      products.value = productsResponse.data || []
      updatePageTitle()
    } else {
      // 如果找不到分类，显示所有产品
      currentCate.value = {
        name: 'All Products',
        description: 'Browse all our products',
      }
      const productsResponse = await getProducts(10, 1)
      products.value = productsResponse.data || []
      updatePageTitle()
    }
  } catch (error) {
    console.error('获取产品数据失败:', error)
    // 设置默认值
    currentCate.value = { name: 'Products', description: '' }
    products.value = []
  } finally {
    loading.value = false
  }
}


// 页面加载时初始化
onMounted(() => {
  Promise.all([initializeData(), getFaqList(), getRelatedArticles(), getServiceProcessData()]) // 获取页面数据
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
</style>
