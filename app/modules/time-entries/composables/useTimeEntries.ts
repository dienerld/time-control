export function useTimeEntries() {
  const { timeEntriesService } = useServices()

  async function createTimeEntry(timeEntry: any) {
  }

  async function getTimeEntriesByDateRange(startDate: Date, endDate: Date) {
    const data = await timeEntriesService.get({
      query: {
        startDate,
        endDate,
      },
    })

    console.log('data', data)

    return {
      data,
    }
  }

  async function getTimeEntriesByUser() {
    return timeEntriesService.get()
  }

  async function getTimeEntriesByClient(clientId: string) {
    return timeEntriesService.get()
  }

  async function updateTimeEntry(id: string, timeEntry: Partial<any>) {

  }

  async function deleteTimeEntry(id: string) {

  }

  return {
    createTimeEntry,
    getTimeEntriesByDateRange,
    getTimeEntriesByUser,
    getTimeEntriesByClient,
    updateTimeEntry,
    deleteTimeEntry,
  }
}
