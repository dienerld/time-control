import { useSession } from '~/composables/useSession'

export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useSession()

  if (loggedIn.value) {
    return navigateTo('/time-entries')
  }

  return true
})
