<template>
  <div class="h-120 relative">
    <img
      src="/image/banner-project.webp"
      alt="product"
      class="w-full h-full object-cover"
    />
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
    >
      <h1 class="text-5xl font-bold">{{ categoryCurrent.name }}</h1>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const categoryCurrent = ref({
    name: 'Learn',
  })
</script>

<style scoped>
  .banner {
    background-image: url('../../public/image/banner-project.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 30vh;
  }
</style>
