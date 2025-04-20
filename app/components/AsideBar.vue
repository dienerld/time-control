<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const { isSidebarOpen, toggleSidebar } = useSharedState()
const { logout } = useSession()

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
      label: 'Clientes',
      icon: 'lucide:building',
      children: [
        {
          label: 'Listagem',
          icon: 'lucide:list',
          description: 'Liste todas as empresas.',
          to: '/clients',
        },
        {
          label: 'Novo',
          icon: 'lucide:plus',
          description: 'Crie uma nova empresa.',
          to: '/clients/new',
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
    type: 'separator',
  },
  {
    label: 'Logout',
    icon: 'i-lucide-log-out',
    onSelect: () => {
      logout()
    },
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
        />
        <div class="flex justify-between items-center p-2 border-t border-neutral-300">
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
          <AppSwitchMode />
        </div>
      </div>
    </template>
  </USlideover>
</template>
