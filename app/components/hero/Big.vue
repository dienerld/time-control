<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  splittedText?: `${string} || ${string}`
  description?: string
  labelBtnPrimary?: string
  labelBtnSecondary?: string
  classTitle?: string
}>(), {
  splittedText: 'Explore. || Amaze.',
  description: 'Embark on an unforgettable adventure safari with our expert guides',
  labelBtnPrimary: 'Book a tour now',
  labelBtnSecondary: 'Discover more',
})

const icons = [
  'i-simple-icons-adobeillustrator',
  'i-simple-icons-amazon',
  'i-simple-icons-google',
  'i-simple-icons-facebook',
  'i-simple-icons-vite',
  'i-simple-icons-nike',
  'i-simple-icons-apple',
  'i-simple-icons-microsoft',
  'i-simple-icons-twitter',
]

const text1 = computed(() => props.splittedText?.split('||')[0]?.trim())
const text2 = computed(() => props.splittedText?.split('||')[1]?.trim())
</script>

<template>
  <div
    class="relative flex h-full flex1 w-full flex-col items-center justify-center  pt-32"
  >
    <div class="relative z-20 w-11/12 md:w-10/12">
      <div class="flex flex-col items-center justify-center">
        <h1
          class="mt-4 text-center font-sans text-8xl font-bold text-dark-900 sm:text-6xl md:text-9xl dark:text-dark-50"
          :class="props.classTitle"
        >
          <template v-if="props.splittedText && !props.title">
            <span>{{ text1 }}</span>
            <br>
            <span>{{ text2 }}</span>
          </template>
          <template v-else>
            {{ title }}
          </template>
        </h1>
        <p
          class="mt-4 w-full text-center text-lg leading-8  sm:w-1/2 2xl:w-1/3 2xl:text-xl"
        >
          {{ props.description }}
        </p>
        <div class="mt-8 flex flex-col gap-4 md:flex-row">
          <UButton variant="solid" to="#" size="lg" class="px-8">
            {{ props.labelBtnPrimary }}
          </UButton>
          <UButton variant="outline" to="#" size="lg" class="px-8">
            {{ props.labelBtnSecondary }}
          </UButton>
        </div>
      </div>
    </div>
    <div class="mt-12 flex w-full flex-wrap items-center justify-center gap-4">
      <template v-for="icon in icons" :key="icon">
        <div class="flex size-auto items-center justify-center p-2">
          <UIcon :name="icon" class="mx-auto size-10 text-dark-500/50 dark:text-dark-50/20" />
        </div>
      </template>
    </div>
    <div class="xl:max-w-screen-2xl relative z-10 mt-12 mx-auto w-full p-4 md:p-2">
      <NuxtImg
        class="h-[520px] w-full object-cover object-center lg:h-[640px] 2xl:h-[720px]"
        src="https://images.unsplash.com/photo-1580145575237-75fec2a0320b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        loading="lazy" alt="my-hero-background" :placeholder="[50, 25, 75, 5]"
      />
    </div>
  </div>
</template>
