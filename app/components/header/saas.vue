<template>
  <header
    class="relative flex w-full items-center justify-between py-2 px-4"
  >
    <div class="flex w-auto items-center justify-start">
      <Logo />
    </div>

    <div class="flex items-center justify-end gap-2">
      <div class="flex items-center gap-2">
        <UButton
          label="Sign in"
          variant="ghost"
          color="primary"
          size="lg"
          to="/auth/signin"
        />
        <UButton
          label="Sign up"
          variant="solid"
          color="primary"
          size="lg"
          to="/auth/signup"
        />
      </div>

      <ThemeSwitch />
    </div>
  </header>
</template>
