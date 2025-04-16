<script setup lang="ts">
import TimeEntries from '~/modules/time-entries/screens/index.vue'

definePageMeta({
  layout: 'with-sidebar',
  middleware: 'auth',
})
</script>

<template>
  <TimeEntries />
</template>
