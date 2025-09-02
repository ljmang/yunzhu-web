<template>
  <div>
    <!-- Hero Banner Section -->
    <section class="relative text-white h-160 flex items-center">
      <div class="absolute inset-0 bg-gradient-to-r from-green-800 to-transparent opacity-100 z-1" />
      <!-- 背景图片 -->
      <div class="absolute inset-0">
        <img src="/image/home/banner_01.webp" alt="Industrial Background" class="w-full h-full object-cover"
          @load="imageLoaded = true" @error="handleImageError" />
      </div>

      <!-- Hero Banner 内容 -->
      <div class="max-w-7xl mx-auto px-4 z-2 flex gap-4">
        <div class="flex flex-col gap-8">
          <h1 class="text-4xl lg:text-6xl font-bold leading-tight">
            Advanced Mold Release Solutions for Maximum Manufacturing Efficiency
          </h1>
          <p class="text-xl text-gray-200">
            Increase cycle times, reduce defect rates, and enhance surface finish.
            We partner with manufacturers in Southeast Asia and India to solve
            your toughest molding challenges.
          </p>
          <NuxtLink to="/product"
            class="bg-yellow-500 text-white px-10 py-4 hover:bg-yellow-400 w-fit flex items-center gap-2">
            <text class="text-xl">Explore Industry Solutions</text>
            <Icon name="mdi:arrow-right" class="w-5 h-5" />
          </NuxtLink>
        </div>
        <img src="/image/home/product.webp" alt="Industrial Background" class="object-cover h-120 w-120 display-none" />
      </div>
    </section>
    
    <!-- 我们的优势 -->
    <div class="p-4 max-w-7xl mx-auto">
      <div class="flex flex-col text-center gap-4 my-8 max-w-2xl mx-auto">
        <h2 class="text-5xl font-bold text-green-800">
          Trusted by Leading Manufacturers Across Asia
        </h2>
        <p class="text-gray-400">
          Explore our main product lines and their applications.
        </p>
      </div>
      <div class="flex-wrap grid lg:grid-cols-2 sm:grid-cols-1 gap-6 text-center">
        <div v-for="advantage in ourAdvantages" :key="advantage.title" class="flex flex-col gap-3 items-center">
          <img :src="advantage.icon" :alt="advantage.title" class="object-cover w-16 h-16" />
          <h3 class="text-3xl text-green-800">{{ advantage.title }}</h3>
          <p class="text-gray-400">{{ advantage.description }}</p>
        </div>
      </div>
      <NuxtLink to="/about-us" class="text-yellow-500 hover:text-yellow-600 py-8 block text-center">About Us >
      </NuxtLink>
    </div>

    <!-- 行业应用 -->
    <div class="p-4 mx-auto text-center">
      <!-- 标题 -->
      <div class="flex flex-col gap-4 my-8 max-w-2xl mx-auto">
        <h2 class="text-5xl font-bold text-green-800">
          Find Your Perfect Release Agent by Application
        </h2>
        <p class="text-gray-400">
          Discover our comprehensive range of release agents tailored to your
          specific needs.
        </p>
      </div>
      <!-- 行业应用 -->
      <div class="grid sm:grid-cols-1 lg:grid-cols-3 gap-12">
        <div v-for="category in productCategories" :key="category.title"
          class="p-4 flex flex-col gap-3 items-center bg-gradient-to-b from-green-100/0 via-green-700/80 to-green-800/100">
          <img :src="category.icon" :alt="category.title" class="object-cover" />
          <h3 class="text-2xl text-yellow-500">{{ category.title }}</h3>
          <p class="text-white text-sm flex-1">{{ category.description }}</p>
          <NuxtLink to="/product"
            class="bg-white text-green-800 w-full py-3 font-bold hover:bg-yellow-500 hover:text-white transition-all duration-300">
            View Products</NuxtLink>
        </div>
      </div>
      <NuxtLink to="/product" class="text-yellow-500 hover:text-yellow-600 py-4 block">More Applications ></NuxtLink>
    </div>

    <!-- 科学创新 -->
    <div class="mx-auto">
      <div class="flex flex-col gap-4 my-8 max-w-2xl mx-auto text-center">
        <h2 class="text-5xl font-bold text-green-800">
          Driven by Innovation, Committed to Your Success
        </h2>
        <!-- <p class="text-gray-400">
        Our commitment to innovation ensures that we stay at the forefront of
        industry trends, delivering cutting-edge solutions that meet your
        evolving needs.
      </p> -->
      </div>
      <div class="grid sm:grid-cols-1 lg:grid-cols-2">
        <div class="bg-green-800 text-white flex justify-end pt-2">
          <div class="max-w-160 p-8 pb-0 flex flex-col">
            <h3 class="text-2xl font-bold mb-4">Advanced Technology</h3>
            <ul class="list-disc list-inside flex flex-col gap-3 flex-1">
              <li>
                <text class="font-bold">Next-Generation Formulations:</text> Our
                R&D is dedicated to creating industry-leading release
                technologies.
              </li>
              <li>
                <text class="font-bold">Sustainable Solutions:</text> We engineer
                advanced water-based formulas that meet strict global
                environmental standards.
              </li>
              <li>
                <text class="font-bold">Maximum Efficiency:</text> Our
                semipermanent systems deliver hundreds of release cycles from a
                single application, dramatically reducing your downtime.
              </li>
            </ul>
            <img src="/image/home/innovation_01.webp" alt="Advanced Technology" class="object-cover mt-4" />
          </div>
        </div>
        <div class="bg-yellow-500 text-green-800 flex justify-start pt-2">
          <div class="max-w-160 p-8 pb-0 flex flex-col">
            <h3 class="text-2xl font-bold text-green-800 mb-4">
              Our Partner in Process Optimization
            </h3>
            <ul class="list-disc list-inside flex flex-col gap-3 flex-1">
              <li>
                <text class="font-bold">More Than a Supplier:</text> We don&apos;t
                just sell products; we deliver complete manufacturing solutions.
              </li>
              <li>
                <text class="font-bold">Deep Process Understanding:</text> Our
                technical experts work with you on your factory floor to solve
                your toughest challenges.
              </li>
              <li>
                <text class="font-bold">Customized for You:</text> We tailor our
                chemistry to lower your costs, improve your yield rates, and
                elevate your product quality.
              </li>
            </ul>
            <img src="/image/home/innovation_02.webp" alt="Advanced Technology" class="object-cover mt-4" />
          </div>
        </div>
      </div>
    </div>

    <!-- 教学文章 -->
    <div class="p-10">
      <ArticleList 
        :articles="articles?.data && articles.data.length > 0 ? articles.data : defaultArticles.data"
        title="Learning Hub"
        subtitle="Stay updated with the latest industry insights and best practices."
        variant="compact"
        :max-count="3"
        :show-more-link="true"
        more-link-url="/blog"
        more-link-text="More Articles >"
      />
    </div>
    <div class="h-0.5 bg-gray-200"></div>
    <!-- CTA Section -->
  </div>
