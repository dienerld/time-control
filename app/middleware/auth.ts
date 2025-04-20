import { useSession } from '~/composables/useSession'

export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useSession()

  if (!loggedIn.value) {
    console.log('[middleware] redirecting to /')
    return navigateTo('/auth/signin')
  }

  return true
})
