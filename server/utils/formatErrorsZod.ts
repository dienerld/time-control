import type { ZodError } from 'zod'

export function formatErrorsZod(error: ZodError) {
  const formattedErrors = error.format()
  const keys = Object.keys(formattedErrors)
  const errors: { [key: string]: string } = {}
  for (const key of keys) {
    if (key === '_errors') {
      continue
    }

    const error = formattedErrors[key as keyof typeof formattedErrors] as unknown as { _errors: string[] }
    errors[key] = error._errors.join(', ')
  }

  return errors
}
