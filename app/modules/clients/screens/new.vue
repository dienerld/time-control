<script lang="ts" setup>
import { useCreateClient } from '~/modules/clients/composables/useCreateClient'

const { client, createClientSchema, createClient, loading, errors } = useCreateClient()

function handleSubmit() {
  createClient()
}
</script>

<template>
  <MainContent>
    <div class="mb-8">
      <h1 class="text-2xl font-bold">
        Novo Cliente
      </h1>
      <p class="mt-1 text-sm">
        Preencha os dados do novo cliente
      </p>
    </div>

    <UCard>
      <UForm
        :schema="createClientSchema"
        :state="client"
        @submit.prevent="handleSubmit"
      >
        <!-- Informações Básicas -->
        <div class="mb-8">
          <h2 class="text-lg font-medium mb-4">
            Informações Básicas
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField name="name" label="Nome" required :error="errors?.name">
              <UInput v-model="client.name" class="w-full" required placeholder="Nome do cliente" />
            </UFormField>
            <UFormField name="cnpj" label="CNPJ" :error="errors?.cnpj">
              <UInput
                v-model="client.cnpj"
                v-maska="'##.###.###/####-##'"
                type="text"
                class="w-full"
                placeholder="00.000.000/0000-00"
              />
            </UFormField>
          </div>
        </div>

        <!-- Informações de Contato -->
        <div class="mb-8 border-t pt-2 border-neutral-400">
          <h2 class="text-lg font-medium mb-4">
            Informações de Contato
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField name="contactName" label="Nome do Contato" :error="errors?.contactName">
              <UInput v-model="client.contactName" class="w-full" placeholder="Nome da pessoa de contato" />
            </UFormField>
            <UFormField name="email" label="Email" :error="errors?.email">
              <UInput v-model="client.email" class="w-full" placeholder="Email de contato" type="email" />
            </UFormField>
            <UFormField name="phone" label="Telefone" :error="errors?.phone">
              <UInput v-model="client.phone" class="w-full" placeholder="Telefone de contato" />
            </UFormField>
            <UFormField name="address" label="Endereço" :error="errors?.address">
              <UInput v-model="client.address" class="w-full" placeholder="Endereço completo" />
            </UFormField>
          </div>
        </div>

        <!-- Informações Adicionais -->
        <div class="mb-8 border-t pt-2 border-neutral-400">
          <h2 class="text-lg font-medium mb-4">
            Informações Adicionais
          </h2>
          <div class="grid grid-cols-1 gap-6">
            <UFormField name="description" label="Descrição" :error="errors?.description">
              <UTextarea
                v-model="client.description"
                class="w-full"
                placeholder="Descrição ou observações sobre o cliente"
                :rows="4"
              />
            </UFormField>
          </div>
        </div>

        <div class="flex justify-end pt-6 border-t border-neutral-400">
          <div class="flex gap-4">
            <UButton
              to="/clients"
              color="neutral"
              variant="soft"
            >
              Cancelar
            </UButton>
            <UButton
              type="submit"
              color="primary"
              :loading="loading"
              :disabled="loading"
            >
              Salvar Cliente
            </UButton>
          </div>
        </div>
      </UForm>
    </UCard>
  </MainContent>
</template>

<style>

</style>
