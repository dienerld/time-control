<script setup lang="ts">
import Clients from '~/modules/clients/screens/list.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'with-sidebar',
})

useSeoMeta({
  title: 'Clientes',
  description: 'Listagem de clientes',
})

useHead({
  title: 'Clientes',
})
</script>

<template>
  <Clients />
</template>
