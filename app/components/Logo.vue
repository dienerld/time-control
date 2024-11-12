<script setup lang="ts">
</script>

<template>
  <ClientOnly :placeholder="true">
    <template #placeholder>
      <ILogoNorwayColored class="w-24 text-inherit" :font-controlled="false" />
    </template>
    <ILogoNorway class="w-24 " :font-controlled="false" />
  </ClientOnly>
</template>
