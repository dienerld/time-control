<script setup lang="ts">
import Signup from '~/modules/auth/screens/signup/index.vue'

definePageMeta({
  layout: 'empty',
})

const { loggedIn } = useSession()

onBeforeMount(async () => {
  if (loggedIn.value) {
    navigateTo('/time-entries')
  }
})
</script>

<template>
  <Signup />
</template>
