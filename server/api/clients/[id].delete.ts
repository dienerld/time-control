export default defineEventHandler(async (event) => {
  const { userId } = await validateAuth(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Client ID is required',
    })
  }

  const db = useDatabase()

  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database not available',
    })
  }

  if (!(await db.query.clients.findFirst({ where: eq(tables.clients.id, id) && eq(tables.clients.userId, userId) }))) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Client not found',
    })
  }

  const [client] = await db
    .delete(tables.clients)
    .where(and(eq(tables.clients.id, id), eq(tables.clients.userId, userId)))
    .returning()

  if (!client) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Client not found',
    })
  }

  return { message: 'Client deleted successfully' }
})
