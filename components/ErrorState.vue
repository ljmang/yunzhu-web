<template>
  <div class="flex flex-col items-center justify-center text-center" :class="containerClass">
    <!-- 错误图标 -->
    <div class="mb-4">
      <slot name="icon">
        <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <Icon :name="icon" class="w-8 h-8 text-red-500" />
        </div>
      </slot>
    </div>

    <!-- 错误标题 -->
    <h3 v-if="title" class="text-lg font-semibold text-gray-900 mb-2">
      {{ title }}
    </h3>

    <!-- 错误描述 -->
    <p v-if="description" class="text-gray-500 mb-6 max-w-md">
      {{ description }}
    </p>

    <!-- 错误详情（可选） -->
    <div v-if="error && showErrorDetails" class="mb-6 p-3 bg-red-50 rounded-lg max-w-md">
      <p class="text-sm text-red-600 font-mono break-all">
        {{ error }}
      </p>
    </div>

    <!-- 操作按钮 -->
    <div v-if="$slots.action" class="flex gap-3">
      <slot name="action" />
    </div>

    <!-- 默认重试按钮 -->
    <div v-else-if="showRetry" class="flex gap-3">
      <UButton @click="$emit('retry')" color="red" variant="solid">
        <Icon name="mdi:refresh" class="w-4 h-4 mr-2" />
        重试
      </UButton>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    // 容器样式类
    containerClass: {
      type: String,
      default: 'py-12 px-4'
    },
    // 图标名称
    icon: {
      type: String,
      default: 'mdi:alert-circle-outline'
    },
    // 标题
    title: {
      type: String,
      default: '出错了'
    },
    // 描述
    description: {
      type: String,
      default: '加载数据时发生错误，请稍后重试'
    },
    // 错误信息
    error: {
      type: String,
      default: ''
    },
    // 是否显示错误详情
    showErrorDetails: {
      type: Boolean,
      default: false
    },
    // 是否显示重试按钮
    showRetry: {
      type: Boolean,
      default: true
    }
  })

  defineEmits(['retry'])
</script>
