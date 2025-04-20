<script setup lang="ts">
import TimeEntries from '~/modules/time-entries/screens/list.vue'

definePageMeta({
  layout: 'with-sidebar',
  middleware: 'auth',
})

useHead({
  title: 'Registros de Ponto',
})

useSeoMeta({
  title: 'Registros de Ponto',
  description: 'Registros de Ponto',
})
</script>

<template>
  <TimeEntries />
</template>
