import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { drizzle as drizzleD1 } from 'drizzle-orm/d1'

import * as tables from '../database/schema'

export { and, eq, gte, lte, type SQL, sql } from 'drizzle-orm'
export { tables }

let database: DrizzleD1Database<typeof tables> | null = null

export function useDatabase() {
  if (database) {
    return database
  }

  database = drizzleD1(hubDatabase(), { schema: tables })

  return database
}
