<script lang="ts" setup>
import type { TimeEntry } from '~~/shared/entities/timeEntry'

interface TimeEntriesProps {
  timeEntries: TimeEntry[]
}

const props = defineProps<TimeEntriesProps>()

function dateHelperFormat(date: Date) {
  return {
    time: Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',

    }).format(date),
    date: Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }).format(date),
  }
}

const parseShift = {
  afternoon: 'Tarde',
  morning: 'Manhã',
  night: 'Noite',
} as const
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-2">
      Registros da Última Semana
    </h2>

    <UTable
      :data="props.timeEntries"
      empty="Nenhum registro"
      :columns="[
        {
          accessorFn: (row) => dateHelperFormat(row.date).date,
          header: 'Data',
        },
        {
          accessorFn: row => parseShift[row.shift],
          header: 'Turno',
        },
        {
          accessorFn: row => dateHelperFormat(row.startTime).time,
          header: 'Hora Entrada',
        },
        {
          accessorFn: row => row.endTime ? dateHelperFormat(row.endTime).time : 'Não atribuído',
          header: 'Hora Saída',
        },
      ]"
    />
  </div>
</template>

<style>

</style>
