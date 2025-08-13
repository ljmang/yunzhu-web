<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <!-- 加载动画 -->
      <div class="relative mb-6">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-green-600 mx-auto"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-6 h-6 bg-green-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      <!-- 加载文字 -->
      <div class="text-gray-600">
        <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
        <p class="text-sm">{{ description }}</p>
      </div>

      <!-- 进度条（可选） -->
      <div v-if="showProgress" class="mt-6 max-w-xs mx-auto">
        <div class="bg-gray-200 rounded-full h-2">
          <div class="bg-green-600 h-2 rounded-full transition-all duration-300" :style="{width: `${progress}%`}"></div>
        </div>
        <p class="text-xs text-gray-500 mt-2">{{ progress }}%</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    // 标题
    title: {
      type: String,
      default: '加载中...'
    },
    // 描述
    description: {
      type: String,
      default: '请稍候，正在为您准备内容'
    },
    // 是否显示进度条
    showProgress: {
      type: Boolean,
      default: false
    },
    // 进度百分比
    progress: {
      type: Number,
      default: 0
    }
  })
</script>
