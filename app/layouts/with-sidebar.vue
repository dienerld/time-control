<script lang="ts" setup>
const { toggleSidebar } = useSharedState()
const { loggedIn } = useSession()

watch(loggedIn, (value) => {
  if (!value) {
    navigateTo('/')
  }
})
</script>

<template>
  <UContainer class="min-h-screen flex flex-col px-0">
    <AppHeader @toggle-sidebar="toggleSidebar" />
    <div class="grid grid-cols-10 flex-1">
      <div class="col-span-2 hidden lg:block">
        <AsideBar />
      </div>
      <div class="col-span-10 lg:col-span-8 ml-2">
        <slot />
      </div>
    </div>
  </UContainer>
</template>

<style>

</style>
