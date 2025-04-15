import { useSafeValidatedBody, z } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const bodyParsed = await useSafeValidatedBody(event, z.object({
    name: z.string(),
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
  try {
    const userHasExists = await db.query.users.findFirst({
      where: eq(tables.users.username, data.username),
    })

    if (userHasExists) {
      return sendError(event, {
        statusCode: 400,
        message: 'User already exists',
        name: 'UserAlreadyExists',
      })
    }
  }
  catch (error: any) {
    console.error(error)
    return sendError(event, {
      statusCode: 500,
      message: error.message,
      name: error.name,
    })
  }

  const hashedPassword = await hashPassword(data.password)

  const [user] = await db.insert(tables.users).values({
    name: data.name,
    username: data.username,
    password: hashedPassword,
  }).returning({
    id: tables.users.id,
  })

  return {
    id: user.id,
    username: data.username,
    name: data.name,
  }
})
