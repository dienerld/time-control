import type { Client, ClientWithTimeEntries, NewClient } from '~/server/database/types'
import { eq } from 'drizzle-orm'
import { tables } from '~/server/utils/useDatabase'

export function useClients() {
  const db = useDatabase()

  async function createClient(client: NewClient) {
    return await db.insert(tables.clients).values(client).returning()
  }

  async function getClients() {
    return await db.select().from(tables.clients)
  }

  async function getClientById(id: string) {
    return await db
      .select({
        client: tables.clients,
        timeEntries: tables.timeEntries,
      })
      .from(tables.clients)
      .leftJoin(tables.timeEntries, eq(tables.clients.id, tables.timeEntries.clientId))
      .where(eq(tables.clients.id, id))
  }

  async function getClientsWithTimeEntries() {
    return await db
      .select({
        client: tables.clients,
        timeEntries: tables.timeEntries,
      })
      .from(tables.clients)
      .leftJoin(tables.timeEntries, eq(tables.clients.id, tables.timeEntries.clientId))
  }

  async function updateClient(id: string, client: Partial<Client>) {
    return await db
      .update(tables.clients)
      .set(client)
      .where(eq(tables.clients.id, id))
      .returning()
  }

  async function deleteClient(id: string) {
    return await db
      .delete(tables.clients)
      .where(eq(tables.clients.id, id))
      .returning()
  }

  return {
    createClient,
    getClients,
    getClientById,
    getClientsWithTimeEntries,
    updateClient,
    deleteClient,
  }
}
