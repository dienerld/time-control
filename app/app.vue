<script setup lang="ts">
import { pt_br } from '@nuxt/ui/locale'

useHead({
  htmlAttrs: {
    lang: 'pt-BR',
    dir: 'ltr',
  },
})
</script>

<template>
  <NuxtLayout>
    <UApp
      :toaster="{ position: 'top-center', duration: 3000 }"
      :locale="pt_br"
      :tooltip="{
        delayDuration: 100,
      }"
    >
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
