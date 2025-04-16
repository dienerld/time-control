/* eslint-disable no-console */
export function useLogAndTrack() {
  function logAndTrack(message: string) {
    console.log(message)
  }

  return {
    logAndTrack,
  }
}
