export default defineEventHandler(async (event) => {
  const { userId } = await validateAuth(event)

  const db = useDatabase()

  const user = db.query.users.findFirst({ where: t => eq(t.id, userId) })

  if (!user) {
    return sendError(event, {
      fatal: false,
      message: 'User not found',
      name: 'NotFound',
      statusCode: 404,
    })
  }

  return user
})
