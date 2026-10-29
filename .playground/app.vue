<script setup lang="ts">
const { user, loggedIn, clear, fetch: fetchSession } = useUserSession()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function handleLogin() {
  try {
    errorMessage.value = ''
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })
    // Rafraîchir la session Nuxt Auth Utils après la connexion
    await fetchSession()
  } catch (err: any) {
    errorMessage.value = err.data?.message || 'Erreur lors de la connexion'
  }
}
</script>

<template>
  <div style="padding: 3rem; font-family: sans-serif; max-width: 400px; margin: auto;">
    <h1>Administration CMS</h1>

    <!-- Si l'utilisateur est connecté -->
    <div v-if="loggedIn">
      <div style="background: #e6f4ea; padding: 1rem; border-radius: 4px; margin-bottom: 1rem;">
        <p>Connecté en tant que : <strong>{{ user?.email }}</strong></p>
      </div>
      <button @click="clear()" style="padding: 0.5rem 1rem; background: #d93025; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Se déconnecter
      </button>
    </div>

    <!-- Si l'utilisateur n'est pas connecté -->
    <div v-else>
      <form @submit.prevent="handleLogin" style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <label style="display: block; margin-bottom: 0.5rem;">Email :</label>
          <input v-model="email" type="email" required style="width: 100%; padding: 0.5rem; box-sizing: border-box;" />
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.5rem;">Mot de passe :</label>
          <input v-model="password" type="password" required style="width: 100%; padding: 0.5rem; box-sizing: border-box;" />
        </div>

        <p v-if="errorMessage" style="color: red; margin: 0;">{{ errorMessage }}</p>

        <button type="submit" style="padding: 0.75rem; background: #1a73e8; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>