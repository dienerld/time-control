import type { H3Event } from 'h3'
import { isValid } from 'ulid'

export async function validateAuth(event: H3Event) {
  const { user } = await getUserSession(event)

  if (!user || !isValid(user.id)) {
    await clearUserSession(event)
    throw sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized', fatal: true }))
  }

  return {
    userId: user.id,
  }
}
