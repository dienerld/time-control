export default defineEventHandler(async (event) => {
  const { userId } = await validateAuth(event)
  const db = useDatabase()

  const clients = await db.query.clients.findMany({
    where: t => eq(t.userId, userId),
  })

  return clients
})
