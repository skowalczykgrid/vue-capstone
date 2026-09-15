<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '../composables/useApi'
import type { Character } from '../types'
import FavouriteButton from '../components/FavouriteButton.vue'

const route = useRoute()
const { data: character, loading, error, load } = useApi<Character>()
const episode = useApi<{ name: string }>()

async function fetchCharacter() {
  episode.data.value = null
  episode.error.value = ''
  await load(`character/${encodeURIComponent(String(route.params.id))}`)
  const first = character.value?.episode[0]?.split('/').pop()
  if (first) await episode.load(`episode/${first}`)
}

watch(() => route.params.id, fetchCharacter, { immediate: true })
</script>

<template>
  <p v-if="loading" role="status">Loading...</p>
  <div v-else-if="error" role="alert">
    <p>{{ error }}</p>
    <button @click="fetchCharacter">Try again</button>
  </div>
  <article v-else-if="character" class="detail">
    <div class="card-body">
      <h1>{{ character.name }}</h1>
      <p>{{ character.species }} - {{ character.status }}</p>
      <p>Last known location: {{ character.location.name }}</p>
      <p>First seen in: {{ episode.data.value?.name || (episode.loading.value ? 'Loading...' : 'Unknown') }}</p>
      <p v-if="episode.error.value" role="alert">{{ episode.error.value }} <button @click="fetchCharacter">Try again</button></p>
      <FavouriteButton :character="character" />
    </div>
    <img :src="character.image" :alt="character.name" width="300" height="300">
  </article>
</template>
