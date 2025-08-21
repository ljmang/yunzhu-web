<template>
  <div class="article-card">
    <!-- 文章链接 -->
    <NuxtLink :to="`/blog/${article.attributes.slug}`" 
              class="block hover:shadow-lg transition-all duration-300"
              :class="cardClass">
      <!-- 文章图片 -->
      <div class="article-image-container" :class="imageContainerClass">
        <img v-if="getStrapiImageUrl(article.attributes, 'cover')"
             :src="getStrapiImageUrl(article.attributes, 'cover')" 
             :alt="article.attributes.title"
             class="article-image" 
             :class="imageClass" />
        <div v-else class="article-placeholder" :class="placeholderClass">
          <Icon name="mdi:file-document" class="w-8 h-8 text-gray-400" />
        </div>
      </div>
      
      <!-- 文章内容 -->
      <div class="article-content" :class="contentClass">
        <h3 class="article-title" :class="titleClass">
          {{ article.attributes.title }}
        </h3>
        <p v-if="showSummary" class="article-summary" :class="summaryClass">
          {{ article.attributes.summary }}
        </p>
        <p v-if="showDescription" class="article-description" :class="descriptionClass">
          {{ article.attributes.description }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { useStrapi } from '~/composables/useStrapi'

// Props
const props = defineProps({
  article: {
    type: Object,
    required: true
  },
  variant: {
    type: String,
    default: 'default', // 'default', 'compact'
    validator: (value) => ['default', 'compact'].includes(value)
  },
  showSummary: {
    type: Boolean,
    default: true
  },
  showDescription: {
    type: Boolean,
    default: false
  },
  maxCount: {
    type: Number,
    default: 0 // 0表示不限制数量
  }
})

// 获取Strapi工具函数
const { getStrapiImageUrl } = useStrapi()

// 根据variant计算样式类
const cardClass = computed(() => {
  return props.variant === 'compact' 
    ? 'flex flex-col bg-gray-100 hover:bg-gray-200' 
    : 'flex flex-col bg-gray-100 hover:bg-gray-200'
})

const imageContainerClass = computed(() => {
  return 'w-full'
})

const imageClass = computed(() => {
  return props.variant === 'compact'
    ? 'w-full h-48 object-cover'
    : 'w-full h-48 object-cover'
})

const placeholderClass = computed(() => {
  return props.variant === 'compact'
    ? 'w-full h-48 bg-gray-200 flex items-center justify-center'
    : 'w-full h-48 bg-gray-200 flex items-center justify-center'
})

const contentClass = computed(() => {
  return 'p-4 flex-1'
})

const titleClass = computed(() => {
  return props.variant === 'compact'
    ? 'text-green-800 hover:text-yellow-500  mb-2 font-semibold'
    : 'text-green-800 hover:text-yellow-500  mb-2 font-semibold'
})

const summaryClass = computed(() => {
  return props.variant === 'compact'
    ? 'line-clamp-2 text-sm text-gray-400'
    : 'line-clamp-2 text-sm text-gray-400'
})

const descriptionClass = computed(() => {
  return 'text-sm text-gray-600 mt-2'
})
</script>

<style scoped>
.article-card {
  @apply transition-all duration-300;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
