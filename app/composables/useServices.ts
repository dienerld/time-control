import { useTimeEntriesService } from '~/modules/time-entries/services'

export function useServices() {
  return {
    clientsService: {
      get: () => {},
    },
    timeEntriesService: useTimeEntriesService(),
  }
}
