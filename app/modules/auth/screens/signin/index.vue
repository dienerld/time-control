<script setup lang="ts">
import { useAuth } from '../../composables/useAuth'

const { signIn } = useAuth()

const form = ref({
  username: '',
  password: '',
})

const error = ref('')

async function handleSubmit() {
  try {
    await signIn({
      username: form.value.username,
      password: form.value.password,
    })
  }
  catch (err: any) {
    error.value = err?.message || 'Erro ao realizar login'
  }
}
</script>

<template>
  <UCard class="m-auto w-full max-w-md">
    <template #header>
      <h2 class="text-center text-3xl font-extrabold ">
        Entrar
      </h2>
    </template>
    <template #default>
      <form class="w-2/3 mx-auto" @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-2">
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
        </div>

        <UAlert
          v-if="error" color="error" variant="soft" :title="error" class="mt-4"
        />

        <div class="mt-4">
          <UButton type="submit" color="primary" block>
            Entrar
          </UButton>
        </div>
      </form>

      <div class="text-center text-sm">
        <NuxtLink
          to="/auth/signup"
          class="hover:text-primary-600 hover:[&_span]:text-primary-600 hover:[&_span]:hover:underline hover:underline"
        >
          Não possui conta? <span class="text-primary-400">Cadastre-se</span>
        </NuxtLink>
      </div>
    </template>
  </UCard>
</template>
