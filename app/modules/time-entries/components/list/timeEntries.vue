<script lang="ts" setup>
import type { TimeEntry } from '~~/shared/entities/timeEntry'

interface TimeEntriesProps {
  timeEntries?: TimeEntry[]
}

const props = withDefaults(defineProps<TimeEntriesProps>(), {
  timeEntries: () => [],
})
const UButton = resolveComponent('UButton')
const toast = useToast()
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
        enableSorting: true,
      },
      {
        id: 'actions',
        header: 'Ações',
        cell: ({ row }) => {
          return h(
            'div',
            { class: 'text-right' },
            h(
              UButton,
              {
                label: row.original.endTime ? 'Editar' : 'Finalizar',
                color: row.original.endTime ? 'primary' : 'success',
                variant: 'outline',
                class: 'ml-auto',
                onClick: () => {
                  toast.add({
                    title: 'Editar',
                    color: 'primary',
                    icon: 'i-lucide-pencil',
                  })
                },
              },
            ),
          )
        },

      },
    ]"
  />
</template>

<style>

</style>
