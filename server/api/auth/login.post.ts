import { eq } from 'drizzle-orm'
import { users } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email et mot de passe requis.',
    })
  }

  const [user] = await db.select().from(users).where(eq(users.email, email))

  if (!user || !(await verifyPassword(user.password, password))) {
    throw createError({
      statusCode: 401,
      message: 'Identifiants invalides.',
    })
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
    },
  })

  return { success: true }
})