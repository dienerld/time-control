<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <UContainer>
    <slot />
  </UContainer>
</template>
