<template>
  <div>
    <!-- banner -->
    <div class="banner">
      <div
        class="max-w-7xl p-4 mx-auto flex flex-col justify-center h-full text-white"
      >
        <h1 class="text-5xl font-bold mb-4">{{ categoryCurrent.name }}</h1>
        <p class="text-2xl">
          Learn Industry Insights, Product Usage, and Problem-Solving Solutions!
        </p>
      </div>
    </div>
    <!-- content -->
    <div class="flex gap-4 max-w-7xl mx-auto py-10">
    <!-- 文章分类列表 -->
    <div class="w-60 display-none p-4">
      <div v-if="categoryListSafe.length">
        <h2 class="text-2xl font-bold mb-4">Learn Categories</h2>
        <div
          v-for="category in categoryListSafe"
          :key="category.id"
          class="mb-4"
        >
          <NuxtLink
            :to="`/blog/${category.slug}`"
            class="hover:text-yellow-500"
          >
            {{ category.name }}
          </NuxtLink>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-gray-500">暂无文章分类</p>
      </div>
    </div>
    <!-- 文章列表 -->
    <div class="flex-1 p-4">
      <div v-if="articlesSafe.articles.length" class="flex flex-col gap-8">
        <div
          v-for="item in articlesSafe.articles"
          :key="item.id"
          class="flex flex-col gap-2"
        >
          <!-- 封面图 -->
          <img
            v-if="item.cover"
            :src="item.cover"
            :alt="item.title"
            class="w-160 sm:w-120 h-80 sm:h-60 object-cover"
          />
          <!-- 标题 -->
          <h2 class="text-2xl">
            <NuxtLink
              :to="`/blog/article/${item.slug}`"
              class="text-green-800 hover:text-yellow-500"
            >
              {{ item.title }}
            </NuxtLink>
          </h2>
          <!-- 摘要 -->
          <p class="text-gray-400 text-sm">{{ item.summary }}</p>
          <!-- 日期 -->
          <p class="text-xs text-gray-400 flex items-center">
            <Icon name="mdi:calendar" class="w-4 h-4 mr-2" />
            {{ formatDate(item.createdAt) }}
          </p>
        </div>
      </div>
      <!-- 暂无文章 -->
      <div v-else>
        <p class="text-center text-gray-500">暂无文章</p>
      </div>
      <!-- 分页 -->
      <div
        class="mt-8"
        v-if="articlesSafe.total > articlesSafe.articles.length"
      >
        <NuxtLink
          to="/blog"
          class="text-green-800 hover:text-yellow-500"
          @click="loadMoreArticles"
          >Load More Articles......</NuxtLink
        >
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const category = computed(() => route.params.category)

  // 文章分类列表（查数据库）
  const { data: articleCategoryList } = await useFetch(
    '/api/article-categories'
  )
  const categoryListSafe = computed(() =>
    Array.isArray(articleCategoryList.value) ? articleCategoryList.value : []
  )
  console.log('categoryListSafe:', categoryListSafe.value)

  // 当前分类
  const categoryCurrent = computed(() => {
    if (!categoryListSafe.value.length) return { name: 'All Learn', id: null }
    const found = categoryListSafe.value.find(
      item => item.slug === category.value
    )
    return found || { name: 'All Learn', id: null }
  })

  // 文章列表（查数据库）
  const { data: articles } = await useFetch('/api/articles', {
    params: {
      categoryId: categoryCurrent.value.id,
    },
  })
  const articlesSafe = computed(() =>
    articles.value && Array.isArray(articles.value.articles)
      ? articles.value
      : { articles: [], total: 0, page: 1, limit: 10 }
  )
  console.log('articlesSafe:', articlesSafe.value)

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
