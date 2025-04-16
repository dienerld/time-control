<script setup lang="ts">
const emit = defineEmits<{
  (e: 'toggleSidebar'): void
}>()
</script>

<template>
  <header
    class="flex w-full items-center justify-between px-4 bg-neutral-300/50 dark:bg-neutral-950/70 backdrop-blur-md py-4"
  >
    <NuxtLink to="/">
      <Logo />
    </NuxtLink>
    <nav class="hidden w-full flex-1 items-center justify-center gap-2 lg:flex" />
    <div class="flex flex-1 items-center justify-end gap-4 lg:flex-none">
      <UButton
        to="https://github.com/cesswhite/landingnuxt" target="_blank" icon="lucide:github" variant="link"
        color="primary" size="lg"
      />
      <AppSwitchPrimaryColor />
      <AppSwitchMode />
      <div class="inline-block lg:hidden">
        <UButton
          icon="i-heroicons-bars-3"
          variant="link"
          color="primary"
          size="lg"
          @click="emit('toggleSidebar')"
        />
      </div>
    </div>
  </header>
</template>
