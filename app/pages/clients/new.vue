<script lang="ts" setup>
import ClientNewScreen from '~/modules/clients/screens/new.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'with-sidebar',
})

useSeoMeta({
  title: 'Novo Cliente',
  description: 'Novo Cliente',
})

useHead({
  title: 'Novo Cliente',
})
</script>

<template>
  <ClientNewScreen />
</template>

<style>

</style>
