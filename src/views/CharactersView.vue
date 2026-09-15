<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '../composables/useApi'
import type { CharacterPage } from '../types'
import CharacterCard from '../components/CharacterCard.vue'

const route = useRoute()
const router = useRouter()
const name = ref('')
const species = computed(() => String(route.query.species || ''))
const page = computed(() => Math.max(1, Math.floor(Number(route.query.page) || 1)))
const { data, loading, error, load } = useApi<CharacterPage>()

function update(values: Record<string, string | number>) {
  router.push({ query: { ...route.query, ...values } })
}

function fetchCharacters() {
  name.value = String(route.query.name || '')
  const params = new URLSearchParams({ name: name.value, species: species.value, page: String(page.value) })
  load(`character/?${params}`)
}

watch(() => route.query, fetchCharacters, { immediate: true })
</script>

<template>
  <section class="filters" aria-label="Character filters">
    <div class="species">
      <button v-for="option in ['', 'Human', 'Animal', 'Alien']" :key="option"
        :class="{ selected: species === option }" :aria-pressed="species === option"
        @click="update({ species: option, page: 1 })">{{ option || 'All' }}</button>
    </div>
    <form @submit.prevent="update({ name: name.trim(), page: 1 })">
      <input v-model="name" aria-label="Search by name" placeholder="Search by name...">
      <button>Search</button>
    </form>
  </section>
  <p v-if="loading" role="status">Loading...</p>
  <div v-else-if="error" role="alert">
    <p>{{ error }}</p>
    <button @click="fetchCharacters">Try again</button>
  </div>
  <template v-else-if="data">
    <div class="cards">
      <CharacterCard v-for="character in data.results" :key="character.id" :character="character" />
    </div>
    <nav class="pagination" aria-label="Pagination">
      <span>Page {{ page }} of {{ data.info.pages }}</span>
      <button :disabled="page <= 1" @click="update({ page: page - 1 })">&lt;&lt; Prev</button>
      <button :disabled="page >= data.info.pages" @click="update({ page: page + 1 })">Next &gt;&gt;</button>
    </nav>
  </template>
</template>
