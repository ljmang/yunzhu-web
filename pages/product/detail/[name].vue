<template>
  <!-- 面包屑导航 -->
  <div class="max-w-7xl mx-auto px-4 py-4">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <NuxtLink
            to="/"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-yellow-500"
          >
            <Icon name="mdi:home" class="w-4 h-4 mr-2" />
            Home
          </NuxtLink>
        </li>
        <li>
          <div class="flex items-center">
            <Icon name="mdi:chevron-right" class="w-4 h-4 mr-2" />
            <NuxtLink
              to="/product"
              class="ml-1 text-sm font-medium text-gray-700 hover:text-yellow-500 md:ml-2"
            >
              Products
            </NuxtLink>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <Icon name="mdi:chevron-right" class="w-4 h-4 mr-2" />
            <NuxtLink
              :to="`/product/${product?.attributes?.cate_product?.data?.attributes?.slug || ''}`"
              class="ml-1 text-sm font-medium text-gray-700 hover:text-yellow-500 md:ml-2"
            >
              {{
                product?.attributes?.cate_product?.data?.attributes?.name ||
                'Products'
              }}
            </NuxtLink>
          </div>
        </li>
        <li aria-current="page" class="display-none">
          <div class="flex items-center">
            <Icon name="mdi:chevron-right" class="w-4 h-4 mr-2" />
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">{{
              product?.attributes?.name || 'Product Detail'
            }}</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>

  <!-- 产品详情 -->
  <div class="max-w-7xl mx-auto px-4 py-4 flex gap-10">
    <!-- 产品分类 -->
    <div class="w-60 flex flex-col gap-2 display-none">
      <div class="text-xl font-bold mb-2">Product Category</div>
      <div v-for="item in categoryListSafe" :key="item.id" class="mb-2">
        <NuxtLink
          :to="`/product/${item.attributes.slug}`"
          class="hover:text-yellow-500 cursor-pointer text-sm"
          >{{ item.attributes.name }}</NuxtLink
        >
      </div>
    </div>
    <!-- 产品详情 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
      <!-- 产品图片 -->
      <div class="col-span-1 flex flex-col gap-2">
        <!-- 当前图片 -->
        <div>
          <img
            :src="
              currentImage || getStrapiImageUrl(product?.attributes, 'cover')
            "
            :alt="`${product?.attributes?.name} image`"
            class="object-cover"
            loading="lazy"
          />
        </div>
        <!-- 图片列表 -->
        <div
          v-if="product?.attributes?.images?.data?.length > 1"
          class="flex gap-2"
        >
          <div
            v-for="image in product?.attributes?.images?.data"
            :key="image.id"
            class="w-30 object-cover cursor-pointer hover:scale-105 transition-all duration-300"
            @click="currentImage = getDirectImageUrl(image)"
          >
            <img
              :src="getDirectImageUrl(image)"
              :alt="`${product?.attributes?.name} image`"
              class="w-full h-30 object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <!-- 产品详情 -->
      <div class="col-span-1 flex flex-col gap-2">
        <div class="text-2xl font-bold">{{ product?.attributes?.name }}</div>
        <div class="text-sm text-gray-500">
          {{ product?.attributes?.description }}
        </div>
        <div class="flex gap-2 text-center">
          <NuxtLink
            :to="`/product/detail/${product?.attributes?.slug}`"
            class="w-50 text-sm bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600"
            >Get a Quote</NuxtLink
          >
          <NuxtLink
            :to="`/contact-us`"
            class="w-50 text-sm border border-green-600 text-green-600 px-4 py-2 hover:bg-green-600 hover:text-white"
            >Leave a Message</NuxtLink
          >
        </div>
        <!-- 产品参数 -->
        <div class="text-2xl font-bold mt-4 mb-2">Product Parameters</div>
        <div class="flex flex-col border-l border-t border-r border-gray-300">
          <!-- 模型 -->
          <div class="flex" v-if="product?.attributes?.model">
            <div
              class="w-30 lg:w-40 p-2 bg-gray-100 border-r border-b border-gray-300"
            >
              Model
            </div>
            <div class="flex-1 p-2 border-b border-gray-300">
              {{ product?.attributes?.model }}
            </div>
          </div>
          <!-- 产地 -->
          <div class="flex" v-if="product?.attributes?.origin">
            <div
              class="w-30 lg:w-40 p-2 bg-gray-100 border-r border-b border-gray-300"
            >
              Origin
            </div>
            <div class="flex-1 p-2 border-b border-gray-300">
              {{ product?.attributes?.origin }}
            </div>
          </div>
          <!-- 应用 -->
          <div class="flex" v-if="product?.attributes?.applications">
            <div
              class="w-30 lg:w-40 p-2 bg-gray-100 border-r border-b border-gray-300"
            >
              Applications
            </div>
            <div class="flex-1 p-2 border-b border-gray-300">
              {{ product?.attributes?.applications }}
            </div>
          </div>
          <!-- 属性 -->
          <div class="flex" v-if="product?.attributes?.properties">
            <div
              class="w-30 lg:w-40 p-2 bg-gray-100 border-r border-b border-gray-300"
            >
              Properties
            </div>
            <div class="flex-1 p-2 border-b border-gray-300">
              {{ product?.attributes?.properties }}
            </div>
          </div>
          <!-- PH -->
          <div class="flex" v-if="product?.attributes?.PH">
            <div
              class="w-30 lg:w-40 p-2 bg-gray-100 border-r border-b border-gray-300"
            >
              PH
            </div>
            <div class="flex-1 p-2 border-b border-gray-300">
              {{ product?.attributes?.PH }}
            </div>
          </div>
          <!-- 密度 -->
          <div class="flex" v-if="product?.attributes?.density">
            <div
              class="w-30 lg:w-40 p-2 bg-gray-100 border-r border-b border-gray-300"
            >
              Density
            </div>
            <div class="flex-1 p-2 border-b border-gray-300">
              {{ product?.attributes?.density }}
            </div>
          </div>
          <!-- 尺寸 -->
          <div class="flex" v-if="product?.attributes?.dimensions">
            <div
              class="w-30 lg:w-40 p-2 bg-gray-100 border-r border-b border-gray-300"
            >
              Dimensions
            </div>
            <div class="flex-1 p-2 border-b border-gray-300">
              {{ product?.attributes?.dimensions }}
            </div>
          </div>
          <!-- 存储 -->
          <div class="flex" v-if="product?.attributes?.storage">
            <div
              class="w-30 lg:w-40 p-2 bg-gray-100 border-r border-b border-gray-300"
            >
              Storage
            </div>
            <div class="flex-1 p-2 border-b border-gray-300">
              {{ product?.attributes?.storage }}
            </div>
          </div>
          <!-- 运输 -->
          <div class="flex" v-if="product?.attributes?.transportation">
            <div
              class="w-30 lg:w-40 p-2 bg-gray-100 border-r border-b border-gray-300"
            >
              Transportation
            </div>
            <div class="flex-1 p-2 border-b border-gray-300">
              {{ product?.attributes?.transportation }}
            </div>
          </div>
        </div>
        <!-- 产品优势 -->
        <div class="text-2xl font-bold mt-4 mb-2">
          Advantages of this Solvent Based Concrete Stripper
        </div>
        <ul class="list-disc list-inside flex flex-col gap-2">
          <li
            v-for="advantage in product?.attributes?.advantages"
            :key="advantage"
          >
            {{ advantage }}
          </li>
        </ul>
        <!-- 文档下载 -->
        <div class="text-2xl font-bold mt-4 mb-2">Document Download</div>
        <ul class="list-disc list-inside flex flex-col gap-2">
          <li v-for="file in product?.attributes?.files?.data" :key="file.id">
            <a
              :href="getDirectImageUrl(file)"
              target="_blank"
              class="text-green-800 hover:text-yellow-500"
              ><Icon name="mdi:file-pdf" class="w-5 h-5 mr-2" />
              {{ file.attributes?.name || 'Download File' }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- 加载状态 -->
  <div v-if="loading" class="max-w-7xl mx-auto px-4 py-20">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Loading product details...</p>
    </div>
  </div>

  <!-- 404 状态 -->
  <div v-else-if="!product && !loading" class="max-w-7xl mx-auto px-4 py-20">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Product Not Found</h1>
      <p class="text-gray-600 mb-6">
        The product you're looking for doesn't exist.
      </p>
      <NuxtLink to="/product" class="text-green-800 hover:text-yellow-500">
        Back to Products
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const productSlug = computed(() => route.params.name)
  const { getProduct, getCateProducts, getStrapiImageUrl, getDirectImageUrl } =
    useStrapi()

  // 当前图片，默认取第一个
  const currentImage = ref(null)
  const product = ref(null)
  const loading = ref(true)
  const categoryListSafe = ref([])

  // 获取产品详情
  const fetchProduct = async () => {
    try {
      loading.value = true
      const productData = await getProduct(productSlug.value)
      product.value = productData

      // 设置默认图片
      if (productData?.attributes?.images?.data?.length > 0) {
        currentImage.value = getDirectImageUrl(
          productData.attributes.images.data[0]
        )
      } else if (productData?.attributes?.cover) {
        currentImage.value = getStrapiImageUrl(productData.attributes, 'cover')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      product.value = null
    } finally {
      loading.value = false
    }
  }

  // 获取分类列表
  const fetchCategories = async () => {
    try {
      const categories = await getCateProducts()
      categoryListSafe.value = categories
    } catch (error) {
      console.error('Error fetching categories:', error)
      categoryListSafe.value = []
    }
  }

  // 页面加载时获取数据
  onMounted(async () => {
    await Promise.all([fetchProduct(), fetchCategories()])
  })

  // SEO
  useHead({
    title: computed(() =>
      product.value
        ? `${product.value.attributes?.name} - Yunzhu Industry`
        : 'Product Detail - Yunzhu Industry'
    ),
    meta: [
      {
        name: 'description',
        content: computed(
          () => product.value?.attributes?.description || 'Product detail page'
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
</style>
