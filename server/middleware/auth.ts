export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/api/admin')) {
    const session = await getUserSession(event)

    if (!session.user) {
      throw createError({
        statusCode: 401,
        message: 'Accès non autorisé. Veuillez vous connecter.',
      })
    }
  }
})