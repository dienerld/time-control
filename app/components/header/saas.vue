<template>
  <header
    class="relative flex w-full items-center justify-between bg-neutral-50 py-2 px-4 dark:bg-dark-950"
  >
    <div class="flex w-auto items-center justify-start">
      <Logo />
    </div>
    <nav class="hidden  items-center justify-center md:flex">
      <UButton variant="link" color="primary" size="lg" to="#">
        Home
      </UButton>
      <UButton variant="link" color="primary" size="lg" to="#">
        About
      </UButton>
      <UButton variant="link" color="primary" size="lg" to="#">
        Services
      </UButton>
      <UButton variant="link" color="primary" size="lg" to="#">
        Contact
      </UButton>
      <UButton variant="link" color="primary" size="lg" to="#">
        Blog
      </UButton>
    </nav>
    <div class="flex  items-center justify-end gap-2">
      <UButton label="Sign in" variant="ghost" class="hidden md:block" color="primary" size="lg" />
      <UButton label="Sign up" variant="solid" color="primary" size="lg" class="hidden md:block" />
      <ThemeSwitch />
      <USlideover title="Menu" close-icon="i-heroicons-x-mark">
        <div class="inline-block md:hidden">
          <UButton
            icon="i-heroicons-bars-3"
            variant="link"
            color="primary"
            size="lg"
          />
        </div>
        <template #body>
          <nav class="flex w-full flex-col">
            <UButton block variant="link" color="primary" size="lg" to="#">
              Home
            </UButton>
            <UButton block variant="link" color="primary" size="lg" to="#">
              About
            </UButton>
            <UButton block variant="link" color="primary" size="lg" to="#">
              Services
            </UButton>
            <UButton block variant="link" color="primary" size="lg" to="#">
              Contact
            </UButton>
            <UButton block variant="link" color="primary" size="lg" to="#">
              Blog
            </UButton>
          </nav>
          <!-- divider -->
          <hr class="border-neutral-500/50 w-full my-4">
          <div class="flex items-center justify-center gap-2 ">
            <UButton label="Sign in" variant="ghost" color="primary" size="lg" />
            <UButton label="Sign up" variant="solid" color="primary" size="lg" />
          </div>
        </template>
      </USlideover>
    </div>
  </header>
</template>
