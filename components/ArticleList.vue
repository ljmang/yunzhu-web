<template>
  <div class="article-list">
    <div v-if="title" class="mb-6">
      <h2 class="text-3xl font-bold mb-2 text-green-800">{{ title }}</h2>
      <p v-if="subtitle" class="text-gray-400">{{ subtitle }}</p>
    </div>
    
    <div :class="containerClass">
      <ArticleCard 
        v-for="(article, index) in displayArticles" 
        :key="article.id" 
        :article="article"
        :variant="variant"
        :show-summary="showSummary"
        :show-description="showDescription"
      />
    </div>
    
    <div v-if="showMoreLink && hasMoreArticles" class="text-center mt-6">
      <NuxtLink :to="moreLinkUrl" class="text-yellow-500 hover:text-yellow-600">
        {{ moreLinkText }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  articles: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
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
    default: 0 // 0表示显示所有文章
  },
  layout: {
    type: String,
    default: 'grid', // 'grid', 'list'
    validator: (value) => ['grid', 'list'].includes(value)
  },
  showMoreLink: {
    type: Boolean,
    default: false
  },
  moreLinkUrl: {
    type: String,
    default: '/blog'
  },
  moreLinkText: {
    type: String,
    default: 'More Articles >'
  }
})

// 计算要显示的文章
const displayArticles = computed(() => {
  if (props.maxCount > 0) {
    return props.articles.slice(0, props.maxCount)
  }
  return props.articles
})

// 计算是否有更多文章
const hasMoreArticles = computed(() => {
  return props.maxCount > 0 && props.articles.length > props.maxCount
})

// 计算容器样式类
const containerClass = computed(() => {
  if (props.layout === 'list') {
    return 'flex flex-col gap-4'
  }
  
  // grid布局
  if (props.variant === 'compact') {
    return 'grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8'
  }
  
  return 'grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8'
})
</script>
