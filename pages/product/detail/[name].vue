<template>
  <!-- 面包屑导航 -->
  <div class="max-w-7xl mx-auto p-4">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-yellow-500">
            <Icon name="mdi:home" class="w-4 h-4 mr-2" />
            Home
          </NuxtLink>
        </li>
        <li>
          <div class="flex items-center">
            <Icon name="mdi:chevron-right" class="w-4 h-4 mr-2" />
            <NuxtLink :to="`/product/${product?.attributes?.cate_product?.data?.attributes?.slug || ''}`"
              class="ml-1 text-sm font-medium text-gray-700 hover:text-yellow-500 md:ml-2">
              {{
                product?.attributes?.cate_product?.data?.attributes?.name ||
                'Products'
              }}
            </NuxtLink>
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <Icon name="mdi:chevron-right" class="w-4 h-4 mr-2" />
            <span class="ml-1 text-sm font-medium text-gray-400 md:ml-2">{{
              product?.attributes?.name || 'Product Detail'
            }}</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>

  <!-- 产品详情 -->
  <div class="max-w-7xl mx-auto p-4  flex gap-10">
    <!-- 产品分类 -->
    <div class="w-60 flex flex-col gap-2 display-none">
      <div class="text-xl font-bold mb-2">Product Category</div>
      <div v-for="item in categoryListSafe" :key="item.id" class="mb-2">
        <NuxtLink :to="`/product/${item.attributes.slug}`" class="hover:text-yellow-500 cursor-pointer text-sm">{{
          item.attributes.name }}</NuxtLink>
      </div>
    </div>
    <!-- 产品详情 -->
    <div class="flex-1">
      <!-- 产品图片 -->
      <div class="flex flex-col gap-4">
        <!-- 当前图片 -->
        <img :src="currentImage || getStrapiImageUrl(product, 'cover')" :alt="`${product?.name} image`"
          class="w-160 h-full lg:shadow-md" loading="lazy" />
        <!-- 图片列表 -->
        <div class="flex flex-wrap gap-4">
          <div v-for="image in product?.images?.data" :key="image.id"
            class="w-20 cursor-pointer transition-all duration-300 border border-gray-300 hover:shadow-md  hover:scale-105 hover:border-yellow-500"
            @click="currentImage = getDirectImageUrl(image)">
            <img :src="getDirectImageUrl(image)" :alt="`${product?.name} image`" class="object-cover" loading="lazy" />
          </div>
        </div>
      </div>

      <!-- 产品详情 -->
      <div class="col-span-1 flex flex-col gap-2 mt-8">
        <h1 class="text-3xl font-bold">{{ product?.name }}</h1>
        <p>{{ product?.description }}</p>
        <div class="flex gap-2 text-center mt-2 font-bold">
          <NuxtLink :to="`/product/detail/${product?.slug}`"
            class="bg-yellow-500 text-white px-8 py-2 lg:w-60 hover:bg-yellow-600">Get a Quote</NuxtLink>
          <NuxtLink :to="`/contact-us`"
            class="border border-green-600 text-green-600 px-4 py-2 lg:w-60 hover:bg-green-600 hover:text-white">
            Leave a Message</NuxtLink>
        </div>

        <!-- 产品参数 -->
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-2">Product Parameters</h2>
          <div class="flex flex-col border-l border-t border-r border-gray-300">
            <!-- 产品参数 -->
            <div class="flex" v-for="param in productParams" :key="param.name">
              <div class="w-30 lg:w-40 p-2 bg-gray-100 border-r border-b border-gray-300">
                {{ param.name }}
              </div>
              <div class="flex-1 p-2 border-b border-gray-300">
                {{ param.value }}
              </div>
            </div>
          </div>
        </div>

        <!-- 产品优势 -->
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-2">Advantages of this Solvent Based Concrete Stripper</h2>
          <ul class="list-disc list-inside flex flex-col gap-2">
            <li v-for="Features in product?.Features" :key="Features">
              <text class="text-lg  text-green-800">{{ Features.title }},</text>
              <text>{{ Features.description }}</text>
            </li>
          </ul>
        </div>

        <!-- 如何使用 -->
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-2">How to Use</h2>
          <ul class="flex flex-col gap-2">
            <li v-for="(howToUse, index) in product?.howToUse" :key="howToUse" class="flex  sm:items-start lg:items-center">
              <div class="bg-yellow-500 text-white w-6 h-6 rounded-full mr-2 flex items-center justify-center">
                {{ index + 1 }}
              </div>
              <div class="flex-1">
                <text class="text-lg  text-green-800">{{ howToUse.title }} : </text>
                <text>{{ howToUse.description }}</text>
              </div>
            </li>
          </ul>
        </div>

        <!-- 文档下载 -->
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-2">Document Download</h2>
          <ul class="flex flex-col gap-2">
            <li v-for="file in product?.pdf?.data" :key="file.id">
              <a :href="getDirectImageUrl(file)" target="_blank"
                class="text-green-800 hover:text-yellow-500 flex items-center">
                <Icon name="mdi:file-pdf" class="w-6 h-6 mr-2" />
                {{ file.attributes?.caption || 'Download File' }}
              </a>
            </li>
          </ul>
        </div>


        <!-- 证书 -->
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-2">Certificate</h2>
          <div class="flex flex-wrap gap-4">
            <div class="shadow-sm" v-for="image in product?.certificate?.data" :key="image.id">
              <img :src="getDirectImageUrl(image)" :alt="`${image?.attributes?.name} certificate`"
                class="w-full h-60" loading="lazy" />
              <div class="text-center  p-2 bg-gray-100">
                {{ image?.attributes?.caption }}
              </div>
            </div>
          </div>
        </div>


        <!-- FAQ -->
        <div v-if="faqList.length > 0" class="mb-10 mt-8">
          <h2 class="text-2xl font-bold mb-2">FAQ</h2>
          <ul class="flex flex-col gap-2">
            <li v-for="item in faqList" :key="item.id" class="border border-gray-200">
              <h3 @click="toggleFaq(item.id)"
                class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors bg-white">
                <span class="font-medium text-gray-800">{{ item.attributes.question }}</span>
                <Icon :name="expandedFaqs.includes(item.id) ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                  class="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform" />
              </h3>
              <div v-show="expandedFaqs.includes(item.id)" class="px-4 pb-4 border-t border-gray-100 bg-white">
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
          <h2 class="text-2xl font-bold mb-2">Related Articles</h2>
          <div class="grid  sm:grid-cols-1 lg:grid-cols-3  gap-4">
            <ArticleCard v-for="article in relatedArticles" :key="article.id" :article="article" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading state -->
  <div v-if="loading" class="max-w-7xl mx-auto px-4 py-20">
    <LoadingSpinner text="Loading product details..." />
  </div>

  <!-- 404 state -->
  <div v-else-if="!product && !loading" class="max-w-7xl mx-auto px-4 py-20">
    <ErrorState title="Product Not Found"
      description="Sorry, the product you're looking for doesn't exist or has been removed."
      icon="mdi:package-variant-closed" :show-retry="false">
      <template #action>
        <NuxtLink to="/product"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Back to Products
        </NuxtLink>
      </template>
    </ErrorState>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute() // 获取路由参数  
