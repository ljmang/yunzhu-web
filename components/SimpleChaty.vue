<template>
  <div>
    <!-- Chaty脚本将在这里加载 -->
  </div>
</template>

<script setup>
// 只在客户端执行
onMounted(() => {
  // 检查是否已经加载
  if (document.getElementById('chaty-script')) {
    console.log('Chaty脚本已存在')
    return
  }

  // 创建script标签
  const script = document.createElement('script')
  script.id = 'chaty-script'
  script.async = true
  script.src = 'https://cdn.chaty.app/pixel.js?id=2A8HZRee'
  
  // 添加到页面
  document.head.appendChild(script)
  
  console.log('Chaty脚本已加载')
})
</script> 