<template>
  <div>
    <h1>Solution-{{ slug }}</h1>
  </div>
</template>

<script setup>
  import {ref, onMounted, onUnmounted} from 'vue'
  import {useRoute} from 'vue-router'
  import {useStrapi} from '#imports'

  const route = useRoute()
  const {getSolution} = useStrapi() // 从 useStrapi 获取 getSolution 方法

  const solution = ref(null) // 解决方案数据
  const loading = ref(true) // 加载状态

  onMounted(async () => {
    try {
      const solutionData = await getSolution(route.params.slug) // 使用 getSolution 方法获取解决方案
      if (solutionData) {
        solution.value = solutionData
      } else {
        solution.value = null // 解决方案未找到
      }
    } catch (error) {
      console.error('Error fetching solution:', error)
      solution.value = null
    } finally {
      loading.value = false
    }
  })
</script>

<style scoped></style>