</template>

<script setup>
// Meta and SEO
useHead({
  title: 'Yunzhu Industry - Leading Industrial Cleaning Solutions',
  meta: [
    {
      name: 'description',
      content:
        'Professional manufacturer of high-quality cleaning products and release agents, providing innovative solutions for global industries.',
    },
    {
      name: 'keywords',
      content:
        'industrial cleaning, release agent, automotive cleaning, construction chemicals, manufacturing solutions',
    },
    {
      property: 'og:title',
      content: 'Yunzhu Industry - Leading Industrial Cleaning Solutions',
    },
    {
      property: 'og:description',
      content:
        'Professional manufacturer of high-quality cleaning products and release agents, providing innovative solutions for global industries.',
    },
    { property: 'og:type', content: 'website' },
  ],
})

// 我们的优势
const ourAdvantages = [
  {
    title: 'Increased Productivity',
    description: 'Multiple releases per application, reducing downtime.',
    icon: '/image/home/about_icon_01.webp',
  },
  {
    title: 'Superior Surface Finish',
    description:
      'Achieve flawless high-gloss or matte surfaces with zero transfer.',
    icon: '/image/home/about_icon_02.webp',
  },
  {
    title: 'Sustainable Formulations',
    description:
      'Environmentally friendly, reducing waste and energy consumption.',
    icon: '/image/home/about_icon_03.webp',
  },
  {
    title: 'Expert Technical Support',
    description: 'Custom solutions for your specific application.',
    icon: '/image/home/about_icon_04.webp',
  },
]

