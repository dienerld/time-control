export function useSession() {
  const { fetch, loggedIn, user } = useUserSession()

  return {
    getSession: fetch,
    loggedIn,
    user,
  }
}
