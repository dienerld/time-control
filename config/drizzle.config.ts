import process from 'node:process'
import { defineConfig } from 'drizzle-kit'

const dbCredentials: {
  url: string
  authToken?: string
} = {
  url: process.env.TURSO_DB_URL!,
  authToken: undefined,
}

if (process.env.TURSO_DB_TOKEN) {
  dbCredentials.authToken = process.env.TURSO_DB_TOKEN!
}

export default defineConfig({
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dialect: 'turso',
  dbCredentials,
})
