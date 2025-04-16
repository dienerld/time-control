<script lang="ts" setup>
import TimeEntryNew from '~/modules/time-entries/screens/new.vue'

definePageMeta({
  layout: 'with-sidebar',
  middleware: 'auth',
})
</script>

<template>
  <div>
    <TimeEntryNew />
  </div>
</template>

<style>

</style>
