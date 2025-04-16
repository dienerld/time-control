export function useClientServices() {
  async function getClients() {
    const res = await $fetch('/api/clients')
    return res
  }

  return {
    getClients,
  }
}
