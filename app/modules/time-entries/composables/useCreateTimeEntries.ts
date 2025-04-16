import type { NewTimeEntry } from '~~/shared/entities/timeEntry'

export type TimeEntryForm = Omit<NewTimeEntry, 'userId'>

export function useCreateTimeEntries() {
  const timeEntry = ref<TimeEntryForm>({
    clientId: '',
    date: new Date(),
    description: '',
    endTime: new Date(),
    shift: 'morning',
    startTime: new Date(),
  })
  const { logAndTrack } = useLogAndTrack()
  const loading = ref(false)

  async function save() {
    loading.value = true
    try {
      await $fetch('/api/time-entries', {
        method: 'POST',
        body: timeEntry.value,
      })
    }
    catch (error) {
      logAndTrack('[useCreateTimeEntries] save', error)
    }
    finally {
      loading.value = false
    }
  }

  return {
    save,
    timeEntry,
    loading,
  }
}
