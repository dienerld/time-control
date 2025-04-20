import { eq } from 'drizzle-orm'
import { useSafeValidatedBody, z } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const { userId } = await validateAuth(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Client ID is required',
    })
  }

  const bodyParsed = await useSafeValidatedBody(event, z.object({
    name: z.string().optional(),
    cnpj: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }))

  if (!bodyParsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body',
    })
  }

  const data = bodyParsed.data
  const db = useDatabase()

  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database not available',
    })
  }

  const [client] = await db
    .update(tables.clients)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(tables.clients.id, id) && eq(tables.clients.userId, userId))
    .returning()

  if (!client) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Client not found',
    })
  }

  return client
})
