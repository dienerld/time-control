/* eslint-disable no-console */
export function useLogAndTrack() {
  function logAndTrack(...args: any[]) {
    console.log(...args)
  }

  return {
    logAndTrack,
  }
}
