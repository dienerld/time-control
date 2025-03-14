<script setup lang="ts">
const toast = useToast()
const { t } = useI18n({ useScope: 'local' })

defineShortcuts({
  a: () => toast.add({ title: 'Hello', description: 'World' }),
})
</script>

<template>
  <HeaderIndeed />
  <HeroDark
    :title="t('title')"
    :label-btn-primary="t('labelBtnPrimary')"
    :label-btn-secondary="t('labelBtnSecondary')"
  />
</template>

<i18n lang="json">
{
  "en": {
    "title": "Welcome to Nuxt UI Starter",
    "description": "Hello welcome to Nuxt UI Starter, here you will find all the information you need to start exploring our services.",
    "labelBtnPrimary": "Start now",
    "labelBtnSecondary": "Learn more"
  },
  "pt_br": {
    "title": "Bem-vindo ao nosso site",
    "description": "Olá seja bem vindo ao nosso site, aqui você encontrará todas as informações que você precisa para começar a explorar nossos serviços.",
    "labelBtnPrimary": "Comece agora",
    "labelBtnSecondary": "Saiba mais"
  }
}
</i18n>
