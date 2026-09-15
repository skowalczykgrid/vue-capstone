export interface Character {
  id: number
  name: string
  image: string
  species: string
  status: string
  location: { name: string }
  episode: string[]
}

export interface CharacterPage {
  info: { pages: number }
  results: Character[]
}
