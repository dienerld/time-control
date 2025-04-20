<script lang="ts">
type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'

export interface DialogConfirmationProps {
  title: string
  description: string
  confirmText: string
  cancelText: string
  confirmColor?: ButtonColor
  cancelColor?: ButtonColor
  loading?: boolean
}

interface DialogConfirmationEmits {
  (e: 'confirm'): void
  (e: 'cancel'): void
}
</script>

<script lang="ts" setup>
const props = defineProps<DialogConfirmationProps>()
const emit = defineEmits<DialogConfirmationEmits>()
</script>

<template>
  <UModal :title="props.title" :description="props.description">
    <template #footer>
      <div class="flex gap-2 justify-end w-full">
        <UButton :color="props.cancelColor ?? 'error'" :loading="props.loading" @click="emit('cancel')">
          {{ props.cancelText }}
        </UButton>
        <UButton :color="props.confirmColor ?? 'primary'" :loading="props.loading" @click="emit('confirm')">
          {{ props.confirmText }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>
