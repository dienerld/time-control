interface SignUpData {
  name: string
  username: string
  password: string
}

interface SignInData {
  username: string
  password: string
}

export function useAuth() {
  const toast = useToast()
  const { getSession } = useSession()

  async function signUp(data: SignUpData) {
    try {
      await $fetch('/api/auth/signup', {
        method: 'POST',
        body: data,
      })
      toast.add({
        title: 'Cadastro realizado com sucesso',
        description: 'Você pode agora fazer login',
        color: 'success',
      })

      setTimeout(() => {
        navigateTo('/auth/signin')
      }, 1000)
    }
    catch (error: any) {
      toast.add({
        title: 'Erro ao realizar cadastro',
        description: error?.data?.message || 'Erro ao realizar cadastro',
        color: 'error',
      })
    }
  }

  async function signIn(data: SignInData) {
    try {
      await $fetch('/api/auth/signin', {
        method: 'POST',
        body: data,
      })
      await getSession()
      navigateTo('/time-entries')
    }
    catch (error: any) {
      toast.add({
        title: 'Erro ao realizar login',
        description: error?.data?.message || 'Erro ao realizar login',
        color: 'error',
      })
    }
  }
  return {
    signUp,
    signIn,
  }
}
