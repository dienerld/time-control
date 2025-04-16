import { eq } from 'drizzle-orm'
import type { NewClient } from '~~/shared/entities/client'

export function useClients() {
  const {clientsService} = useServices()
  const {data: clients, status} = useLazyAsyncData(()=> clientsService.getClients())

  const loading = computed(()=> status.value === 'pending')
  return {
    clients,
    loading,
  }
}
