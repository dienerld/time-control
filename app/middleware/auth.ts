import { useSession } from '~/composables/useSession'

export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useSession()

  if (!loggedIn) {
    console.log('[middleware] redirecting to /')
    return navigateTo('/')
  }

  return true
})
