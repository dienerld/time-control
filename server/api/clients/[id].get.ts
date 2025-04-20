import { useSafeValidatedParams, z } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const { userId } = await validateAuth(event)
  const body = await useSafeValidatedParams(event, z.object({ id: z.string() }))

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request',
    })
  }

  const { id } = body.data
  const db = useDatabase()

  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database not available',
    })
  }

  const client = await db
    .select()
    .from(tables.clients)
    .where(eq(tables.clients.id, id) && eq(tables.clients.userId, userId))

  if (!client) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Client not found',
    })
  }
  return client
})
