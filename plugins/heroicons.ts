import { defineNuxtPlugin } from '#app'
import * as HeroiconsOutline from '@heroicons/vue/24/outline'
import * as HeroiconsSolid from '@heroicons/vue/24/solid'

export default defineNuxtPlugin((nuxtApp) => {
  // 注册所有 Heroicons Outline 图标
  for (const [name, icon] of Object.entries(HeroiconsOutline)) {
    nuxtApp.vueApp.component(`${name}`, icon)
  }
  
  // 注册所有 Heroicons Solid 图标（添加Solid后缀以区分）
  for (const [name, icon] of Object.entries(HeroiconsSolid)) {
    nuxtApp.vueApp.component(`${name}Solid`, icon)
  }
}) 