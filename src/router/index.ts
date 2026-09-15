import { createRouter, createWebHashHistory } from 'vue-router'
import CharactersView from '../views/CharactersView.vue'
import CharacterView from '../views/CharacterView.vue'
import FavouritesView from '../views/FavouritesView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: CharactersView },
    { path: '/character/:id', component: CharacterView },
    { path: '/favourites', component: FavouritesView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
