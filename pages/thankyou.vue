<template>
  <div class="min-h-[50vh] flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white py-16 px-4">
    <div class="flex flex-col items-center gap-6 max-w-lg w-full">
      <div class="bg-green-100 rounded-full p-6 mb-2">
        <svg class="w-16 h-16 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2l4 -4" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none" />
        </svg>
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold text-green-700 text-center">Thank you for your message!</h1>
      <p class="text-gray-600 text-center text-lg">Your inquiry has been received. Our team will respond as soon as possible.<br />For urgent matters, please contact us directly via phone or WhatsApp.</p>
      <NuxtLink to="/" class="mt-6 inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-lg shadow transition-all duration-200">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>