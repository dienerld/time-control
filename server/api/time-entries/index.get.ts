import { useSafeValidatedParams, useSafeValidatedQuery, z } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const { userId } = await validateAuth(event)

  const paramsParsed = await useSafeValidatedParams(event, z.object({
    clientId: z.string().optional(),
  }))

  const queryParsed = await useSafeValidatedQuery(event, z.object({
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  }))

  const db = useDatabase()

  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database not available',
    })
  }

  const timeEntries = await db.query.timeEntries.findMany({
    where: t => eq(t.userId, userId),
  })

  return timeEntries
})
