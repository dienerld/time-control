import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type { users } from '~~/server/database/schema'
import type { TimeEntry } from './timeEntry'

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>

// Tipos com relações
export type UserWithTimeEntries = User & {
  timeEntries: TimeEntry[]
}
