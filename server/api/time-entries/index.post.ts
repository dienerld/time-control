import { useSafeValidatedBody, z } from 'h3-zod'
import { timeEntries } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { userId } = await validateAuth(event)
  const bodyParsed = await useSafeValidatedBody(event, z.object({
    clientId: z.string(),
    date: z.coerce.date(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    shift: z.enum(['morning', 'afternoon', 'night']),
    description: z.string(),
  }))

  if (!bodyParsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid body',
    })
  }

  const body = bodyParsed.data
  const db = useDatabase()

  const timeEntry = await db.insert(timeEntries).values({
    date: body.date,
    clientId: body.clientId,
    startTime: body.startTime,
    endTime: body.endTime,
    userId,
    shift: body.shift,
    description: body.description,
  }).returning()

  return timeEntry
})
