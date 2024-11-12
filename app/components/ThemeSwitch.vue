<template>
  <ColorScheme>
    <USelect v-model="$colorMode.preference" :items="['system', 'light', 'dark']" />
  </ColorScheme>
</template>
