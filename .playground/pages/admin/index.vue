<script setup>
const { user, loggedIn, fetch: refreshSession } = useUserSession()

const contents = ref({})
const newKey = ref('')
const newValue = ref('')
const loading = ref(false)
const message = ref('')

const fetchContents = async () => {
  try {
    contents.value = await $fetch('/api/contents')
  } catch (e) {
    console.error('Erreur lors du chargement des contenus', e)
  }
}

onMounted(() => {
  fetchContents()
})

const saveContent = async (key, value) => {
  if (!key || !value) return
  loading.value = true
  message.value = ''
  try {
    await $fetch('/api/admin/contents', {
      method: 'POST',
      body: { key, value },
    })
    message.value = 'Enregistré avec succès !'
    await fetchContents()
    newKey.value = ''
    newValue.value = ''
  } catch (e) {
    message.value = 'Erreur lors de l\'enregistrement'
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div style="padding: 2rem; font-family: sans-serif; max-width: 800px; margin: auto;">
    <h1>Administration CMS</h1>

    <div style="background: #e8f5e9; padding: 1rem; margin-bottom: 1.5rem; border-radius: 6px;">
      <p>Connecté en tant que : <strong>{{ user?.email }}</strong></p>
    </div>

    <!-- Formulaire d'ajout / modification -->
    <div style="background: #f9f9f9; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; border: 1px solid #ddd;">
      <h3>Ajouter / Modifier un contenu</h3>
      <div style="display: flex; gap: 1rem; margin-top: 1rem;">
        <input v-model="newKey" placeholder="Clé (ex: hero_title)" style="flex: 1; padding: 0.5rem;" />
        <input v-model="newValue" placeholder="Valeur textuelle" style="flex: 2; padding: 0.5rem;" />
        <button @click="saveContent(newKey, newValue)" :disabled="loading" style="padding: 0.5rem 1rem; cursor: pointer;">
          {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
        </button>
      </div>
      <p v-if="message" style="color: green; margin-top: 0.5rem;">{{ message }}</p>
    </div>

    <!-- Tableau des contenus existants -->
    <h3>Contenus dynamiques en base</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
      <thead>
        <tr style="background: #eee; text-align: left;">
          <th style="padding: 0.75rem; border: 1px solid #ddd;">Clé</th>
          <th style="padding: 0.75rem; border: 1px solid #ddd;">Valeur</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(val, key) in contents" :key="key">
          <td style="padding: 0.75rem; border: 1px solid #ddd;"><code>{{ key }}</code></td>
          <td style="padding: 0.75rem; border: 1px solid #ddd;">{{ val }}</td>
        </tr>
        <tr v-if="Object.keys(contents).length === 0">
          <td colspan="2" style="padding: 1rem; text-align: center; color: #777;">Aucun contenu pour le moment.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>