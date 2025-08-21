<template>
  <div>
    <!-- banner -->
    <div class="banner">
      <div class="p-10 mx-auto flex flex-col justify-center h-full text-white">
        <h1 class="text-5xl font-bold mb-4">Video</h1>
        <p class="text-2xl">
          Watch Industry Insights, Product Usage, and Problem-Solving Solutions!
        </p>
      </div>
    </div>
    <!-- content -->
    <div class="p-4 lg:p-10 flex gap-10">
      <!-- 视频列表 -->
      <div class="flex-1">
        <div v-if="videosSafe.data && videosSafe.data.length" class="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          <div v-for="item in videosSafe.data" :key="item.id" class="flex flex-col gap-2">
            <!-- 封面图 -->
            <img v-if="getStrapiImageUrl(item.attributes, 'cover')" :src="getStrapiImageUrl(item.attributes, 'cover')"
              :alt="item.attributes.title" class="w-160 h-80 object-cover" />
            <!-- 标题 -->
            <h2 class="text-2xl">
              <button @click="openVideoModal(item)" class="text-green-800 hover:text-yellow-500 text-left">
                {{ item.attributes.title }}
              </button>
            </h2>
            <!-- 摘要 -->
            <p class="text-gray-400 text-sm">{{ item.attributes.introduction }}</p>
            <!-- 日期 -->
            <p class="text-xs text-gray-400 flex items-center">
              <Icon name="mdi:calendar" class="w-4 h-4 mr-2" />
              {{ formatDate(item.attributes.createdAt) }}
            </p>
          </div>
        </div>
        <!-- No videos -->
        <div v-else>
          <EmptyState 
            title="No Videos" 
            description="There are no videos available yet. Please check back later."
            icon="mdi:video-outline"
          />
        </div>
        <!-- 分页 -->
        <div class="mt-8" v-if="videosSafe.meta?.pagination?.total > (videosSafe.data?.length || 0)">
          <button @click="loadMoreVideos" class="text-green-800 hover:text-yellow-500" :disabled="loading">
            <LoadingSpinner v-if="loading" spinner-class="w-4 h-4" container-class="inline-flex items-center" />
            <span v-else>Load More Videos......</span>
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

  <!-- 视频播放弹窗 -->
  <div v-if="videoModalVisible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300" @click="closeVideoModal">
    <div class="bg-white rounded-xl shadow-2xl p-6 max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300" @click.stop>
      <!-- 弹窗头部 -->
      <div class="flex justify-between items-center mb-4">
        <div>
          <h3 class="text-xl font-bold text-gray-800">{{ currentVideo?.attributes?.title }}</h3>
        </div>
        <button @click="closeVideoModal" class="text-gray-500 hover:text-red-500 text-3xl font-bold transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          &times;
        </button>
      </div>
      
      <!-- 视频播放器 -->
      <div class="mb-6">
        <div class="relative w-full" style="padding-bottom: 56.25%;">
          <iframe 
            v-if="currentVideo?.attributes?.url" 
            :src="currentVideo?.attributes?.url" 
            class="absolute top-0 left-0 w-full h-full border-0 rounded-lg shadow-lg"
            allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
          </iframe>
        </div>
      </div>
      
      <!-- 视频介绍 -->
      <div v-if="currentVideo?.attributes?.introduction" class="text-gray-600 mb-4">
        <p>{{ currentVideo.attributes.introduction }}</p>
      </div>
      
      <!-- 外部链接 -->
      <div class="flex justify-center">
        <a 
          :href="currentVideo?.attributes?.url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-yellow-500 transition-colors duration-200">
          <Icon name="mdi:open-in-new" class="w-4 h-4" />
          Watch on the original platform
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const { getVideos, getCateProducts, getStrapiImageUrl } = useStrapi()

// 分页状态
const currentPage = ref(1)
const pageSize = ref(10)
const loading = ref(false)

// 数据状态
const videosSafe = ref({ data: [], meta: { pagination: { total: 0 } } })
const categoryListSafe = ref([])

// 视频弹窗状态
const videoModalVisible = ref(false)
const currentVideo = ref(null)

// 获取视频列表
const fetchVideos = async () => {
  try {
    const videos = await getVideos(pageSize.value, currentPage.value)
    videosSafe.value = videos
    console.log('videosSafe:', videosSafe.value)
  } catch (error) {
    console.error('Error fetching videos:', error)
    videosSafe.value = { data: [], meta: { pagination: { total: 0 } } }
  }
}

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

// 加载更多视频
const loadMoreVideos = async () => {
  if (loading.value) return

  loading.value = true
  currentPage.value++

  try {
    const newVideos = await getVideos(pageSize.value, currentPage.value)

    if (newVideos.data && newVideos.data.length > 0) {
      // 将新文章添加到现有列表中
      videosSafe.value.data.push(...newVideos.data)
    }
  } catch (error) {
    console.error('Error loading more videos:', error)
  } finally {
    loading.value = false
  }
}

// 打开视频弹窗
const openVideoModal = (video) => {
  currentVideo.value = video
  videoModalVisible.value = true
  // 禁止背景滚动
  document.body.style.overflow = 'hidden'
}

// 关闭视频弹窗
const closeVideoModal = () => {
  videoModalVisible.value = false
  currentVideo.value = null
  // 恢复背景滚动
  document.body.style.overflow = 'auto'
}

// 键盘事件处理
const handleKeydown = (event) => {
  if (event.key === 'Escape' && videoModalVisible.value) {
    closeVideoModal()
  }
}

// 页面加载时获取数据
onMounted(async () => {
  await Promise.all([
    fetchVideos(), // 获取视频列表
    fetchCategories() // 获取产品分类列表
  ])
  
  // 添加键盘事件监听
  document.addEventListener('keydown', handleKeydown)
})

// 页面卸载时清理事件监听
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  // 确保恢复背景滚动
  document.body.style.overflow = 'auto'
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
