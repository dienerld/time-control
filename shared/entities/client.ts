import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type { clients } from '~~/server/database/schema'
import type { TimeEntry } from './timeEntry'

export type Client = InferSelectModel<typeof clients>
export type NewClient = InferInsertModel<typeof clients>

export type ClientWithTimeEntries = Client & {
  timeEntries: TimeEntry[]
}
