<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div class="relative">
      <!-- 主加载圈 -->
      <div class="animate-spin rounded-full border-4 border-gray-200 border-t-green-600" :class="spinnerClass"></div>

      <!-- 中心点（可选） -->
      <div v-if="showCenterDot" class="absolute inset-0 flex items-center justify-center">
        <div class="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
      </div>
    </div>

    <!-- 加载文字 -->
    <div v-if="text" class="ml-3 text-gray-600 font-medium">{{ text }}</div>
  </div>
</template>

<script setup>
  defineProps({
    // 容器样式类
    containerClass: {
      type: String,
      default: 'p-8'
    },
    // 加载圈样式类
    spinnerClass: {
      type: String,
      default: 'w-8 h-8'
    },
    // 是否显示中心点
    showCenterDot: {
      type: Boolean,
      default: false
    },
    // 加载文字
    text: {
      type: String,
      default: ''
    }
  })
</script>
