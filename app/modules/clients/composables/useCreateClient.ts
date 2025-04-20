import type { NewClient } from '~~/shared/entities/client'

const createClientSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }).min(1, { message: 'Nome é obrigatório' }),
  cnpj: z.string().optional().nullable().transform(value => value?.replace(/\D/g, '')),
  address: z.string().optional().nullable(),
  contactName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
}).transform((data) => {
  const keys = Object.keys(data) as (keyof typeof data)[]
  return keys.reduce((acc, key) => {
    acc[key] = data[key] === '' ? null : data[key]
    return acc
  }, {} as Record<string, string | null | undefined>)
})

export function useCreateClient() {
  const { clientsService } = useServices()
  const client = ref<NewClient>({
    name: '',
    userId: '',
    address: null,
    contactName: null,
    description: null,
    email: null,
    phone: null,
    cnpj: null,
  })
  const { logAndTrack } = useLogAndTrack()
  const loading = ref(false)
  const errors = ref<{ [key: string]: string }>()
  const toast = useToast()

  async function createClient() {
    loading.value = true
    try {
      logAndTrack('createClient', client.value)
      await clientsService.createClient(client.value)
      client.value = {
        name: '',
        userId: '',
        address: null,
        contactName: null,
        description: null,
      }
      errors.value = {}
      toast.add({
        icon: 'i-heroicons-check-circle',
        title: 'Cliente criado com sucesso',
        description: 'O cliente foi criado com sucesso',
        color: 'success',
      })
    }
    catch (error: any) {
      logAndTrack.error(error)
      errors.value = error.data.data
      toast.add({
        title: 'Erro ao criar cliente',
        description: 'O cliente não foi criado',
        color: 'error',
      })
    }
    finally {
      loading.value = false
    }
  }

  return {
    client,
    createClientSchema,
    createClient,
    loading,
    errors,
  }
}
