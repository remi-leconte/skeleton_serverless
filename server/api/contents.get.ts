import { db } from '../utils/db'
import { contents } from '../database/schema'

export default defineEventHandler(async () => {
  const allContents = await db.select().from(contents)
  
  return allContents.reduce((acc, item) => {
    acc[item.key] = item.value
    return acc
  }, {} as Record<string, string>)
})