import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type { timeEntries } from '~~/server/database/schema'
import type { User } from './user'

export type Shift = 'morning' | 'afternoon' | 'night'

export type TimeEntry = InferSelectModel<typeof timeEntries>
export type NewTimeEntry = InferInsertModel<typeof timeEntries>

export type TimeEntryWithRelations = TimeEntry & {
  user: User
  client: Client
}
