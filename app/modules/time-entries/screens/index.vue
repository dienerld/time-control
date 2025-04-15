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
const loading = ref(false)
const clients = ref<Client[]>([])
const today = new Date()

const form = ref({
  userId: '', // Será preenchido com o ID do usuário logado
  clientId: '',
  date: shallowRef(new CalendarDate(today.getFullYear(), today.getMonth(), today.getDate())),
  shift: 'morning',
  startTime: new Date(),
  endTime: new Date(),
  description: '',
})

const df = new DateFormatter('pt-BR', {
  dateStyle: 'medium',
})

const shifts = [
  { label: 'Manhã', value: 'morning' },
  { label: 'Tarde', value: 'afternoon' },
  { label: 'Noite', value: 'night' },
]

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

async function handleSubmit() {
  loading.value = true
  try {
    await createTimeEntry(form.value)
    await loadTimeEntries()
    form.value = {
      userId: '',
      clientId: '',
      date: new CalendarDate(today.getFullYear(), today.getMonth(), today.getDate()),
      shift: 'morning',
      startTime: new Date(),
      endTime: new Date(),
      description: '',
    }
  }
  catch (error) {
    console.error('Erro ao criar registro:', error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      Registro de Horas
    </h1>

    <form class="space-y-4 flex flex-col gap-4" @submit.prevent="handleSubmit">
      <UFormField label="Cliente">
        <USelect
          v-model="form.clientId"
          :options="[{ id: '-', name: 'Nenhum', createdAt: null, description: null }, ...clients].map(client => ({
            label: client.name,
            value: client.id,
          }))"
          placeholder="Selecione um cliente"
        />
      </UFormField>

      <UPopover>
        <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
          {{ form.date ? df.format(form.date.toDate(getLocalTimeZone())) : 'Select a date' }}
        </UButton>

        <template #content>
          <UCalendar v-model="form.date" class="p-2" />
        </template>
      </UPopover>

      <UFormField label="Turno">
        <USelect
          v-model="form.shift"
          :options="shifts"
          option-attribute="label"
          value-attribute="value"
          placeholder="Selecione um turno"
        />
      </UFormField>

      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Hora de Entrada">
          <UInput v-model="form.startTime as unknown as string" type="time" />
        </UFormField>

        <UFormField label="Hora de Saída">
          <UInput
            v-model="form.endTime as unknown as string"
            type="time"
          />
        </UFormField>
      </div>

      <UFormField label="Descrição">
        <UTextarea
          v-model="form.description"
          placeholder="Descreva o que foi desenvolvido"
        />
      </UFormField>

      <UButton
        type="submit"
        :loading="loading"
        color="primary"
      >
        Registrar
      </UButton>
    </form>

    <div class="mt-8">
      <TimeEntriesLoader>
        <TimeEntriesList :time-entries="timeEntries" />
      </TimeEntriesLoader>
    </div>
  </div>
</template>
