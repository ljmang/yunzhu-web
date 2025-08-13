// API 配置文件
export const getApiBaseUrl = () => {
  // 在客户端使用 useRuntimeConfig
  if (process.client) {
    const config = useRuntimeConfig()
    return config.public.apiBaseUrl
  }
  // 在服务器端使用环境变量
  return process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:1337/api'
}

// 通用请求函数
export const apiRequest = async (endpoint, options = {}) => {
  const API_BASE_URL = getApiBaseUrl()
  const url = `${API_BASE_URL}${endpoint}`

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, { ...defaultOptions, ...options })

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API 请求错误:', error)
    throw error
  }
}

// 获取数据（带分页）
export const fetchData = async (endpoint, params = {}) => {
  const queryParams = new URLSearchParams()

  // 添加分页参数
  if (params.page) queryParams.append('pagination[page]', params.page)
  if (params.pageSize)
    queryParams.append('pagination[pageSize]', params.pageSize)

  // 添加排序参数
  if (params.sort) queryParams.append('sort', params.sort)

  // 添加过滤参数
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      queryParams.append(`filters[${key}]`, value)
    })
  }

  // 添加字段选择
  if (params.fields) {
    params.fields.forEach(field => {
      queryParams.append('fields', field)
    })
  }

  // 添加关联数据（Strapi v4 推荐写法）
  if (params.populate) {
    if (typeof params.populate === 'string') {
      queryParams.append(`populate[${params.populate}]`, '*')
    } else if (Array.isArray(params.populate)) {
      params.populate.forEach(item => {
        queryParams.append(`populate[${item}]`, '*')
      })
    }
  }

  const queryString = queryParams.toString()
  const url = queryString ? `${endpoint}?${queryString}` : endpoint

  return await apiRequest(url)
}

// 获取单个数据
export const fetchSingle = async (endpoint, id, params = {}) => {
  const url = `${endpoint}/${id}`
  return await fetchData(url, params)
}

// 创建数据
export const createData = async (endpoint, data) => {
  return await apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify({ data }),
  })
}

// 更新数据
export const updateData = async (endpoint, id, data) => {
  return await apiRequest(`${endpoint}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ data }),
  })
}

// 删除数据
export const deleteData = async (endpoint, id) => {
  return await apiRequest(`${endpoint}/${id}`, {
    method: 'DELETE',
  })
}

// 上传文件
export const uploadFile = async file => {
  const formData = new FormData()
  formData.append('files', file)

  return await apiRequest('/upload', {
    method: 'POST',
    headers: {}, // 不设置 Content-Type，让浏览器自动设置
    body: formData,
  })
}

// 特定 API 函数
export const api = {
  // 关于我们页面数据
  getAboutUs: () =>
    fetchData('/about-us', {
      populate: ['image', 'seo'],
    }),

  // 产品数据
  getProducts: (params = {}) =>
    fetchData('/products', {
      // populate: ['cover', 'category', 'image'],
      ...params,
    }),

  // 产品分类
  getProductCategories: () => fetchData('/categories', {}),

  // 新闻/博客
  getArticles: (params = {}) =>
    fetchData('/articles', {
      populate: ['image', 'author'],
      ...params,
    }),

  getCertificates: (params = {}) =>
    fetchData('/certificates', {
      ...params,
    }),

  // 联系我们信息
  getContactInfo: () => fetchData('/contact-info'),
}

export default api
