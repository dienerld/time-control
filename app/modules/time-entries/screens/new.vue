<script lang="ts" setup>
import TimeEntryForm from '~/modules/time-entries/components/detail/form.vue'
import { useCreateTimeEntries } from '~/modules/time-entries/composables/useCreateTimeEntries'

const { save, timeEntry, loading } = useCreateTimeEntries()
const { clientsService } = useServices()
const { data: clientsData, status: clientsStatus } = useLazyAsyncData(() => clientsService.getClients())

const clients = computed(() => clientsData.value?.map(client => ({
  name: client.name,
  id: client.id,
})) ?? [])
</script>

<template>
  <MainContent>
    <TimeEntryForm
      v-model="timeEntry"
      :clients="clients"
      :loading="loading"
      :clients-status="clientsStatus === 'pending'"
      @submit="save"
    />
  </MainContent>
</template>

<style>

</style>
