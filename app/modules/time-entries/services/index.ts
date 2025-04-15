interface GetTimeEntriesOptions {
  params?: {
    clientId?: string
  }
  query?: {
    startDate?: Date
    endDate?: Date
  }
}

export function useTimeEntriesService() {
  async function get(options?: GetTimeEntriesOptions) {
    const data = await $fetch('/api/time-entries', {
      query: options?.query,
      params: options?.params,
    })
    return data
  }

  return {
    get,
  }
}
