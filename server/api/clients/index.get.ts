export default defineEventHandler(async (event) => {
  const { userId } = await validateAuth(event)
  const db = useDatabase()

  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database not available',
    })
  }

  const clientsList = await db
    .select()
    .from(tables.clients)
    .where(eq(tables.clients.userId, userId))

  return clientsList
})
