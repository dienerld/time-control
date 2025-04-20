<script lang="ts" setup>
import type { Client } from '~~/shared/entities/client'
import type { TimeEntryForm } from '~/modules/time-entries/composables/useCreateTimeEntries'
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { z } from 'zod'

const props = defineProps<{
  clients: Pick<Client, 'id' | 'name'>[]
  loading: boolean
  clientsStatus: boolean
}>()

const emit = defineEmits<{
  (e: 'submit'): void
}>()

const model = defineModel<TimeEntryForm>({ required: true })

const schema = z.object({
  clientId: z.string().nullable().transform(value => value === '-' || value === '' ? null : value),
  date: z.date(),
  startTime: z.date(),
  endTime: z.date().optional(),
  description: z.string().min(1),
  shift: z.enum(['morning', 'afternoon', 'night']),
})

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
  <UForm
    :schema="schema"
    :state="model"
    class="w-full"
    @submit.prevent="emit('submit')"
  >
    <div class="grid grid-cols-1 gap-6">
      <UFormField label="Cliente" name="clientId" class="col-span-full text-base" required>
        <USelect
          v-model="model.clientId"
          required
          :items="[{ id: '-', name: 'Nenhum' }, ...props.clients].map(client => ({
            label: client.name,
            value: client.id,
          }))"
          :loading="props.clientsStatus"
          placeholder="Selecione um cliente"
          size="lg"
          class="w-full"
        />
      </UFormField>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField label="Data" name="date" class="text-base" required>
          <div class="flex items-center gap-2 w-full">
            <UPopover>
              <UButton color="neutral" variant="soft" icon="i-lucide-calendar" size="lg" class="flex-1 justify-start">
                {{ model.date ? df.format(model.date) : 'Selecione uma data' }}
              </UButton>

              <template #content>
                <UCalendar v-model="date" class="p-2" />
              </template>
            </UPopover>

            <UButton
              color="neutral"
              variant="soft"
              size="lg"
              label="Hoje"
              class="shrink-0"
              @click="date = new CalendarDate(now.year, now.month, now.day)"
            />
          </div>
        </UFormField>

        <UFormField label="Turno" name="shift" class="text-base" required>
          <URadioGroup
            v-model="model.shift"
            :items="shifts"
            option-attribute="label"
            value-attribute="value"
            placeholder="Selecione um turno"
            orientation="horizontal"
            size="lg"
            class="flex flex-wrap gap-2 justify-between w-full"
          />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField label="Hora de Entrada" name="startTime" class="text-base" required>
          <div class="flex items-center gap-2 w-full">
            <UInput
              v-model="startHour"
              v-maska="'##:##:##'"
              placeholder="09:00:00"
              size="lg"
              class="flex-1"
              :ui="{
                base: 'relative flex w-full',
                trailing: 'absolute inset-y-0 right-0 flex items-center pr-2',
              }"
            >
              <template #trailing>
                <UButton
                  icon="i-lucide-clock"
                  variant="ghost"
                  size="sm"
                  color="neutral"
                  aria-label="Selecionar hora atual"
                  class="hidden md:flex"
                  @click="startHour = dateNowString()"
                />
              </template>
            </UInput>
            <UButton
              color="neutral"
              variant="soft"
              size="lg"
              icon="i-lucide-clock"
              label="Agora"
              class="md:hidden shrink-0"
              @click="startHour = dateNowString()"
            />
          </div>
        </UFormField>

        <UFormField label="Hora de Saída" name="endTime" class="text-base">
          <div class="flex items-center gap-2 w-full">
            <UInput
              v-model="endHour"
              v-maska="'##:##:##'"
              placeholder="12:30:00"
              size="lg"
              class="flex-1"
              :ui="{
                base: 'relative flex w-full',
                trailing: 'absolute inset-y-0 right-0 flex items-center pr-2',
              }"
            >
              <template #trailing>
                <UButton
                  icon="i-lucide-clock"
                  variant="ghost"
                  size="sm"
                  color="neutral"
                  aria-label="Selecionar hora atual"
                  class="hidden md:flex"
                  @click="endHour = dateNowString()"
                />
              </template>
            </UInput>
            <UButton
              color="neutral"
              variant="soft"
              size="lg"
              icon="i-lucide-clock"
              label="Agora"
              class="md:hidden shrink-0"
              @click="endHour = dateNowString()"
            />
          </div>
        </UFormField>
      </div>

      <UFormField label="Descrição" class="col-span-full text-base" name="description">
        <UTextarea
          v-model="model.description"
          class="w-full"
          placeholder="Descreva o que foi desenvolvido"
          size="lg"
          :ui="{
            base: 'relative flex w-full min-h-[120px] resize-y',
          }"
        />
      </UFormField>

      <div class="flex justify-end">
        <UButton
          type="submit"
          :loading="props.loading"
          color="primary"
          size="lg"
          icon="i-lucide-save"
          class="w-full md:w-auto"
          block
        >
          Registrar Horas
        </UButton>
      </div>
    </div>
  </UForm>
</template>

<style>

</style>
