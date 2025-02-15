export default defineEventHandler(async () => {
  const db = useDatabase()

  return db.select(getTableColumns(tables.rooms)).from(tables.rooms)
})
