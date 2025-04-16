<script setup lang="ts">
import type { Client } from '~~/shared/entities/client'
import type { TimeEntry } from '~~/shared/entities/timeEntry'

import TimeEntriesLoader from '@/modules/time-entries/components/list/loader.vue'
import TimeEntriesList from '@/modules/time-entries/components/list/timeEntries.vue'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

import { useTimeEntries } from '../composables/useTimeEntries'

const { createTimeEntry, getTimeEntriesByDateRange } = useTimeEntries()

const timeEntries = ref<TimeEntry[]>([{
  id: 'placeholder',
  clientId: 'placeholder',
  userId: 'placeholder',
  description: 'placeholder',
  createdAt: new Date(),
  updatedAt: new Date(),
  date: new Date(),
  endTime: new Date(),
  shift: 'afternoon',
  startTime: new Date(),
}, {
  id: 'placeholder',
  clientId: 'placeholder',
  userId: 'placeholder',
  description: 'placeholder',
  createdAt: new Date(),
  updatedAt: new Date(),
  date: new Date(),
  endTime: null,
  shift: 'night',
  startTime: new Date(),
}])

async function loadTimeEntries() {
  const startDate = new Date()
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date()
  endDate.setHours(23, 59, 59, 999)

  const result = await getTimeEntriesByDateRange(startDate, endDate)
  timeEntries.value = result.data.map(timeEntry => ({
    ...timeEntry,
    date: new Date(timeEntry.date),
    startTime: new Date(timeEntry.startTime),
    endTime: new Date(timeEntry.endTime!),
    createdAt: timeEntry.createdAt ? new Date(timeEntry.createdAt) : null,
    updatedAt: timeEntry.updatedAt ? new Date(timeEntry.updatedAt) : null,
  }))
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      Registro de Horas
    </h1>

    <div class="mt-8">
      <TimeEntriesLoader>
        <TimeEntriesList :time-entries="timeEntries" />
      </TimeEntriesLoader>
    </div>
  </div>
</template>
