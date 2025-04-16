import type { NewTimeEntry } from '~~/shared/entities/timeEntry'

export function useCreateTimeEntries() {
  const timeEntry = ref<NewTimeEntry>({
    clientId: '',
    date: new Date(),
    description: '',
    endTime: new Date(),
    shift: 'morning',
    startTime: new Date(),
    userId: '',
  })
  const { logAndTrack } = useLogAndTrack()
  const loading = ref(false)

  function save() {
    logAndTrack('createTimeEntry')
  }

  return {
    save,
    timeEntry,
    loading,
  }
}
