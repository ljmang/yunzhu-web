<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Banner -->
    <div class="h-120 relative">
      <img
        src="/image/banner-project.webp"
        alt="solutions"
        class="w-full h-full object-cover"
      />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h1 class="text-5xl font-bold mb-4">Solutions</h1>
        <p class="text-xl">Professional release agent solutions to help your production succeed</p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Loading state -->
      <div v-if="loading" class="py-12">
        <LoadingSpinner text="Loading solutions..." />
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="py-12">
        <ErrorState 
          title="Loading Failed" 
          description="Unable to load solutions list. Please try again later."
          :error="error"
          @retry="fetchSolutions"
        />
      </div>
      
      <!-- Solutions list -->
      <div v-else-if="solutions.length > 0">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="solution in solutions" 
            :key="solution.id"
            class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            <!-- Solution cover -->
            <img 
              v-if="getStrapiImageUrl(solution.attributes, 'cover')"
              :src="getStrapiImageUrl(solution.attributes, 'cover')"
              :alt="solution.attributes.title"
              class="w-full h-48 object-cover"
            />
            <div v-else class="w-full h-48 bg-gray-200 flex items-center justify-center">
              <Icon name="mdi:file-document-outline" class="w-12 h-12 text-gray-400" />
            </div>
            
            <!-- Solution info -->
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                {{ solution.attributes.title }}
              </h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                {{ solution.attributes.description || 'No description' }}
              </p>
              
              <!-- Solution status -->
              <div class="mb-4">
                <StatusBadge 
                  text="Available" 
                  type="success" 
                  icon="mdi:check-circle"
                />
              </div>
              
              <!-- View details button -->
              <NuxtLink 
                :to="`/solution/${solution.attributes.slug}`"
                class="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
              >
                View Details
                <Icon name="mdi:arrow-right" class="w-4 h-4 ml-1" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty state -->
      <div v-else class="py-12">
        <EmptyState 
          title="No Solutions" 
          description="There are no solutions available yet. Please check back later."
          icon="mdi:file-search-outline"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { getSolutions, getStrapiImageUrl } = useStrapi()

// 响应式数据
const solutions = ref([])
const loading = ref(true)
const error = ref(null)

  // Fetch solutions list
  const fetchSolutions = async () => {
    try {
      loading.value = true
      error.value = null
      const solutionsData = await getSolutions()
      solutions.value = solutionsData || []
    } catch (err) {
      console.error('Failed to fetch solutions:', err)
      error.value = 'Failed to load solutions'
      solutions.value = []
    } finally {
      loading.value = false
    }
  }

  // Load data on page mount
  onMounted(() => {
    fetchSolutions()
  })

  // SEO
  useHead({
    title: 'Solutions - Yunzhu Industry',
    meta: [
      {
        name: 'description',
        content: 'Professional release agent solutions for different industries with customized products and services'
      }
    ]
  })
</script>
