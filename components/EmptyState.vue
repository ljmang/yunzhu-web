<template>
  <div class="flex flex-col items-center justify-center text-center" :class="containerClass">
    <!-- 图标 -->
    <div class="mb-4">
      <slot name="icon">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Icon :name="icon" class="w-8 h-8 text-gray-400" />
        </div>
      </slot>
    </div>

    <!-- 标题 -->
    <h3 v-if="title" class="text-lg font-semibold text-gray-900 mb-2">
      {{ title }}
    </h3>

    <!-- 描述 -->
    <p v-if="description" class="text-gray-500 mb-6 max-w-md">
      {{ description }}
    </p>

    <!-- 操作按钮 -->
    <div v-if="$slots.action" class="flex gap-3">
      <slot name="action" />
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
      default: 'mdi:file-search-outline'
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 描述
    description: {
      type: String,
      default: ''
    }
  })
</script>
