<script setup lang="ts">
import { useFavouritesStore } from '../stores/favourites'
import CharacterCard from '../components/CharacterCard.vue'

const favourites = useFavouritesStore()
</script>

<template>
  <div v-if="favourites.characters.length" class="cards">
    <CharacterCard v-for="character in favourites.characters" :key="character.id" :character="character" />
  </div>
  <p v-else>no cards</p>
</template>
