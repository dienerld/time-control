import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import { createClient as createLibSQLClient } from '@libsql/client'
import { drizzle as drizzleLibSQL } from 'drizzle-orm/libsql'

import * as tables from '../database/schema'

export { and, eq, gte, lte, type SQL, sql } from 'drizzle-orm'
export { tables }

let database: LibSQLDatabase<typeof tables> | null = null

export function useDatabase() {
  if (database) {
    return database
  }

  const { tursoDBURL, tursoDBToken, nodeEnv } = useRuntimeConfig()

  const isLocal = nodeEnv === 'development'

  const credentials = isLocal
    ? {
        url: tursoDBURL,
      }
    : {
        url: tursoDBURL,
        authToken: tursoDBToken || undefined,
      }

  if (!credentials.url) {
    throw new Error('Turso DB URL is not set')
  }

  database = drizzleLibSQL(createLibSQLClient(credentials), { schema: tables })

  return database
}
