<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const { isSidebarOpen, toggleSidebar } = useSharedState()
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

watch(route, () => {
  isSidebarOpen.value = false
})
</script>

<template>
  <!-- Menu lateral para telas grandes -->
  <aside class="hidden md:flex h-full flex-col border-r border-neutral-700">
    <UNavigationMenu
      orientation="vertical"
      :items="navigationMenu"
      class="pr-2 flex-1 mt-2"
    />

    <UDropdownMenu
      arrow
      :items="userMenuItems"
      :ui="{
        content: 'min-w-60',
      }"
      class="py-4"
    >
      <UButton
        label="Open"
        icon="lucide:user"
        color="neutral"
        variant="ghost"
      />
    </UDropdownMenu>
  </aside>

  <USlideover
    v-model:open="isSidebarOpen"
    side="left"
  >
    <template #content>
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between p-4 border-b border-neutral-700">
          <Logo />
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-x"
            @click="toggleSidebar"
          />
        </div>

        <UNavigationMenu
          orientation="vertical"
          :items="navigationMenu"
          class="pr-2 flex-1 mt-8"

          >
      </UNavigationMenu>

        <UDropdownMenu
          arrow
          :items="userMenuItems"
          :ui="{
            content: 'min-w-60',
          }"
          class="py-4"
        >
          <UButton
            label="Open"
            icon="lucide:user"
            color="neutral"
            variant="ghost"
          />
        </UDropdownMenu>
      </div>
    </template>
  </USlideover>
</template>
