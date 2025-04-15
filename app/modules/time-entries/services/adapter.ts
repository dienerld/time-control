export function timeEntriesAdapter(timeEntries: Record<string, any>[]) {
  return timeEntries.map((timeEntry) => {
    return {
      ...timeEntry,
      date: new Date(timeEntry.date),
      startTime: new Date(timeEntry.startTime),
      endTime: new Date(timeEntry.endTime),
    }
  })
}
