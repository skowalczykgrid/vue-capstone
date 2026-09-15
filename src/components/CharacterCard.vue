<script setup lang="ts">
import type { Character } from '../types'
import FavouriteButton from './FavouriteButton.vue'

defineProps<{ character: Character }>()
</script>

<template>
  <article class="card">
    <RouterLink :to="`/character/${character.id}`">
      <img :src="character.image" :alt="character.name" loading="lazy" width="300" height="300">
    </RouterLink>
    <div class="card-body">
      <h2><RouterLink :to="`/character/${character.id}`">{{ character.name }}</RouterLink></h2>
      <p>{{ character.species }} - {{ character.status }}</p>
      <FavouriteButton :character="character" />
    </div>
  </article>
</template>
