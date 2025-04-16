<script lang="ts" setup>
import type { Client } from '~~/shared/entities/client'
import type { TimeEntryForm } from '~/modules/time-entries/composables/useCreateTimeEntries'
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date'

const props = defineProps<{
  clients: Pick<Client, 'id' | 'name'>[]
  loading: boolean
  clientsStatus: boolean
}>()
const emit = defineEmits<{
  (e: 'submit'): void
}>()
const model = defineModel<TimeEntryForm>({ required: true })

const now = today('America/Sao_Paulo')
const startHour = ref('')
const endHour = ref('')

const df = new DateFormatter('pt-BR', {
  dateStyle: 'medium',
})

const date = shallowRef(now)

const shifts = ref([
  { label: 'Manhã', value: 'morning' },
  { label: 'Tarde', value: 'afternoon' },
  { label: 'Noite', value: 'night' },
])
function dateNowString() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

watch(date, (newDate) => {
  model.value.date = newDate.toDate(getLocalTimeZone())
})

watch(startHour, (newStartHour) => {
  // map string 11:00:00 to Date
  const date = new Date()
  const [hour, minute, second] = newStartHour.split(':')
  if (hour && minute && second) {
    date.setHours(Number(hour))
    date.setMinutes(Number(minute))
    date.setSeconds(Number(second))
    model.value.startTime = date
  }
})

watch(endHour, (newEndHour) => {
  const date = new Date()
  const [hour, minute, second] = newEndHour.split(':')
  if (hour && minute && second) {
    date.setHours(Number(hour))
    date.setMinutes(Number(minute))
    date.setSeconds(Number(second))
    model.value.endTime = date
  }
})
</script>

<template>
  <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="emit('submit')">
    <UFormField label="Cliente" class="w-full">
      <USelect
        v-model="model.clientId"
        :items="[{ id: '-', name: 'Nenhum' }, ...props.clients].map(client => ({
          label: client.name,
          value: client.id,
        }))"
        :loading="props.clientsStatus"
        placeholder="Selecione um cliente"
      />
    </UFormField>

    <UFormField label="Turno">
      <URadioGroup
        v-model="model.shift"
        :items="shifts"
        option-attribute="label"
        value-attribute="value"
        placeholder="Selecione um turno"
        orientation="horizontal"
      />
    </UFormField>

    <UFormField label="Data">
      <div class="flex items-center gap-2">
        <UPopover>
          <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
            {{ model.date ? df.format(model.date) : 'Selecione uma data' }}
          </UButton>

          <template #content>
            <UCalendar v-model="date" class="p-2" />
          </template>
        </UPopover>

        <UButton
          color="neutral" variant="soft" size="md"
          label="Hoje"
          @click="date = new CalendarDate(now.year, now.month, now.day)"
        />
      </div>
    </UFormField>

    <div class="grid grid-cols-2 gap-2">
      <UFormField label="Hora de Entrada">
        <UInput
          v-model="startHour"
          v-maska="'##:##:##'"
          placeholder="09:00:00"
          :ui="{ trailing: 'pe-1' }"
        >
          <template #trailing>
            <UButton
              icon="i-lucide-clock" variant="ghost" size="sm"
              aria-label="Selecionar hora atual"
              @click="startHour = dateNowString()"
            />
          </template>
        </UInput>
      </UFormField>

      <UFormField label="Hora de Saída">
        <UInput
          v-model="endHour"
          v-maska="'##:##:##'"
          placeholder="12:30:00"
          :ui="{ trailing: 'pe-1' }"
        >
          <template #trailing>
            <UButton
              icon="i-lucide-clock" variant="ghost" size="sm"
              aria-label="Selecionar hora atual"
              @click="endHour = dateNowString()"
            />
          </template>
        </UInput>
      </UFormField>
    </div>

    <UFormField label="Descrição" class="col-span-full">
      <UTextarea
        v-model="model.description"
        class="w-full"
        placeholder="Descreva o que foi desenvolvido"
      />
    </UFormField>

    <UButton
      class="col-span-full"
      type="submit"
      :loading="props.loading"
      color="primary"
      block
    >
      Registrar
    </UButton>
  </form>
</template>

<style>

</style>
