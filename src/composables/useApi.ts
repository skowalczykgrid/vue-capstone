import { onScopeDispose, ref, shallowRef } from 'vue'

export function useApi<T>() {
  const data = shallowRef<T | null>(null)
  const loading = ref(false)
  const error = ref('')
  let controller: AbortController | undefined

  async function load(path: string) {
    controller?.abort()
    const request = new AbortController()
    controller = request
    loading.value = true
    error.value = ''
    data.value = null
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/${path}`, { signal: request.signal })
      if (!response.ok) throw new Error(response.status === 404 ? 'No results found.' : 'Could not load data. Please try again.')
      const result = await response.json()
      if (!request.signal.aborted) data.value = result
    } catch (cause) {
      if (!request.signal.aborted) error.value = cause instanceof Error ? cause.message : 'Could not load data.'
    } finally {
      if (!request.signal.aborted) loading.value = false
    }
  }

  onScopeDispose(() => controller?.abort())
  return { data, loading, error, load }
}
