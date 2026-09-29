const RAWG_BASE = 'https://api.rawg.io/api'
const KEY_SESSION = 'gamehive.rawg.key'

export function getRawgKey() {
  return sessionStorage.getItem(KEY_SESSION) || import.meta.env.VITE_RAWG_API_KEY || ''
}

export function setRawgKey(key) {
  const trimmed = key.trim()
  if (trimmed) sessionStorage.setItem(KEY_SESSION, trimmed)
  else sessionStorage.removeItem(KEY_SESSION)
}

function normalizeGame(game) {
  return {
    id: `rawg-${game.id}`,
    rawgId: game.id,
    slug: game.slug,
    name: game.name,
    tagline: 'Datos consultados desde RAWG',
    description: game.description_raw || game.description || 'RAWG no devolvió una descripción para este título.',
    genres: (game.genres || []).map((item) => item.name),
    platforms: (game.platforms || []).map((item) => item.platform?.name).filter(Boolean),
    released: game.released,
    developer: game.developers?.map((item) => item.name).join(', ') || 'No disponible',
    publisher: game.publishers?.map((item) => item.name).join(', ') || 'No disponible',
    rating: Number(game.rating || 0),
    communityScore: Number(((game.rating || 0) * 2).toFixed(1)),
    criticScore: game.metacritic || null,
    reviewsCount: game.ratings_count || 0,
    popularity: Math.min(100, Math.round(Math.log10((game.added || 1) + 1) * 25)),
    accent: '#6d5dfc',
    cover: 'rawg',
    image: game.background_image,
    featured: false,
    source: 'RAWG'
  }
}

async function rawgFetch(path, params = {}) {
  const key = getRawgKey()
  if (!key) throw new Error('RAWG_KEY_MISSING')
  const url = new URL(`${RAWG_BASE}${path}`)
  url.searchParams.set('key', key)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v))
  })
  const response = await fetch(url)
  if (!response.ok) throw new Error(`RAWG_HTTP_${response.status}`)
  return response.json()
}

export async function searchRawgGames(query, options = {}) {
  const data = await rawgFetch('/games', {
    search: query,
    page_size: options.pageSize || 12,
    ordering: options.ordering || '-added',
    genres: options.genre,
    platforms: options.platform,
    dates: options.dates,
  })
  return { count: data.count, games: data.results.map(normalizeGame) }
}

export async function getRawgGame(id) {
  const data = await rawgFetch(`/games/${id}`)
  return normalizeGame(data)
}
