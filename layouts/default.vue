<template>
  <div>
    <div class="min-h-screen bg-gray-50">
      <!-- 头部 -->
      <header class="h-30 mx-auto flex items-center gap-5 justify-between relative z-40">
        <!-- logo -->
        <img class="h-16 ml-4" src="../public/image/logo-en.png" />

        <!-- 手机版汉堡菜单按钮 -->
        <button @click="toggleMobileMenu"
          class="lg:hidden flex items-center justify-center w-10 h-10 text-green-800 hover:bg-green-100 rounded-lg transition-colors duration-200 menu-mobile">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <!-- 导航 -->
        <div class="flex-1 menu-pc">
          <!-- 咨询热线 -->
          <div class="flex bg-green-800 h-14 rounded-bl-full items-center justify-between p-2 pl-10">
            <!-- 咨询热线 -->
            <div class="flex items-center gap-2">
              <PhoneIcon class="w-6 h-6 text-white" />
              <NuxtLink to="tel:+8618122288163" class="text-white hover:text-yellow-500">Consultation Hotline: +8618122288163</NuxtLink>
            </div>
            <!-- 在线咨询 -->
            <UButton
              class="flex w-36 h-full items-center justify-center gap-2 text-green-800 hover:bg-yellow-400 cursor-pointer bg-yellow-500 rounded-lg"
              variant="solid" color="yellow">
              <ChatBubbleLeftRightIcon class="w-6 h-6 text-green-800" />
              <span class="hover:font-bold">Chat Now</span>
            </UButton>
          </div>
          <!-- 导航 -->
          <div class="flex gap-5 justify-between w-full pr-4 t">
            <div class="flex items-center justify-center gap-10 flex-1 pl-10">
              <div class="flex h-16 justify-center text-lg items-center relative" v-for="(item, index) in navList"
                :key="index" @mouseover="showChildren(index)" @mouseout="hideChildren(index)">
                <div @click="handleNavClick(item)" class="flex items-center gap-1 hover:text-yellow-500 cursor-pointer">
                  <NuxtLink v-if="item.path" :to="item.path">{{ item.name }}</NuxtLink>
                  <span v-else>{{ item.name }}</span>
                  <chevron-downIcon class="w-4 h-4 text-green-800" v-if="item.children.length > 0" />
                </div>
                <div
                  class="nav-children absolute shadow-lg transition-all duration-300 ease-in-out transform origin-top"
                  v-if="item.children.length > 0" :class="{
                    'opacity-100 scale-y-100 translate-y-0': activeIndex === index,
                    'opacity-0 scale-y-95 -translate-y-2 pointer-events-none': activeIndex !== index
                  }" :style="{ display: activeIndex === index ? 'block' : 'none' }">
                  <ul>
                    <li v-for="(child, index2) in item.children" :key="index2"
                      class="nav-child-item hover:bg-gray-100 hover:text-yellow-500 transition-colors duration-200 text-base">
                      <NuxtLink :to="child.url" class="block w-full h-full px-4 py-2" @click="closeDropdown">
                        {{ child.name }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 搜索 -->
            <div class="flex items-center justify-center gap-2">
              <input type="text" placeholder="Search" class="border-gray-300 border p-2 rounded-full"
                v-model="search" />
              <UIcon name="i-heroicons-magnifying-glass"
                class="w-6 h-6 text-gray-500 cursor-pointer hover:text-yellow-500" @click="handleSearch" />
            </div>
          </div>
        </div>
      </header>

      <!-- 手机版侧边栏导航 -->
      <Transition name="mobile-menu">
        <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black/50 z-50 lg:hidden" @click="closeMobileMenu">
          <div class="fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-all duration-300 ease-out"
            :class="{
              'translate-x-0': isMobileMenuOpen,
              'translate-x-full': !isMobileMenuOpen
            }" @click.stop>
            <!-- 侧边栏头部 -->
            <div class="flex items-center justify-between p-4 border-b border-gray-200">
              <button @click="closeMobileMenu" class="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
              </button>
            </div>

            <!-- 侧边栏内容 -->
            <div class="p-4">
              <!-- 咨询热线 -->
              <div class="bg-green-800 rounded-lg p-4 mb-6">
                <div class="flex items-center gap-2 mb-3">
                  <PhoneIcon class="w-4 h-4 text-white" />
                  <text class="text-white text-xs">Consultation Hotline</text>
                </div>
                <UButton
                  class="w-full flex items-center justify-center gap-2 text-green-800 bg-yellow-500 hover:bg-yellow-400 rounded-lg py-2"
                  variant="solid" color="yellow">
                  <ChatBubbleLeftRightIcon class="w-5 h-5 text-green-800" />
                  <span class="text-sm font-medium">Chat Now</span>
                </UButton>
              </div>

              <!-- 导航菜单 -->
              <nav class="space-y-2">
                <div v-for="(item, index) in navList" :key="index" class="border-b border-gray-100">
                  <div
                    class="flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <NuxtLink v-if="item.path" :to="item.path" @click="closeMobileMenu" class="flex-1">
                      {{ item.name }}
                    </NuxtLink>
                    <span v-else class="flex-1">{{ item.name }}</span>
                    <button v-if="item.children.length > 0" @click="toggleMobileSubmenu(index)" class="ml-2">
                      <chevron-downIcon class="w-4 h-4 transition-transform" :class="{
                        'rotate-180': openMobileSubmenus.includes(index)
                      }" />
                    </button>
                  </div>
                  <!-- 手机版子菜单 -->
                  <div v-if="item.children.length > 0 && openMobileSubmenus.includes(index)"
                    class="ml-4 mt-2 space-y-1">
                    <NuxtLink v-for="(child, childIndex) in item.children" :key="childIndex" :to="child.url"
                      @click="closeMobileMenu"
                      class="block py-2 px-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-yellow-500 rounded-lg transition-colors duration-200">
                      {{ child.name }}
                    </NuxtLink>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Main Content -->
      <main>
        <slot />
      </main>

      <!-- Footer -->
      <footer>
        <!-- 联系我们表单 -->
        <section id="footer-contact">
          <div class="bg-yellow-500 h-0.5"></div>
          <div class="mx-auto py-4 lg:py-12 px-4 lg:px-8 flex-media gap-8 lg:gap-16">
            <div class="flex flex-col gap-2 sm:w-full lg:w-1/3">
              <h3 class="text-2xl text-green-800 font-bold">Request a Callback</h3>
              <p class="text-gray-500">
                Please complete the form so we can provide quick and effective service. If this is an urgent matter,
                please contact us via phone.
              </p>
              <!-- 社交媒体 -->
              <div class="flex gap-6 pt-4">
                <NuxtLink to="https://wa.me/8618922204566" target="_blank">
                  <img src="/image/home/whatapp.webp" alt="whatapp"
                    class="w-16 h-16 cursor-pointer hover:scale-110 transition-all duration-300" />
                </NuxtLink>
                <NuxtLink to="https://www.facebook.com/profile.php?id=615710000000000" target="_blank">
                  <img src="/image/home/facebook.webp" alt="facebook"
                    class="w-16 h-16 cursor-pointer hover:scale-110 transition-all duration-300" />
                </NuxtLink>
                <NuxtLink to="https://www.youtube.com/@gdyunzhu" target="_blank">
                  <img src="/image/home/youtube.webp" alt="youtube"
                    class="w-16 h-16 cursor-pointer hover:scale-110 transition-all duration-300" />
                </NuxtLink>
              </div>
              <!-- 联系方式 -->
              <div class="flex gap-4 items-center mt-8">
                <PhoneIcon class="w-6 h-6 text-green-800" />
                <NuxtLink to="tel:+8618122288163" class="text-green-800 hover:text-yellow-500">+8618122288163</NuxtLink>
              </div>
              <!-- 邮箱 -->
              <div class="flex gap-4 items-center mt-2">
                <EnvelopeIcon class="w-6 h-6 text-green-800" />
                <NuxtLink to="mailto:SalesSupport@gdyunzhu.com" class="text-green-800 hover:text-yellow-500">
                  SalesSupport@gdyunzhu.com</NuxtLink>
              </div>
              <!-- 办公室地址 -->
              <div class="flex gap-4 mt-2">
                <div class="w-6 h-6">
                  <MapPinIcon class="w-6 h-6 text-green-800" />
                </div>
                <div class="text-gray-500">
                  <div>
                    <span class="font-bold text-green-800">Sales office:</span>
                    Dongcheng Street, Dongguan City, Guangdong Province, China
                  </div>
                  <div class="mt-2">
                    <span class="font-bold text-green-800">Factory:</span>Yingfu lindustrial Park, Dalingshan Town,
                    Dongguan City, Guangdong Province, China
                  </div>
                </div>
              </div>
            </div>
            <form class="flex flex-col gap-2 flex-1" @submit.prevent="handleFormSubmit">
              <!-- 防垃圾字段（不可见） -->
              <input type="text" name="_honey" style="display: none" />
              <!-- 表单提交成功后跳转的页面 -->
              <input type="hidden" name="_next" value="http://localhost:3000/thankyou" />
              <div>Your Name <span class="text-red-500">*</span></div>
              <input type="text" name="name" placeholder="Your Name" maxlength="140"
                class="border-gray-300 border p-2 mb-2 rounded" required />
              <div>E-mail <span class="text-red-500">*</span></div>
              <input type="email" name="email" placeholder="E-mail" maxlength="140"
                class="border-gray-300 border p-2 mb-2 rounded" required />
              <div>WhatsApp <span class="text-red-500">*</span></div>
              <input type="text" name="whatsapp" placeholder="WhatsApp" maxlength="140"
                class="border-gray-300 border p-2 mb-2 rounded" required />
              <div>What's your purpose?</div>
              <select class="border-gray-300 border p-2 mb-2 rounded" name="purpose" required>
                <option value="" disabled selected>Please select</option>
                <option :value="i.name" v-for="i in inputList" :key="i.name">
                  {{ i.name }}
                </option>
              </select>
              <div>Message Information <span class="text-red-500">*</span></div>
              <textarea name="message" placeholder="Message Information:"
                class="border-gray-300 border w-full h-40 p-2 mb-2 rounded" required></textarea>
              <button type="submit"
                class="border-green-700 border-2 hover:bg-yellow-500 hover:shadow-md font-bold text-green-700 p-2 w-full max-w-xs rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="isSubmitting">
                <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                  <div class="animate-spin rounded-full h-4 w-4 border-2 border-green-700 border-t-transparent"></div>
                  SUBMITTING...
                </span>
                <span v-else>SUBMIT FORM</span>
              </button>
            </form>
          </div>
        </section>

        <!-- 底部 -->
        <div class="bg-yellow-500 h-1.5"></div>
        <div class="bg-green-800 text-white text-center py-10 text-sm">
          <div class="mb-2">
            Copyright © 2025 Powered by
            <span class="font-semibold text-yellow-500">Yunzhu</span> – Release Agent Manufacturer.
          </div>
          <div class="text-xs">
            YUNZHU is a leading release agent manufacturer in China,specializing in custom-designed mold release
            solutions
            for various industrial applications, ensuring high-quality and reliable performance for global customers.
          </div>
          <!-- <span>Record Number:粤ICP备2024298772号-1</span> -->
        </div>
      </footer>
    </div>

    <!-- 简单的Chaty组件 -->
    <SimpleChaty />

    <!-- 全屏遮罩和Loading效果 -->
    <Transition name="fade">
      <div v-if="isSubmitting" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm">
        <div class="p-8 flex flex-col items-center gap-6 max-w-sm mx-4">
          <!-- Loading动画 -->
          <div class="relative">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-green-600"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-8 h-8 bg-green-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-semibold text-white mb-2">Submitting...</div>
            <div class="text-white">Please wait, do not close the page</div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const activeIndex = ref(-1) // 导航栏子菜单
