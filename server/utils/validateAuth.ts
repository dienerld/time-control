import type { H3Event } from 'h3'

export async function validateAuth(event: H3Event) {
  const { id } = await getUserSession(event)

  if (!id) {
    await clearUserSession(event)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  return {
    userId: id,
  }
}
