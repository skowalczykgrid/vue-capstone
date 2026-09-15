<script setup lang="ts">
import { useFavouritesStore } from './stores/favourites'
import './style.css'

const favourites = useFavouritesStore()
</script>

<template>
  <header>
    <nav class="container">
      <RouterLink to="/">Characters</RouterLink>
      <RouterLink to="/favourites">Favourites</RouterLink>
      <span class="counter" aria-label="Favourite characters">♡ {{ favourites.characters.length }}</span>
    </nav>
  </header>
  <main class="container">
    <p v-if="favourites.storageError" role="alert">{{ favourites.storageError }}</p>
    <RouterView />
  </main>
</template>
