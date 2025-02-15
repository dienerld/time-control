import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { resolve } from 'node:path'

import { drizzle } from 'drizzle-orm/better-sqlite3'

export * as tables from '../database/schema'

export {
  and,
  asc,
  between,
  desc,
  getTableColumns,
  ilike,
  like,
  not,
  or,
} from 'drizzle-orm'

let database: BetterSQLite3Database | null = null

export function useDatabase() {
  if (database) {
    return database
  }
  const url = resolve('database.sqlite')
  console.log('url', url)

  database = drizzle(url)
  return database
}
