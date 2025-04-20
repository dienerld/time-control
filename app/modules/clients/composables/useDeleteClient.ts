export function useDeleteClient() {
  const { clientsService } = useServices()
  const loading = ref(false)
  const errors = ref<{ [key: string]: string }>()
  const { logAndTrack } = useLogAndTrack()
  const toast = useToast()

  async function deleteClient(clientId: string) {
    loading.value = true
    try {
      await clientsService.deleteClient(clientId)
      toast.add({
        icon: 'heroicons:trash',
        title: 'Cliente deletado com sucesso',
        description: 'O cliente foi deletado com sucesso',
        color: 'success',
      })
    }
    catch (error: any) {
      logAndTrack.error(error)
      errors.value = error.data.data
      toast.add({
        title: 'Erro ao deletar cliente',
        description: 'O cliente não foi deletado',
        color: 'error',
      })
    }
    finally {
      loading.value = false
    }
  }

  return {
    deleteClient,
    loading,
    errors,
  }
}
