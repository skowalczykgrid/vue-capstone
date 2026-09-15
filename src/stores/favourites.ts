import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Character } from '../types'

export const useFavouritesStore = defineStore('favourites', () => {
  const characters = ref<Character[]>([])
  const storageError = ref('')

  try {
    const saved = JSON.parse(localStorage.getItem('favourites') || '[]')
    if (Array.isArray(saved)) {
      characters.value = saved.filter((item) => item && Number.isInteger(item.id)
        && ['name', 'image', 'species', 'status'].every((key) => typeof item[key] === 'string'))
    }
  } catch {
    storageError.value = 'Could not read saved favourites.'
  }

  function contains(id: number) {
    return characters.value.some((character) => character.id === id)
  }

  function toggle(character: Character) {
    characters.value = contains(character.id)
      ? characters.value.filter((item) => item.id !== character.id)
      : [...characters.value, character]
  }

  watch(characters, (value) => {
    try {
      localStorage.setItem('favourites', JSON.stringify(value))
      storageError.value = ''
    } catch {
      storageError.value = 'Could not save favourites in this browser.'
    }
  }, { deep: true })

  return { characters, contains, toggle, storageError }
})
