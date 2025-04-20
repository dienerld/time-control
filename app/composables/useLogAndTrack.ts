/* eslint-disable no-console */
export function useLogAndTrack() {
  const logLevels = {
    info: (...args: any[]) => console.log('[INFO]', ...args),
    error: (...args: any[]) => console.error('[ERROR]', ...args),
    warn: (...args: any[]) => console.warn('[WARN]', ...args),
    debug: (...args: any[]) => console.debug('[DEBUG]', ...args),
  }

  const logAndTrack = Object.assign(
    (...args: any[]) => logLevels.info(...args),
    logLevels,
  )

  return {
    logAndTrack,
  }
}
