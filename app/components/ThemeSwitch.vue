<template>
  <ColorScheme>
    <UButton
      variant="ghost"
      size="sm"
      @click="$colorMode.preference = ($colorMode.preference === 'dark' ? 'light' : 'dark')"
    >
      <Icon v-if="$colorMode.preference === 'dark'" name="lucide:moon" class="size-6 text-primary-500" />
      <Icon v-else name="lucide:sun" class="size-6 text-primary-500" />
    </UButton>
  </ColorScheme>
</template>
