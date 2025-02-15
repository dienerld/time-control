import type { Config } from 'drizzle-kit'
import { resolve } from 'node:path'

export default {
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: resolve(__dirname, '../database.sqlite'),
  },
} satisfies Config
