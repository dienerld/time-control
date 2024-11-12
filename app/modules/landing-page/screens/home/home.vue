<script setup lang="ts">
const name = ref('Nuxt UI Starter')
const toast = useToast()
// const { t } = useI18n({ useScope: 'local' })
defineShortcuts({
  meta_k: () => { name.value = 'Diener' },
  a: () => toast.add({ title: 'Hello', description: 'World' }),
})
</script>

<template>
  <HeaderSaas />
  <!-- <HeroBig
    :title="t('title')"
    :description="t('description')"
    :label-btn-primary="t('labelBtnPrimary')"
    :label-btn-secondary="t('labelBtnSecondary')"
  /> -->
  <HeroDesaturate />
</template>

<i18n lang="json">
{
  "en": {
    "title": "Welcome to Nuxt UI Starter",
    "description": "Hello welcome to Nuxt UI Starter, here you will find all the information you need to start exploring our services.",
    "labelBtnPrimary": "Start now",
    "labelBtnSecondary": "Learn more"
  },
  "br": {
    "title": "Bem-vindo ao nosso site",
    "description": "Olá seja bem vindo ao nosso site, aqui você encontrará todas as informações que você precisa para começar a explorar nossos serviços.",
    "labelBtnPrimary": "Comece agora",
    "labelBtnSecondary": "Saiba mais"
  }
}
</i18n>
