import { useSafeValidatedBody, z } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const bodyParsed = await useSafeValidatedBody(event, z.object({
    username: z.string(),
    password: z.string(),
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
    return sendError(event, {
      statusCode: 500,
      message: 'Database not available',
      name: 'DatabaseNotAvailable',
    })
  }

  const user = await db.query.users.findFirst({
    where: eq(tables.users.username, data.username),
  })

  if (!user) {
    return sendError(event, {
      statusCode: 401,
      message: 'Invalid credentials',
      name: 'InvalidCredentials',
    })
  }

  const isPasswordValid = await verifyPassword(user.password, data.password)

  if (!isPasswordValid) {
    return sendError(event, {
      statusCode: 401,
      message: 'Invalid credentials',
      name: 'InvalidCredentials',
    })
  }

  await setUserSession(event, {
    id: user.id.toString(),
  })

  return {
    status: 200,
    message: 'Login successful',
  }
})
