import type { H3Event } from 'h3'
import { isValid } from 'ulid'

export async function validateAuth(event: H3Event) {
  const { id } = await getUserSession(event)

  if (!id || !isValid(id)) {
    await clearUserSession(event)
    throw sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized', fatal: true }))
  }

  return {
    userId: id,
  }
}
