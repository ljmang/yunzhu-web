import { ref, computed } from 'vue'
import { api } from '~/utils/api'

export const useApi = () => {
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  // 清除错误
  const clearError = () => {
    error.value = null
  }

  // 通用数据获取函数
  const fetchData = async (apiFunction, params = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await apiFunction(params)
      data.value = result
      return result
    } catch (err) {
      error.value = err.message || '获取数据失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 获取关于我们数据
  const getAboutUs = async () => {
    return await fetchData(api.getAboutUs)
  }

  // 获取产品数据
  const getProducts = async (params = {}) => {
    return await fetchData(() => api.getProducts(params), params)
  }

  // 获取产品分类
  const getProductCategories = async () => {
    return await fetchData(api.getProductCategories)
  }

  // 获取文章数据
  const getArticles = async (params = {}) => {
    return await fetchData(() => api.getArticles(params), params)
  }

  // 获取联系我们信息
  const getContactInfo = async () => {
    return await fetchData(api.getContactInfo)
  }

  // 获取公司信息
  const getCompanyInfo = async () => {
    return await fetchData(api.getCompanyInfo)
  }

  // 获取证书数据
  const getCertificates = async () => {
    return await fetchData(api.getCertificates)
  }

  // 获取合作伙伴数据
  const getPartners = async () => {
    return await fetchData(api.getPartners)
  }

  // 获取生产基地数据
  const getProductionBases = async () => {
    return await fetchData(api.getProductionBases)
  }

  return {
    // 状态
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    data: computed(() => data.value),
    
    // 方法
    clearError,
    fetchData,
    getAboutUs,
    getProducts,
    getProductCategories,
    getArticles,
    getContactInfo,
    getCompanyInfo,
    getCertificates,
    getPartners,
    getProductionBases
  }
} 