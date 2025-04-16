<script setup lang="ts">
import TimeEntriesLoader from '@/modules/time-entries/components/list/loader.vue'
import TimeEntriesList from '@/modules/time-entries/components/list/timeEntries.vue'

const { data: timeEntries, status } = await useLazyFetch('/api/time-entries', {
  transform: (data) => {
    return data.map((timeEntry: any) => ({
      ...timeEntry,
      date: new Date(timeEntry.date),
      startTime: new Date(timeEntry.startTime),
      endTime: timeEntry.endTime ? new Date(timeEntry.endTime) : null,
    }))
  },
  cache: 'force-cache',
})
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      Registro de Horas
    </h1>

    <div class="mt-8">
      <TimeEntriesLoader :loading="status === 'pending'">
        <TimeEntriesList :time-entries="timeEntries" />
      </TimeEntriesLoader>
    </div>
  </div>
</template>
