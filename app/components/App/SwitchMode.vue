<script setup>
const color = useColorMode()
function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <UButton
      aria-label="button to switch theme dark to light"
      variant="link"
      color="primary"
      size="lg"
      :icon="
        color.preference === 'dark'
          ? 'i-heroicons-sun-solid'
          : 'i-heroicons-moon-solid'
      "
      @click="toggleDark"
    />
  </ClientOnly>
</template>
