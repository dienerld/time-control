<script setup lang="ts">
import Header from '~/modules/landing-page/components/header/header.vue'

const name = ref('Nuxt UI Starter')
const toast = useToast()

defineShortcuts({
  meta_k: () => { name.value = 'Diener' },
  a: () => toast.add({ title: 'Hello', description: 'World' }),
})
</script>

<template>
  <Header />
  <UCard class="mt-10">
    <template #header>
      <div class="flex justify-between">
        <h1>Welcome to Nuxt UI Starter</h1>
      </div>
    </template>

    <UButton icon="i-heroicons-book-open" to="https://ui.nuxt.com" target="_blank">
      Open Nuxt UI Documentation
    </UButton>
    <h1>{{ name }}</h1>
  </UCard>
</template>
