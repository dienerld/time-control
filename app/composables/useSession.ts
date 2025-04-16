export function useSession() {
  const { fetch, loggedIn, user, clear } = useUserSession()

  function logout() {
    clear()
    navigateTo('/')
  }
  return {
    getSession: fetch,
    loggedIn,
    user,
    logout,
  }
}
