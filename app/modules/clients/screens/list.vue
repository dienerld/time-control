<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Client } from '~~/shared/entities/client'
import { LazyDialogConfirmation } from '#components'
import { useDeleteClient } from '../composables/useDeleteClient'

function formatCnpj(cnpj: string) {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

const { clientsService } = useServices()

const { data: clients, status } = useAsyncData('clients', () => clientsService.getClients())
const { deleteClient, loading: deleteLoading } = useDeleteClient()

const loading = computed(() => status.value === 'pending')
const UButton = resolveComponent('UButton')
const overlay = useOverlay()

function handleEdit(client: Client) {
  console.log(client)
}

const columns: TableColumn<Client>[] = [
  { accessorKey: 'name', header: 'Nome' },
  { header: 'CNPJ', accessorFn: row => row.cnpj ? formatCnpj(row.cnpj) : '' },
  {
    header: () => h('div', { class: 'text-right' }, 'Ações'),
    id: 'id',
    accessorKey: 'id',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        [
          h(UButton, {
            color: 'primary',
            variant: 'ghost',
            icon: 'i-heroicons-pencil',
            label: 'Editar',
            ui: {
              label: 'hidden md:block',
            },
            onClick: () => handleEdit(row.original),
          }),
          h(UButton, {
            color: 'error',
            variant: 'ghost',
            icon: 'i-heroicons-trash',
            label: 'Deletar',
            ui: {
              label: 'hidden md:block',
            },
            onClick: () => handleDelete({ id: row.getValue('id'), name: row.getValue('name') }),
          }),
        ],
      )
    },
  },
]

const modal = overlay.create(LazyDialogConfirmation, {
  props: {
    title: 'Deletar Cliente',
    description: 'Tem certeza que deseja deletar o cliente?',
    confirmText: 'Deletar',
    confirmColor: 'error',
    cancelText: 'Cancelar',
    cancelColor: 'primary',
    loading: deleteLoading.value,
  },
})

function handleDelete(client: Pick<Client, 'id' | 'name'>) {
  modal.open({
    description: `Tem certeza que deseja deletar o cliente '${client.name.toUpperCase()}'?`,
    onConfirm: async () => {
      await deleteClient(client.id)
      clients.value = clients.value?.filter(c => c.id !== client.id)
      modal.close()
    },
    onCancel: () => modal.close(),
  })
}

watch(deleteLoading, (value) => {
  if (value) {
    modal.patch({
      confirmText: 'Deletando...',
    })
  }
  else {
    modal.patch({
      confirmText: 'Deletar',
    })
  }
})
</script>

<template>
  <MainContent>
    <div class="flex justify-between mb-8 items-center">
      <div>
        <h1 class="text-2xl font-bold">
          Clientes
        </h1>
        <p class="mt-1 text-sm">
          Gerencie seus clientes e suas informações
        </p>
      </div>

      <UButton
        color="primary"
        to="/clients/new"
        icon="heroicons:plus"
        class="flex items-center gap-2"
        :ui="{
          label: 'hidden md:block',
        }"
        label="Novo Cliente"
      />
    </div>

    <UCard>
      <UTable
        :columns="columns"
        :data="clients"
        :loading="loading"
        empty="Nenhum cliente encontrado"
        class="w-full"
      >
        <template #loading>
          <div class="grid grid-cols-4 gap-4 p-4">
            <template v-for="i in 4" :key="i">
              <USkeleton class="h-6 w-full" />
              <USkeleton class="h-6 w-full" />
              <USkeleton class="h-6 w-full" />
              <div class="flex gap-2">
                <USkeleton class="h-8 w-full" />
                <USkeleton class="h-8 w-full" />
              </div>
            </template>
          </div>
        </template>
      </UTable>
    </UCard>
  </MainContent>
</template>
