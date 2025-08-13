<template>
  <!-- banner -->
  <div class="h-120 relative">
    <!-- 产品图片 -->
    <img
      src="/image/banner_pu.webp"
      alt="product"
      class="w-full h-full object-cover"
    />
    <!-- 产品介绍 -->
    <div
      class="max-w-7xl p-4 lg:p-10 mx-auto flex flex-col gap-2 text-white absolute -bottom-10 left-0 lg:left-10 bg-green-800/80"
    >
      <h1 class="text-2xl lg:text-5xl font-bold mb-4">Our Products</h1>
      <p class="text-lg">
        From polyurethane and rubber to carbon fiber and concrete, our
        high-performance release agents are designed to prevent sticking,
        improve mold life, and ensure smooth demolding in even the most
        demanding industrial applications. Whether you're in footwear
        production, automotive molding, electronics encapsulation, or composite
        manufacturing, we offer tailored solutions that enhance surface quality
        and reduce downtime.
      </p>
    </div>
  </div>

  <!-- 产品分类导航 -->
  <div class="p-4 lg:p-10 mt-10">
    <!-- 分类网格 -->
    <div
      class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
    >
      <NuxtLink
        v-for="category in categoryListSafe"
        :key="category.id"
        :to="`/product/${category.attributes.slug}`"
        class="group block bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
      >
        <div class="p-6 flex flex-col gap-2">
          <!-- 封面图 -->
          <img
            :src="
              getStrapiImageUrl(
                category.attributes,
                'icon',
                '/image/default-category.jpg'
              )
            "
            :alt="category.attributes.name"
            class="h-full object-cover mb-2"
          />
          <!-- 分类信息 -->
          <h3
            class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors"
          >
            {{ category.attributes.name }}
          </h3>
          <p class="text-gray-500 sm:text-sm lg:text-base">
            {{
              category.attributes.description ||
              'Explore our high-quality products in this category'
            }}
          </p>
          <div
            class="flex items-center text-green-600 font-medium text-sm group-hover:text-green-700"
          >
            View Products
            <Icon
              name="mdi:arrow-right"
              class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- 特色产品 -->
    <div class="mt-16">
      <h2 class="text-3xl font-bold mb-8 text-center">Featured Products</h2>
      <div
        class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
      >
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
        >
          <img
            v-if="product.attributes.images?.data"
            :src="
              getStrapiImageUrl(
                product.attributes,
                'cover',
                '/image/default-product.jpg'
              )
            "
            :alt="product.attributes.name"
            class="w-full object-cover"
          />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ product.attributes.name }}
            </h3>
            <p class="text-gray-600 text-sm mb-4">
              {{ product.attributes.description }}
            </p>
            <div class="flex gap-2">
              <NuxtLink
                :to="`/product/detail/${product.attributes.slug}`"
                class="flex-1 text-center text-sm bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
              >
                Get a Quote
              </NuxtLink>
              <NuxtLink
                :to="`/product/detail/${product.attributes.slug}`"
                class="flex-1 text-center text-sm border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white transition-colors"
              >
                View Details
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  // 获取 Strapi 工具函数
  const { getCateProducts, getProducts, getStrapiImageUrl } = useStrapi()

  // 获取产品分类
  const cateProducts = ref([])
  const categoryListSafe = computed(() => {
    return cateProducts.value || []
  })

  // 获取特色产品
  const featuredProducts = ref([])

  // 页面加载时获取数据
  onMounted(async () => {
    try {
      // 获取产品分类
      const categories = await getCateProducts()
      cateProducts.value = categories
      console.log('产品分类:', cateProducts.value)

      // 获取特色产品（取前6个）
      const productsResponse = await getProducts(6, 1)
      featuredProducts.value = productsResponse.data || []
      console.log('特色产品:', featuredProducts.value)
    } catch (error) {
      console.error('获取数据失败:', error)
    }
  })

  // SEO
  useHead({
    title: 'Products - Yunzhu Release Agents',
    meta: [
      {
        name: 'description',
        content:
          'Discover our comprehensive range of high-quality release agents including polyurethane, silicone, rubber, and composite release agents.',
      },
    ],
  })
</script>

<style scoped>
  .group:hover .group-hover\:translate-x-1 {
    transform: translateX(0.25rem);
  }
</style>
