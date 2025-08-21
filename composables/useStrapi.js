// Strapi API 配置
const STRAPI_BASE_URL = 'https://admin.gdyunzhu.com/api'
const STRAPI_MEDIA_URL = 'https://admin.gdyunzhu.com' 

export const useStrapi = () => {
  // 通用方法：从直接的图片数据中获取URL
  const getDirectImageUrl = (imageData, fallbackUrl = null) => {
    const imageUrl = imageData?.attributes?.url
    if (!imageUrl) {
      return fallbackUrl
    }
    return `${STRAPI_MEDIA_URL}${imageUrl}`
  }

  // 通用方法：获取单张图片URL
  const getStrapiImageUrl = (attributesData, fieldName = 'cover', fallbackUrl = null) => {
    const imageUrl = attributesData?.[fieldName]?.data?.attributes?.url
    if (!imageUrl) {
      return fallbackUrl
    }
    return `${STRAPI_MEDIA_URL}${imageUrl}`
  }

  // 通用方法：获取多张图片URL（数组形式）
  const getStrapiImagesUrl = (imageArray, fallbackUrl = null) => {
    if (!imageArray || !Array.isArray(imageArray)) {
      return fallbackUrl
    }
    
    // 返回图片URL数组
    return imageArray.map(item => {
      const imageUrl = item?.attributes?.url
      if (!imageUrl) {
        return fallbackUrl
      }
      return `${STRAPI_MEDIA_URL}${imageUrl}`
    }).filter(url => url !== fallbackUrl)
  }

  // 通用方法：获取单张图片URL（从数组中取第一个）
  const getStrapiImageFromArray = (imageArray, index = 0, fallbackUrl = null) => {
    if (!imageArray || !Array.isArray(imageArray) || !imageArray[index]) {
      return fallbackUrl
    }
    
    const imageUrl = imageArray[index]?.attributes?.url
    if (!imageUrl) {
      return fallbackUrl
    }
    
    return `${STRAPI_MEDIA_URL}${imageUrl}`
  }

  // 获取产品分类
  const getCateProducts = async () => {
    try {
      const response = await $fetch(`${STRAPI_BASE_URL}/cate-products?populate=*`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching cateProducts:', error)
      return []
    }
  }

  // 获取博客分类
  const getCateBlogs = async () => {
    try {
      const response = await $fetch(`${STRAPI_BASE_URL}/cate-blogs?populate=*`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching cateBlogs:', error)
      return []
    }
  }

  // 获取博客列表
  const getBlogs = async (pageSize = 10, page = 1, categorySlug = null, sort = 'createdAt:desc') => {
    try {
      let url = `${STRAPI_BASE_URL}/blogs?pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=*&sort=${sort}`

      if (categorySlug) {
        url += `&filters[cate_blog][slug][$eq]=${encodeURIComponent(categorySlug)}`
      }

      const response = await $fetch(url)
      return response
    } catch (error) {
      console.error('Error fetching blogs:', error)
      // 如果blogs内容类型不存在，返回空数据而不是抛出错误
      if (error.status === 404) {
        console.warn('Blogs content type not found in Strapi. Please create it in the admin panel.')
      }
      return {data: [], meta: {}}
    }
  }

  // 获取单个博客
  const getBlog = async slug => {
    try {
      const response = await $fetch(`${STRAPI_BASE_URL}/blogs?filters[slug][$eq]=${slug}&populate=*`)
      return response.data?.[0] || null
    } catch (error) {
      console.error('Error fetching blog:', error)
      return null
    }
  }

  // 获取产品列表
  const getProducts = async (pageSize = 10, page = 1, categorySlug = null, sort = 'createdAt:desc') => {
    try {
      let url = `${STRAPI_BASE_URL}/products?pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=*&sort=${sort}`

      if (categorySlug) {
        url += `&filters[cate_product][slug][$eq]=${encodeURIComponent(categorySlug)}`
      }

      const response = await $fetch(url)
      return response
    } catch (error) {
      console.error('Error fetching products:', error)
      return {data: [], meta: {}}
    }
  }

  // 获取单个产品
  const getProduct = async slug => {
    try {
      const response = await $fetch(`${STRAPI_BASE_URL}/products?filters[slug][$eq]=${slug}&populate=*`)
      return response.data?.[0] || null
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  }

  //提交表单
  const submitForm = async formData => {
    try {
      const response = await $fetch(`${STRAPI_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: formData
      })
      return response
    } catch (error) {
      console.error('Error submitting form:', error)

      // 如果是 400 错误，打印更详细的信息
      if (error.status === 400) {
        console.error('Bad Request - Check field names and data format:', error)
        console.error('Submitted data:', formData)
        // 尝试获取错误详情
        if (error.data) {
          console.error('Error details:', error.data)
        }
      }

      // 其他错误则返回 null
      return null
    }
  }

  //获取首页数据
  const getHome = async () => {
    try {
      const response = await $fetch(`${STRAPI_BASE_URL}/home?populate=*`)
      return response.data || null
    } catch (error) {
      console.error('Error fetching home:', error)
      return null
    }
  }

  // 获取关于我们
  const getAboutUs = async () => {
    try {
      const response = await $fetch(`${STRAPI_BASE_URL}/about-us?populate=*`)
      return response.data.attributes || null
    } catch (error) {
      console.error('Error fetching about us:', error)
      return null
    }
  }

  //服务流程
  const getServiceProcess = async () => {
    try {
      const response = await $fetch(`${STRAPI_BASE_URL}/service-process?populate=*`)
      return response.data.attributes || null
    }
    catch (error) {
      console.error('Error fetching service process:', error)
      return null
    }
  }

  // 获取解决方案列表
  const getSolutions = async () => {
    try {
      const response = await $fetch(`${STRAPI_BASE_URL}/solutions?populate=*`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching solutions:', error)
      return []
    }
  }

  // 获取解决方案
  const getSolution = async slug => {
    try {
      const response = await $fetch(`${STRAPI_BASE_URL}/solutions?filters[slug][$eq]=${slug}&populate=*`)
      return response.data?.[0] || null
    } catch (error) {
      console.error('Error fetching solution:', error)
      return null
    }
  }

  //获取faq分类
  const getFaqCategories = async () => {
    try {
      const response = await $fetch(`${STRAPI_BASE_URL}/cate-faqs?populate=*`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching faq categories:', error)
      return []
    }
  }

  //获取faq列表
  const getFaqs = async () => {
    try {
      const response = await $fetch(`${STRAPI_BASE_URL}/faqs?populate=*`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching faqs:', error)
      return []
    }
  }

  //获取视频列表
  const getVideos = async (pageSize = 10, page = 1, sort = 'createdAt:desc') => {
    try {
      const response = await $fetch(`${STRAPI_BASE_URL}/videos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=*&sort=${sort}`)
      return response
    } catch (error) {
      console.error('Error fetching videos:', error)
      return {data: [], meta: {pagination: {total: 0}}}
    }
  }

  return {
    getCateProducts,
    getCateBlogs,
    getBlogs,
    getBlog,
    getProducts,
    getProduct,
    getStrapiImageUrl,
    getStrapiImagesUrl,
    getStrapiImageFromArray,
    getDirectImageUrl,
    getAboutUs,
    getServiceProcess,
    getHome,
    getSolutions,
    getSolution,
    getFaqCategories,
    getFaqs,
    getVideos,
    submitForm
  }
}
