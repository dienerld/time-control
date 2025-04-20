import type { NewClient } from '~~/shared/entities/client'

export function useClientServices() {
  async function getClients() {
    const res = await $fetch('/api/clients')
    return res.map(client => ({
      id: client.id,
      name: client.name,
      cnpj: client.cnpj,
    }))
  }

  async function createClient(client: NewClient) {
    const res = await $fetch('/api/clients', {
      method: 'POST',
      body: client,
    })
    return res
  }

  async function deleteClient(clientId: string) {
    const res = await $fetch(`/api/clients/${clientId}`, {
      method: 'DELETE',
    })
    return res
  }

  return {
    getClients,
    createClient,
    deleteClient,
  }
}
