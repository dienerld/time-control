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
})
</script>

<template>
  <MainContent>
    <div class="flex justify-between mb-8 items-center">
      <div>
        <h1 class="text-2xl font-bold">
          Registro de Horas
        </h1>
        <p class="mt-1 text-sm">
          Gerencie seus registros de horas trabalhadas
        </p>
      </div>

      <UButton
        color="primary"
        to="/time-entries/new"
        icon="heroicons:plus"
        class="flex items-center gap-2"
        :ui="{
          label: 'hidden md:block',
        }"
        label="Novo Registro de Horas"
      />
    </div>

    <UCard>
      <TimeEntriesLoader :loading="status === 'pending'">
        <TimeEntriesList :time-entries="timeEntries" />
      </TimeEntriesLoader>
    </UCard>
  </MainContent>
</template>
