<script setup lang="ts">
const items = ref([
  {
    label: 'Guide',
    icon: 'i-lucide-book-open',
  },
  {
    label: 'Sobre',
  },
  {
    label: 'Help',
    icon: 'i-lucide-circle-help',
    disabled: true,
  },
])
</script>

<template>
  <div class="w-full min-h-14 shadow shadow-neutral-600 rounded flex items-center justify-between px-4">
    <p>Diener Dornelas</p>

    <div class="flex items-center gap-2 ">
      <UNavigationMenu :items="items" class="justify-end" />
      <ThemeSwitch />
    </div>
  </div>
</template>
