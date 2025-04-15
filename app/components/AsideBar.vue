<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'

const navigationMenu = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Início',
      icon: 'i-lucide-home',
      to: '/time-entries',
    },
    {
      label: 'Novo Registro',
      icon: 'i-lucide-plus',
      to: '/time-entries/new',
    },
    {
      label: 'Composables',
      icon: 'i-lucide-database',
      children: [
        {
          label: 'defineShortcuts',
          icon: 'i-lucide-file-text',
          description: 'Define shortcuts for your application.',
          to: '/composables/define-shortcuts',
        },
        {
          label: 'useOverlay',
          icon: 'i-lucide-file-text',
          description: 'Display a modal/slideover within your application.',
          to: '/composables/use-overlay',
        },
        {
          label: 'useToast',
          icon: 'i-lucide-file-text',
          description: 'Display a toast within your application.',
          to: '/composables/use-toast',
        },
      ],
    },
  ],
])

const userMenuItems = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user',
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
  },
  {
    label: 'Settings',
    icon: 'i-lucide-cog',
  },
])
</script>

<template>
  <aside class="h-screen flex flex-col border-r border-neutral-700">
    <div class="flex items-center">
      <UButton
        variant="ghost"
        color="neutral"
        class="w-full justify-start"
        to="/"
      >
        <Logo />
      </UButton>
    </div>

    <!-- Menu Principal -->
    <UNavigationMenu orientation="vertical" :items="navigationMenu" class="pr-2 flex-1 mt-8" />

    <!-- Dropdown de usuário -->
    <UDropdownMenu
      arrow
      :items="userMenuItems"
      :ui="{
        content: 'min-w-60',
      }"
      class="py-4"
    >
      <UButton label="Open" icon="lucide:user" color="neutral" variant="ghost" />
    </UDropdownMenu>
  </aside>
</template>

<style scoped>
.u-vertical-navigation {
  --un-bg-opacity: 0;
}

.u-vertical-navigation :deep(.router-link-active) {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
