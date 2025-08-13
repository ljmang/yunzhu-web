export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)

    // 验证必填字段
    const {name, email, whatsapp, purpose, message} = body

    if (!name || !email || !whatsapp || !purpose || !message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      })
    }

    // 获取客户端 IP
    let clientIP = 'unknown'
    try {
      const ipResponse = await $fetch('https://api.ipify.org?format=json')
      clientIP = ipResponse.ip
    } catch (ipError) {
      console.error('Failed to get IP:', ipError)
      // 备用方案
      try {
        const fallbackResponse = await $fetch('https://httpbin.org/ip')
        clientIP = fallbackResponse.origin || 'unknown'
      } catch (fallbackError) {
        console.error('Fallback IP service also failed:', fallbackError)
      }
    }

    // 准备 Strapi 数据
    const strapiData = {
      data: {
        name,
        email,
        whatsapp,
        purpose,
        information: message,
        ip: clientIP
      }
    }

    // 尝试提交到 Strapi
    try {
      const config = useRuntimeConfig()
      const STRAPI_BASE_URL = config.public.apiBaseUrl

      const strapiResponse = await $fetch(`${STRAPI_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: strapiData,
        timeout: 10000
      })

      console.log('Strapi submission successful:', strapiResponse)
      return {success: true, method: 'strapi', data: strapiResponse}
    } catch (strapiError) {
      console.error('Strapi submission failed:', strapiError)

      // 备用方案：使用 FormSubmit
      try {
        const formSubmitData = new URLSearchParams()
        formSubmitData.append('name', name)
        formSubmitData.append('email', email)
        formSubmitData.append('whatsapp', whatsapp)
        formSubmitData.append('purpose', purpose)
        formSubmitData.append('message', message)
        formSubmitData.append('_subject', 'New Contact Form Submission - Yunzhu')
        formSubmitData.append('_captcha', 'false')

        const formSubmitResponse = await $fetch('https://formsubmit.co/mingplus0815@163.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formSubmitData.toString(),
          timeout: 10000
        })

        console.log('FormSubmit submission successful:', formSubmitResponse)
        return {success: true, method: 'formsubmit', data: formSubmitResponse}
      } catch (formSubmitError) {
        console.error('FormSubmit submission failed:', formSubmitError)
        throw createError({
          statusCode: 500,
          statusMessage: 'All form submission methods failed'
        })
      }
    }
  } catch (error) {
    console.error('Contact form submission error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal server error'
    })
  }
})
