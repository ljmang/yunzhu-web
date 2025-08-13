<template>
  <div>
    <!-- banner -->
    <div class="banner">
      <div class="p-10 mx-auto flex flex-col justify-center h-full text-white">
        <h1 class="text-5xl font-bold mb-4">Blog</h1>
        <p class="text-2xl">
          Learn Industry Insights, Product Usage, and Problem-Solving Solutions!
        </p>
      </div>
    </div>
    <!-- content -->
    <div class="p-4 lg:p-10 flex gap-10">
      <!-- 文章列表 -->
      <div class="flex-1">
        <div v-if="blogsSafe.data.length" class="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          <div v-for="item in blogsSafe.data" :key="item.id" class="flex flex-col gap-2">
            <!-- 封面图 -->
            <img v-if="getStrapiImageUrl(item.attributes, 'cover')" :src="getStrapiImageUrl(item.attributes, 'cover')"
              :alt="item.attributes.title" class="w-160 h-80 object-cover" />
            <!-- 标题 -->
            <h2 class="text-2xl">
              <NuxtLink :to="`/blog/${item.attributes.slug}`" class="text-green-800 hover:text-yellow-500">
                {{ item.attributes.title }}
              </NuxtLink>
            </h2>
            <!-- 摘要 -->
            <p class="text-gray-400 text-sm">{{ item.attributes.summary }}</p>
            <!-- 日期 -->
            <p class="text-xs text-gray-400 flex items-center">
              <Icon name="mdi:calendar" class="w-4 h-4 mr-2" />
              {{ formatDate(item.attributes.createdAt) }}
            </p>
          </div>
        </div>
        <!-- 暂无文章 -->
        <div v-else class="w-full text-center py-20">
          <div class="text-gray-500">
            <Icon name="mdi:file-search-outline" class="w-16 h-16 mb-4" />
            <p class="text-xl mb-2">No articles</p>
            <p class="text-sm">There are no articles available yet.</p>
          </div>
        </div>
        <!-- 分页 -->
        <div class="mt-8" v-if="blogsSafe.meta?.pagination?.total > blogsSafe.data.length">
          <button @click="loadMoreArticles" class="text-green-800 hover:text-yellow-500" :disabled="loading">
            {{ loading ? 'Loading...' : 'Load More Articles......' }}
          </button>
        </div>
      </div>
      <!-- 产品分类导航 -->
      <div class="w-60 display-none">
        <div class="text-2xl font-bold mb-2">Product Category</div>
        <div class="flex flex-col gap-2">
          <NuxtLink v-for="category in categoryListSafe" :key="category.id" :to="`/product/${category.attributes.slug}`"
            class="hover:text-yellow-500 cursor-pointer">
            {{ category.attributes.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

const { getBlogs, getCateProducts, getStrapiImageUrl } = useStrapi()

// 分页状态
const currentPage = ref(1)
const pageSize = ref(10)
const loading = ref(false)

// 数据状态
const categoryListSafe = ref([])
const blogsSafe = ref({ data: [], meta: { pagination: { total: 0 } } })

// 获取产品分类列表
const fetchCategories = async () => {
  try {
    const categories = await getCateProducts()
    categoryListSafe.value = categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    categoryListSafe.value = []
  }
}

// 获取博客列表
const fetchBlogs = async () => {
  try {
    const blogs = await getBlogs(pageSize.value, currentPage.value)
    blogsSafe.value = blogs
    console.log('blogsSafe:', blogsSafe.value)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    blogsSafe.value = { data: [], meta: { pagination: { total: 0 } } }
  }
}

// 加载更多文章
const loadMoreArticles = async () => {
  if (loading.value) return

  loading.value = true
  currentPage.value++

  try {
    const newBlogs = await getBlogs(pageSize.value, currentPage.value)

    if (newBlogs.data && newBlogs.data.length > 0) {
      // 将新文章添加到现有列表中
      blogsSafe.value.data.push(...newBlogs.data)
    }
  } catch (error) {
    console.error('Error loading more articles:', error)
  } finally {
    loading.value = false
  }
}

// 页面加载时获取数据
onMounted(async () => {
  await Promise.all([fetchCategories(), fetchBlogs()])
})

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
</script>

<style scoped>
.banner {
  background-image: url('../../public/image/banner-project.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 30vh;
}

.display-none {
  display: none;
}

@media (min-width: 1024px) {
  .display-none {
    display: block;
  }
}
</style>
