<script setup lang="ts">
import { useAuth } from '../../composables/useAuth'

const { signUp } = useAuth()

const form = ref({
  name: '',
  username: '',
  password: '',
  confirmPassword: '',
})

const error = ref('')

async function handleSubmit() {
  try {
    if (form.value.password !== form.value.confirmPassword) {
      error.value = 'As senhas não coincidem'
      return
    }

    await signUp({
      name: form.value.name,
      username: form.value.username,
      password: form.value.password,
    })
  }
  catch (err: any) {
    error.value = err?.message || 'Erro ao realizar cadastro'
  }
}
</script>

<template>
  <UCard class="m-auto w-full max-w-md">
    <template #header>
      <h2 class="text-center text-3xl font-extrabold ">
        Criar conta
      </h2>
    </template>
    <template #default>
      <form class="w-2/3 mx-auto" @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-2">
          <UFormField label="Nome">
            <UInput
              v-model="form.name"
              type="text"
              required
              placeholder="Seu nome completo"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Usuário">
            <UInput
              v-model="form.username"
              type="text"
              required
              placeholder="Seu nome de usuário"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Senha">
            <UInput
              v-model="form.password"
              type="password"
              required
              placeholder="Sua senha"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Confirmar Senha">
            <UInput
              v-model="form.confirmPassword"
              type="password"
              required
              placeholder="Confirme sua senha"
              class="w-full"
            />
          </UFormField>
        </div>

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          :title="error"
          class="mt-4"
        />

        <div class="mt-4">
          <UButton
            type="submit"
            color="primary"
            block
          >
            Cadastrar
          </UButton>
        </div>
      </form>

      <div class="text-center text-sm">
        <NuxtLink
          to="/auth/signin"
          class="hover:text-primary-600 hover:[&_span]:text-primary-600 hover:[&_span]:hover:underline hover:underline"
        >
          Já possui conta? <span class="text-primary-400">Entrar</span>
        </NuxtLink>
      </div>
    </template>
  </UCard>
</template>
