export default defineEventHandler(async (event) => {
  const db = useDatabase()
  const { expiresAt } = await readBody(event)

  const [room] = await db
    .insert(tables.rooms)
    .values({ expireAt: expiresAt })
    .returning({
      id: tables.rooms.id,
      expireAt: tables.rooms.expireAt,
    })

  return {
    status: 201,
    body: room,
  }
})
