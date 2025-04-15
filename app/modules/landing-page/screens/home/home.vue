<script setup lang="ts">
const toast = useToast()

defineShortcuts({
  a: () => toast.add({ title: 'Hello', description: 'World' }),
})
</script>

<template>
  <HeaderSaas />
  <HeroMain />
</template>
