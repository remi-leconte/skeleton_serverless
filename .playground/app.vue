<script setup lang="ts">
const { user, loggedIn, clear } = useUserSession()
</script>

<template>
  <div style="padding: 2rem; font-family: sans-serif;">
    <h1>Statut de Session</h1>

    <div v-if="loggedIn">
      <p>Connecté en tant que : <strong>{{ user?.email }}</strong></p>
      <button @click="clear()">Se déconnecter</button>
    </div>

    <div v-else>
      <p>Non connecté.</p>
    </div>
  </div>
</template>