// 产品分类
const productCategories = [
  {
    title: 'Polyurethane (PU) Molding',
    description:
      'For footwear, furniture, and automotive interiors. Achieve perfect gloss and paintable surfaces.',
    icon: '/image/product/cate_01.webp',
  },
  {
    title: 'Rubber Molding',
    description:
      'For automotive components, footwear, and industrial applications. Ensure smooth demolding and high-quality surfaces.',
    icon: '/image/product/cate_02.webp',
  },
  {
    title: 'Silicone Molding',
    description:
      'For electronics, medical devices, and aerospace applications. Achieve high-precision and low-shrinkage parts.',
    icon: '/image/product/cate_03.webp',
  },
  {
    title: 'Carbon Fiber Molding',
    description:
      'For automotive components, aerospace, and industrial applications. Achieve high-strength and lightweight parts.',
    icon: '/image/product/cate_04.webp',
  },
  {
    title: 'Concrete Molding',
    description:
      'For construction, infrastructure, and industrial applications. Achieve high-strength and durable parts.',
    icon: '/image/product/cate_05.webp',
  },
  {
    title: 'Other Applications',
    description:
      'For a wide range of industries, including construction, aerospace, and medical devices. Achieve high-strength and durable parts.',
    icon: '/image/product/cate_06.webp',
  },
]

// 图片加载状态
const imageLoaded = ref(false)

// 激活聊天
const activateLiveChat = () => {
  console.log('Activate live chat...')
}

// 图片加载失败
const handleImageError = event => {
  // Fallback for broken images
  event.target.src =
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop'
}

// 使用Strapi composable
const { getCateProducts, getBlogs } = useStrapi()

//加载分类
const { data: cateProduct } = await useAsyncData('cateProduct', () =>
  getCateProducts()
)
console.log('cateProduct:', cateProduct.value)

// 获取教学文章
const { data: articles } = await useAsyncData('articles', () =>
  getBlogs(3, 1)
)
console.log('articles:', articles.value)

// 临时处理：如果articles为空，提供默认数据
const defaultArticles = {
  data: [
    {
      id: 1,
      attributes: {
        title: 'Understanding Release Agents',
        summary:
          'Learn about the importance of release agents in manufacturing processes.',
        slug: 'understanding-release-agents',
        cover: '/image/articles/learn_01.webp',
      },
    },
    {
      id: 2,
      attributes: {
        title: 'Best Practices for PU Molding',
        summary:
          'Discover the best practices for polyurethane molding applications.',
        slug: 'best-practices-pu-molding',
        cover: '/image/articles/learn_02.webp',
      },
    },
    {
      id: 3,
      attributes: {
        title: 'Quality Control in Manufacturing',
        summary:
          'Essential quality control measures for industrial applications.',
        slug: 'quality-control-manufacturing',
        cover: '/image/articles/learn_01.webp',
      },
    },
  ],
}
</script>

<style scoped>
.display-none {
  display: none;
}

@media (min-width: 1024px) {
  .display-none {
    display: block;
  }
}
</style>
