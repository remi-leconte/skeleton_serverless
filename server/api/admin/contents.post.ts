import { db } from '../../utils/db'
import { contents } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { key, value } = body

  if (!key || !value) {
    throw createError({ statusCode: 400, message: 'Clé et valeur requises' })
  }

  // Insertion ou mise à jour automatique dans la base Neon
  const [result] = await db
    .insert(contents)
    .values({ key, value, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: contents.key,
      set: { value, updatedAt: new Date() },
    })
    .returning()

  return { success: true, content: result }
})