const search = ref('') // 搜索
const { submitForm } = useStrapi() // 使用 Strapi 表单提交方法

// 搜索
const handleSearch = () => {
  console.log(search.value)
}

// 导航栏
const navList = [
  {
    name: 'Home',
    path: '/',
    children: []
  },
  {
    name: 'Product',
    path: '/product',
    children: [
      {
        name: 'Concrete Release Agent',
        url: '/product/concrete-release-agent'
      },
      {
        name: 'Polyurethane Release Agent',
        url: '/product/polyurethane-release-agent'
      },
      {
        name: 'Composite Release Agent',
        url: '/product/composite-release-agent'
      },
      {
        name: 'Metal Casting Release Agent',
        url: '/product/metal-casting-release-agent'
      },
      {
        name: 'Rubber Release Agent',
        url: '/product/rubber-release-agent'
      },
      {
        name: 'Plastic Release Agent',
        url: '/product/plastic-release-agent'
      }
    ]
  },
  {
    name: 'Solution',
    path: '/solution',
    children: [
      {
        name: 'Concrete Release Agent',
        url: '/solution/concrete-release-agent'
      },
      {
        name: 'Polyurethane Release Agent',
        url: '/solution/polyurethane-release-agent'
      },
      {
        name: 'Composite Release Agent',
        url: '/solution/composite-release-agent'
      }
    ]
  },
  {
    name: 'Resources',
    path: '',
    children: [
      {
        name: 'Blog',
        url: '/blog'
      },
      {
        name: 'FAQ',
        url: '/faq'
      },
      {
        name: 'Video',
        url: '/video'
      }
    ]
  },
  {
    name: 'About Us',
    path: '/about-us',
    children: []
  }
]
// 导航栏显示子菜单 (鼠标悬停)
const showChildren = index => {
  console.log('showChildren called with index:', index)
  activeIndex.value = index
}
// 导航栏隐藏子菜单 (鼠标移出)
const hideChildren = index => {
  activeIndex.value = -1
}
// 关闭下拉菜单
const closeDropdown = () => {
  activeIndex.value = -1
}
// 点击外部关闭菜单
onMounted(() => {
  document.addEventListener('click', e => {
    if (!e.target.closest('.relative')) {
      // showLanguageMenu.value = false // Removed i18n related code
    }
  })

  // 键盘事件处理
  const handleKeydown = e => {
    if (e.key === 'Escape') {
      if (isMobileMenuOpen.value) {
        closeMobileMenu()
      }
    }
  }

  // 键盘事件处理
  document.addEventListener('keydown', handleKeydown)

  // 卸载事件处理
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    // 确保页面滚动恢复正常
    document.body.style.overflow = 'auto'
  })
})
// 手机版侧边栏导航
const isMobileMenuOpen = ref(false)
const openMobileSubmenus = ref([])
// 切换手机版菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    // 禁止页面滚动
    document.body.style.overflow = 'hidden'
  } else {
    // 延迟恢复页面滚动，等待动画完成
    setTimeout(() => {
      document.body.style.overflow = 'auto'
    }, 300)
  }
}
// 关闭手机版菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  openMobileSubmenus.value = []
  // 延迟恢复页面滚动，等待动画完成
  setTimeout(() => {
    document.body.style.overflow = 'auto'
  }, 300)
}
// 切换手机版子菜单
const toggleMobileSubmenu = index => {
  const currentIndex = openMobileSubmenus.value.indexOf(index)
  if (currentIndex > -1) {
    openMobileSubmenus.value.splice(currentIndex, 1)
  } else {
    openMobileSubmenus.value.push(index)
  }
}
// 导航点击处理
const handleNavClick = item => {
  if (item.path) {
    closeMobileMenu()
  }
}

