<template>
  <div>
    <!-- banner -->
    <div class="banner mb-10">
      <div class="max-w-7xl p-4 mx-auto flex flex-col justify-center h-full text-white">
        <h1 class="text-6xl font-bold mb-4">
          {{ aboutUs?.title || 'About Us' }}
        </h1>
        <p class="text-2xl">
          {{
            aboutUs?.directions ||
            "From Dongguan, the World's Factory\nYour Chemical Supply Expert"
          }}
        </p>
      </div>
    </div>
    <!-- 内容 -->
    <div class="max-w-7xl mx-auto px-4">
      <!-- 公司简介 -->
      <div class="flex flex-col gap-2 mb-10" id="company-profile">
        <h1 class="text-2xl font-bold text-green-700">
          {{ aboutUs?.companyName || 'Dongguan Yunzhu New Materials Co., Ltd' }}
        </h1>
        <img :src="coverImageUrl" alt="Dongguan Yunzhu New Materials Co., Ltd" class="w-200" mode="widthFix" />
        <p class="text-lg">
          {{ aboutUs?.companyIntroduction }}
        </p>
      </div>
      <!-- 生产基地 -->
      <div class="flex flex-col gap-2 mb-10" id="production-base">
        <h2 class="text-2xl font-bold text-green-700">Production Base</h2>
        <div class="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
          <div class="flex flex-col cursor-pointer hover:shadow-lg transition-all duration-200 relative"
            v-for="item in productionBase" :key="item.id" @click="openImagePreview(item, 'production')">
            <div class="relative overflow-hidden">
              <img :src="item.image" :alt="item.name"
                class="h-50 w-full object-cover hover:scale-105 transition-transform duration-200" mode="aspectFit" />
            </div>
            <text class="bg-gray-200 p-2 text-center hover:bg-gray-300 transition-colors duration-200">{{ item.name
              }}</text>
          </div>
        </div>
      </div>
      <!-- 证书 -->
      <div class="flex flex-col gap-4 mb-10" id="Qualifcations">
        <h2 class="text-2xl font-bold text-green-700">Qualifcations</h2>
        <p>{{ aboutUs?.qualifcationsInfo }}
        </p>

        <!-- 数据展示 -->
        <div class="flex gap-4">
          <div class="flex flex-col w-40 lg:w-70 hover:shadow-lg transition-all duration-200 cursor-pointer relative"
            v-for="item in qualifications" :key="item.id" @click="openImagePreview(item, 'qualification')">
            <div class="relative overflow-hidden">
              <img :src="item.image" :alt="item.name" mode="aspectFit"
                class="w-full h-auto hover:scale-105 transition-transform duration-200" />
            </div>
            <text class="bg-gray-200 p-2 text-center hover:bg-gray-300 transition-colors duration-200">{{ item.name
              }}</text>
          </div>
        </div>
      </div>
      <!-- 合作伙伴 -->
      <div class="flex flex-col gap-4 mb-10" id="partners">
        <h2 class="text-2xl font-bold text-green-700">Partner Clients</h2>
        <p>{{ aboutUs?.partnerInfo }}</p>
        <!-- 数据展示 -->
        <div class="flex flex-wrap gap-4">
          <div class="flex flex-col lg:w-70 w-40" v-for="item in partners" :key="item.id">
            <img :src="item.image" :alt="item.name" mode="aspectFit" />
            <text class="bg-gray-200 p-2 text-center">{{ item.name }}</text>
          </div>
        </div>
      </div>

      <!-- 图片预览 -->
      <div class="fixed inset-0 bg-black/80 flex flex-col justify-center items-center z-50" v-if="isImagePreview"
        @click="closeImagePreview">
        <!-- 关闭按钮 -->
        <button @click="closeImagePreview"
          class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10">
          <Icon name="mdi:close" class="w-8 h-8 text-white" />
        </button>

        <!-- 图片容器 -->
        <div class="relative max-w-4xl max-h-4xl mx-4">
          <img :src="currentImage" :alt="currentImageName"
            class="max-w-full max-h-full object-contain cursor-pointer" />
        </div>

        <!-- 标题 -->
        <div class="text-xl font-bold text-center text-white mt-6 px-4">
          {{ currentImageName }}
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// 生产基地 - 从服务器数据获取
const productionBase = computed(() => {
  if (!aboutUs.value?.productionBase?.data) {
    return []
  }
  return aboutUs.value.productionBase.data.map((item, index) => ({
    id: item.id || index + 1,
    name: item.attributes?.alternativeText || `Production Base ${index + 1}`,
    image: getDirectImageUrl(item),
  }))
})


// 证书
const qualifications = computed(() => {
  if (!aboutUs.value?.qualifcations?.data) {
    return []
  }
  return aboutUs.value.qualifcations.data.map((item, index) => ({
    id: item.id || index + 1,
    name: item.attributes?.alternativeText || `Qualification ${index + 1}`,
    image: getDirectImageUrl(item),
  }))
})

// 合作伙伴
const partners = computed(() => {
  if (!aboutUs.value?.partners?.data) {
    return []
  }
  return aboutUs.value.partners.data.map((item, index) => ({
    id: item.id || index + 1,
    name: item.attributes?.alternativeText || `Partner ${index + 1}`,
    image: getDirectImageUrl(item),
  }))
})

// 图片预览
const isImagePreview = ref(false)
const currentImage = ref('')
const currentImageName = ref('')

const openImagePreview = (item, type) => {
  isImagePreview.value = true
  currentImage.value = item.image
  currentImageName.value = item.name
}

const closeImagePreview = () => {
  isImagePreview.value = false
  currentImage.value = ''
  currentImageName.value = ''
}

// 获取关于我们
const { getAboutUs, getStrapiImageUrl, getDirectImageUrl } = useStrapi()
const aboutUs = ref(null)

// 封面图片URL
const coverImageUrl = computed(() => {
  return getStrapiImageUrl(aboutUs.value, 'cover', '/image/aboutUsCover.webp')
})

onMounted(async () => {
  aboutUs.value = await getAboutUs()
  console.log('aboutUs:', aboutUs.value)
})
</script>

<style scoped>
.banner {
  background-image: url('/image/banner-about.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 30vh;
  display: block;
}

/* 手机版 */
@media (max-width: 768px) {
  .banner {
    display: none;
  }
}
</style>
