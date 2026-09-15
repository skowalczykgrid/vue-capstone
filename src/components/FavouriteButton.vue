<script setup lang="ts">
import type { Character } from '../types'
import { useFavouritesStore } from '../stores/favourites'

defineProps<{ character: Character }>()
const favourites = useFavouritesStore()
</script>

<template>
  <button class="primary" :aria-pressed="favourites.contains(character.id)" @click="favourites.toggle(character)">
    {{ favourites.contains(character.id) ? 'Remove from Favourites' : 'Add to Favourites' }}
  </button>
</template>