const productSlug = computed(() => route.params.name) // 获取产品slug
const { getProduct, getCateProducts, getStrapiImageUrl, getDirectImageUrl, getFaqs, getBlogs } = useStrapi() // 获取产品、分类、图片、FAQ、相关文章

// 当前图片，默认取第一个
const currentImage = ref(null)
const product = ref(null) // 产品
const loading = ref(true) // 加载状态
const categoryListSafe = ref([]) // 分类列表
const productParams = ref([]) // 产品参数
const faqList = ref([]) // FAQ列表
const relatedArticles = ref([]) // 相关文章列表
const expandedFaqs = ref([]) // 存储展开的FAQ ID

// 切换FAQ展开状态
const toggleFaq = (faqId) => {
  const index = expandedFaqs.value.indexOf(faqId) // 获取FAQ ID的索引
  if (index > -1) {
    expandedFaqs.value.splice(index, 1) // 收起
  } else {
    expandedFaqs.value.push(faqId) // 展开
  }
}

// 获取相关文章
const getRelatedArticles = async () => {
  const articles = await getBlogs(3, 1)
  relatedArticles.value = articles.data || []
  console.log("relatedArticles.value:", relatedArticles.value)
}

// 获取产品详情
const fetchProduct = async () => {
  try {
    loading.value = true
    const productData = await getProduct(productSlug.value)
    product.value = productData.attributes
    console.log("product.value", product.value)
    productParams.value = [
      {
        name: 'Model',
        value: product.value?.Model
      },
      {
        name: 'Origin',
        value: product.value?.Origin
      },
      {
        name: 'Applications',
        value: product.value?.Applications
      },
      {
        name: 'Properties',
        value: product.value?.Properties
      },
      {
        name: 'PH',
        value: product.value?.PH
      },
      {
        name: 'Dilution Ratio',
        value: product.value?.dilutionRatio
      },
      {
        name: 'Flash Point',
        value: product.value?.flashPoint
      },
      {
        name: 'Freezing Point',
        value: product.value?.freezingPoint
      },

      {
        name: 'Use Temperature',
        value: product.value?.useTemperature
      },

      {
        name: 'Package',
        value: product.value?.package
      },
      {
        name: 'Storage',
        value: product.value?.Storage
      },
      {
        name: 'Transportation',
        value: product.value?.Transportation
      },
      {
        name: 'Shelf Life',
        value: product.value?.shelfLife
      },
    ]

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

// 获取FAQ
const fetchFaq = async () => {
  try {
    const faqData = await getFaqs()
    faqList.value = faqData || []
  } catch (error) {
    console.error('Error fetching FAQ:', error)
    faqList.value = []
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
  await Promise.all([fetchProduct(), fetchCategories(), fetchFaq(), getRelatedArticles()])
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