// 联系我们表单选项
const inputList = computed(() => [
  { name: 'Buy Release Agents' },
  { name: 'Request Free Samples' },
  { name: 'Become a Distributor' },
  { name: 'Custom Solutions' },
  { name: 'Others' }
])
// 表单提交状态
const isSubmitting = ref(false)
// 表单提交处理
const handleFormSubmit = async event => {
  event.preventDefault()

  if (isSubmitting.value) return

  // 显示loading效果
  isSubmitting.value = true

  try {
    const form = event.target
    console.log('form:', form)

    // 1. 获取IP地址
    const ipResponse = await $fetch('https://api.ipify.org?format=json')

    // 2. 使用 useStrapi 的 submitForm 方法提交到 Strapi
    const strapiFormData = {
      data: {
        name: form.name.value,
        email: form.email.value,
        whatsapp: form.whatsapp.value,
        purpose: form.purpose.value,
        information: form.message.value, // 改为 information 字段
        ip: ipResponse.ip
      }
    }
    console.log('strapiFormData:', strapiFormData)

    const strapiResponse = await submitForm(strapiFormData)
    console.log('Strapi response:', strapiResponse)

    if (strapiResponse) {
      console.log('Form submitted successfully to Strapi:', strapiResponse)
      // 跳转到感谢页面
      window.location.href = '/thankyou'
    } else {
      // 如果返回 null，说明是真正的失败
      throw new Error('Strapi submission failed')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    alert('Form submission failed, please try again later')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* 仅保留导航下拉菜单、移动端菜单动画等必要样式 */
.nav-child-item {
  padding: 0 8px;
  width: 100%;
}

.nav-children {
  width: 320px;
  top: 100%;
  left: 0;
  padding: 8px 0;
  border-radius: 0 0 4px 4px;
  z-index: 50;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.flex-media {
  display: flex;
  flex-direction: row;
}

.display-none {
  display: block;
}

.menu-pc {
  display: block;
}

.menu-mobile {
  display: none;
}

@media (max-width: 768px) {
  .menu-pc {
    display: none;
  }

  .menu-mobile {
    display: block;
  }

  .flex-media {
    flex-direction: column;
  }

  .display-none {
    display: none;
  }
}

/* 手机版侧边栏动画 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease-out;
}

.mobile-menu-enter-from {
  opacity: 0;
}

.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-active .fixed,
.mobile-menu-leave-active .fixed {
  transition: transform 0.3s ease-out;
}

.mobile-menu-enter-from .fixed {
  transform: translateX(100%);
}

.mobile-menu-leave-to .fixed {
  transform: translateX(100%);
}

/* Loading遮罩动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
