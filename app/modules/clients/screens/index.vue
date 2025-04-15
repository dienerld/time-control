<script setup lang="ts">
import type { Client, ClientWithTimeEntries, NewClient } from '~/server/database/types'
import { useClients } from '../composables/useClients'

const { createClient, getClients, deleteClient } = useClients()

const clients = ref<Client[]>([])
const loading = ref(false)
const showForm = ref(false)

const form = ref<NewClient>({
  name: '',
  description: '',
})

async function loadClients() {
  const result = await getClients()
  clients.value = result
}

async function handleSubmit() {
  loading.value = true
  try {
    await createClient(form.value)
    await loadClients()
    form.value = {
      name: '',
      description: '',
    }
    showForm.value = false
  }
  catch (error) {
    console.error('Erro ao criar cliente:', error)
  }
  finally {
    loading.value = false
  }
}

async function handleDelete(id: string) {
  if (!confirm('Tem certeza que deseja excluir este cliente?'))
    return

  try {
    await deleteClient(id)
    await loadClients()
  }
  catch (error) {
    console.error('Erro ao excluir cliente:', error)
  }
}

onMounted(async () => {
  await loadClients()
})
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">
        Clientes
      </h1>

      <UButton
        color="primary"
        @click="showForm = true"
      >
        Novo Cliente
      </UButton>
    </div>

    <UModal v-model="showForm">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">
            Novo Cliente
          </h3>
        </template>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <UFormGroup label="Nome">
            <UInput
              v-model="form.name"
              placeholder="Nome do cliente"
            />
          </UFormGroup>

          <UFormGroup label="Descrição">
            <UTextarea
              v-model="form.description"
              placeholder="Descrição do cliente"
            />
          </UFormGroup>

          <div class="flex justify-end space-x-2">
            <UButton
              color="gray"
              @click="showForm = false"
            >
              Cancelar
            </UButton>

            <UButton
              type="submit"
              :loading="loading"
              color="primary"
            >
              Salvar
            </UButton>
          </div>
        </form>
      </UCard>
    </UModal>

    <UTable
      :columns="[
        { key: 'name', label: 'Nome' },
        { key: 'description', label: 'Descrição' },
        { key: 'actions', label: 'Ações' },
      ]"
      :rows="clients"
    >
      <template #actions-data="{ row }">
        <UButton
          color="red"
          variant="ghost"
          icon="i-heroicons-trash"
          @click="handleDelete(row.id)"
        />
      </template>
    </UTable>
  </div>
</template>
