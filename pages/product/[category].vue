<template>
  <!-- banner -->
  <div class="h-120 2xl:h-160 relative">
    <!-- 产品图片 -->
    <img
      :src="bannerImageUrl"
      alt="product"
      class="w-full h-full object-cover"
    />
    <!-- 产品介绍 -->
    <div
      class="max-w-7xl p-4 lg:p-10 mx-auto flex flex-col gap-2 text-white absolute -bottom-10 left-0 lg:left-10 bg-green-800/80"
    >
      <h1 class="text-2xl lg:text-5xl font-bold mb-4">
        {{ currentCate?.name || 'Products' }}
      </h1>
      <!-- 面包屑导航 -->
      <nav class="flex items-center space-x-2 text-sm text-white">
        <NuxtLink to="/" class="hover:text-yellow-500 flex items-center gap-2">
          <HomeIcon class="w-4 h-4" />Home
        </NuxtLink>
        <span>/</span>
        <NuxtLink
          to="/product"
          class="hover:text-yellow-500 flex items-center gap-2"
        >
          <ListBulletIcon class="w-4 h-4" />Products
        </NuxtLink>
        <span v-if="currentCate?.name && currentCate.name !== 'All Products'"
          >/</span
        >
        <span
          v-if="currentCate?.name && currentCate.name !== 'All Products'"
          class="text-gray-300"
        >
          {{ currentCate.name }}
        </span>
      </nav>
    </div>
  </div>

  <!-- 产品列表 -->
  <div class="p-10 flex gap-10 mt-5">
    <!-- 产品分类 -->
    <div class="w-60 display-none">
      <div class="text-2xl font-bold mb-2">Category</div>
      <div class="flex flex-col gap-2">
        <NuxtLink
          v-for="item in cateProducts"
          :key="item.id"
          :to="`/product/${item.slug}`"
          class="hover:text-yellow-500 cursor-pointer"
          :class="{ 'text-yellow-500': item.slug === category }"
          >{{ item.name }}</NuxtLink
        >
      </div>
    </div>

    <!-- 产品列表 -->
    <div class="flex flex-wrap gap-6 flex-1">
      <!-- 加载状态 -->
      <div v-if="loading" class="w-full flex justify-center items-center py-20">
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"
          ></div>
          <p class="text-gray-600">Loading...</p>
        </div>
      </div>
      <!-- 产品卡片 -->
      <div
        v-else-if="products.length > 0"
        v-for="item in products"
        :key="item.id"
        class="w-80 flex flex-col gap-2"
      >
        <!-- 产品图片 -->
        <img
          v-if="item.attributes && getStrapiImageUrl(item.attributes, 'cover')"
          :src="getStrapiImageUrl(item.attributes, 'cover')"
          :alt="item.attributes.name"
          class="w-full h-80 object-cover"
        />
        <div
          v-else
          class="w-full h-80 bg-gray-200 flex items-center justify-center"
        >
          <span class="text-gray-500">No Image</span>
        </div>
        <!-- 产品名称 -->
        <h3 class="text-lg font-bold">{{ item.attributes.name }}</h3>
        <!-- 产品描述 -->
        <p class="text-sm text-gray-500">{{ item.attributes.directions }}</p>
        <!-- 产品按钮 -->
        <div class="flex justify-between gap-2 text-center">
          <NuxtLink
            :to="`/product/detail/${item.attributes.slug}`"
            class="flex-1 text-sm bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600 transition-colors"
            >Get a Quote
          </NuxtLink>
          <NuxtLink
            :to="`/product/detail/${item.attributes.slug}`"
            class="flex-1 text-sm border border-green-600 text-green-600 px-4 py-2 hover:bg-green-600 hover:text-white transition-colors"
          >
            View Details</NuxtLink
          >
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="w-full text-center py-20">
        <div class="text-gray-500">
          <svg
            class="mx-auto h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p class="text-xl mb-2">No products</p>
          <p class="text-sm">There are no products in this category yet.</p>
          <NuxtLink
            to="/product"
            class="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            View All Products
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute() // 路由
  const category = computed(() => route.params.category) // 当前产品分类(产品分类的slug)
  const { getCateProducts } = useStrapi() // 获取产品分类
  const cateProducts = ref([]) // 产品分类列表
  const currentCate = ref(null) // 当前产品分类(产品分类的name)
  const loading = ref(true) // 加载状态
  const { getProducts, getStrapiImageUrl } = useStrapi() // 获取产品列表
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
      '/image/banner_pu.webp'
    )
  })

  // 初始化数据
  const initializeData = async () => {
    try {
      loading.value = true

      // 获取所有产品分类
      const cateResponse = await getCateProducts()
      cateProducts.value = cateResponse.map(item => item.attributes)
      console.log('cateProducts:', cateProducts.value)

      // 根据当前路由参数找到对应的分类
      const foundCategory = cateProducts.value.find(
        item => item.slug === category.value
      )

      if (foundCategory) {
        currentCate.value = foundCategory

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

  // 监听路由变化
  watch(
    () => route.params.category,
    () => {
      initializeData()
    }
  )

  // 页面加载时初始化
  onMounted(() => {
    initializeData()
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
