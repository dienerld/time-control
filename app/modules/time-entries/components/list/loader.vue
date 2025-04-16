<script lang="ts" setup>
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading">
    <p>Loading...</p>
  </div>
  <slot v-else />
</template>

<style>

</style>
