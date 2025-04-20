export function _useSession() {
  const { fetch, loggedIn, user, clear } = useUserSession()

  const isAuthenticated = computed(() => loggedIn.value)

  function logout() {
    clear()
    navigateTo('/')
  }
  return {
    getSession: fetch,
    loggedIn,
    user,
    logout,
    isAuthenticated,
  }
}

export const useSession = createSharedComposable(_useSession)
