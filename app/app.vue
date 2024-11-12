<template>
  <NuxtLayout>
    <UApp
      :toaster="{ position: 'top-center', duration: 3000 }"
      :locale="$i18n.locale"
    >
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
