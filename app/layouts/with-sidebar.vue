<script lang="ts" setup>

</script>

<template>
  <UContainer>
    <div class="grid grid-cols-10">
      <AsideBar class="col-span-2" />
      <div class="col-span-8 ml-2 border border-red-500">
        <slot />
      </div>
    </div>
  </UContainer>
</template>

<style>

</style>
