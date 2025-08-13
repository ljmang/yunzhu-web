<template>
  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="badgeClass">
    <span v-if="showDot" class="w-1.5 h-1.5 rounded-full mr-1.5" :class="dotClass"></span>
    <Icon v-if="icon" :name="icon" class="w-3 h-3 mr-1" />
    {{ text }}
  </span>
</template>

<script setup>
  const props = defineProps({
    // 状态类型
    type: {
      type: String,
      default: 'default',
      validator: value => ['success', 'warning', 'error', 'info', 'default'].includes(value)
    },
    // 显示文字
    text: {
      type: String,
      required: true
    },
    // 图标
    icon: {
      type: String,
      default: ''
    },
    // 是否显示状态点
    showDot: {
      type: Boolean,
      default: false
    }
  })

  // 根据类型计算样式类
  const badgeClass = computed(() => {
    const classes = {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
      default: 'bg-gray-100 text-gray-800'
    }
    return classes[props.type] || classes.default
  })

  const dotClass = computed(() => {
    const classes = {
      success: 'bg-green-400',
      warning: 'bg-yellow-400',
      error: 'bg-red-400',
      info: 'bg-blue-400',
      default: 'bg-gray-400'
    }
    return classes[props.type] || classes.default
  })
</script>
