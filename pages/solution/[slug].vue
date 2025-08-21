<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading state -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <LoadingSpinner text="Loading solution..." />
    </div>
    
    <!-- Error state -->
    <div v-else-if="!solution" class="flex items-center justify-center min-h-screen">
      <ErrorState 
        title="Solution Not Found" 
        description="Sorry, the solution you're looking for doesn't exist or has been removed."
        icon="mdi:file-search-outline"
        :show-retry="false"
      >
        <template #action>
          <NuxtLink to="/solution" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Solutions
          </NuxtLink>
        </template>
      </ErrorState>
    </div>
    
    <!-- Solution content -->
    <div v-else class="max-w-6xl mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-sm p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ solution.attributes?.title || `Solution-${route.params.slug}` }}</h1>
        
        <!-- Solution status -->
        <div class="mb-6">
          <StatusBadge 
            text="Published" 
            type="success" 
            icon="mdi:check-circle"
            :show-dot="true"
          />
        </div>
        
        <!-- Solution description -->
        <div v-if="solution.attributes?.description" class="prose prose-lg max-w-none mb-8">
          <div v-html="solution.attributes.description"></div>
        </div>
        
        <!-- Solution details -->
        <div v-if="solution.attributes?.content" class="prose prose-lg max-w-none">
          <div v-html="solution.attributes.content"></div>
        </div>
        
        <!-- If no content, show empty state -->
        <div v-else class="mt-8">
          <EmptyState 
            title="No Detailed Content" 
            description="The detailed content for this solution is being prepared."
            icon="mdi:file-document-outline"
          />
        </div>
      </div>
    </div>
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
