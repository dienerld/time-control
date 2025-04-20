<script lang="ts" setup>
import AuthSignin from '~/modules/auth/screens/signin/index.vue'

definePageMeta({
  layout: 'empty',
  middleware: 'not-auth',
})
</script>

<template>
  <AuthSignin />
</template>

<style>

</style>
