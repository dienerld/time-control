import { useSafeValidatedBody } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const { userId } = await validateAuth(event)
  const bodyParsed = await useSafeValidatedBody(event, z.object({
    name: z.string(),
    cnpj: z.string().optional().nullable(),
    email: z.string().email().optional().nullable(),
    phone: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
  }))

  if (!bodyParsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body',
      data: formatErrorsZod(bodyParsed.error),
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

  const [client] = await db.insert(tables.clients).values({
    ...data,
    userId,
    updatedAt: new Date(),
  }).returning()

  return client
})
