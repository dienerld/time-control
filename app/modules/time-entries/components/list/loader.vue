<script lang="ts" setup>
const props = defineProps<{
  loading: boolean
}>()

const USkeleton = resolveComponent('USkeleton')
</script>

<template>
  <div v-if="props.loading">
    <UTable
      :data="Array(4).fill(null)"
      :columns="[
        { header: 'Data', cell: () => h(USkeleton, { class: 'h-6 w-1/2' }) },
        { header: 'Turno', cell: () => h(USkeleton, { class: 'h-6 w-1/2' }) },
        { header: 'Hora Entrada', cell: () => h(USkeleton, { class: 'h-6 w-1/2' }) },
        { header: 'Hora Saída', cell: () => h(USkeleton, { class: 'h-6 w-1/2' }) },
        {
          header: () => h('div', { class: 'text-right' }, 'Ações'),
          id: 'actions',
          accessorFn: () => 'actions',
          cell: () => h('div', { class: 'flex gap-2' }, [h(USkeleton, { class: 'h-6 w-1/2' }), h(USkeleton, { class: 'h-6 w-1/2' })]),
        },
      ]"
    />
  </div>
  <slot v-else />
</template>

<style>

</style>
