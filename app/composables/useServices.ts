import { useClientServices } from '~/modules/clients/services/client.services'

export function useServices() {
  return {
    clientsService: useClientServices(),
  }
}
