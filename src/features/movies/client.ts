export type Paginated<T> = { page: number; total_pages: number; total_results: number; results: T[] }
export type MovieSummary = { id: number; title: string; poster_path: string | null; vote_average: number; release_date?: string }
export type MovieDetails = MovieSummary & {
  overview: string; runtime: number; genres: {id:number;name:string}[]; spoken_languages: {english_name:string}[];
  production_companies: {name:string}[]; production_countries: {name:string}[];
  videos?: { results: Array<{ key: string; site: string; type: string }> };
  credits?: { cast: Array<{ id:number; cast_id?:number; credit_id?:string; name:string; character:string; profile_path:string|null }> };
  similar?: Paginated<MovieSummary>
}
export type Genre = { id:number; name:string }
type Params = Record<string, string | number | boolean | undefined>
const API = import.meta.env.VITE_TMDB_API_BASE as string
const KEY = import.meta.env.VITE_TMDB_API_KEY as string
const cache = new Map<string, any>()
function withKey(u: URL, params?: Params) { u.searchParams.set('api_key', KEY); u.searchParams.set('language','en-US'); if(params)for(const[k,v]of Object.entries(params)) if(v!==undefined&&v!==null)u.searchParams.set(k,String(v)); return u }
async function get<T>(path:string, params?:Params, signal?:AbortSignal): Promise<T> {
  const url = withKey(new URL(`${API}/${path}`), params).toString()
  if (cache.has(url)) return cache.get(url) as T
  const res = await fetch(url, { signal })
  if (res.status === 429) { const ra = Number(res.headers.get('Retry-After') || 1); await new Promise(r=>setTimeout(r, ra*1000)); return get<T>(path, params, signal) }
  if (!res.ok) { const text = await res.text().catch(()=> ''); throw new Error(`TMDB ${res.status}: ${text}`) }
  const data = await res.json(); cache.set(url, data); return data as T
}
export const tmdb = {
  list: (kind:'popular'|'now_playing'|'upcoming'|'top_rated', page=1, s?:AbortSignal) => get<Paginated<MovieSummary>>(`movie/${kind}`, {page, include_adult:false}, s),
  search: (q:string, page=1, s?:AbortSignal) => get<Paginated<MovieSummary>>('search/movie', {query:q, page, include_adult:false}, s),
  details: (id:string, s?:AbortSignal) => get<MovieDetails>(`movie/${id}`, { append_to_response:'credits,videos,similar' }, s),
  discover: (params:Params={}, page=1, s?:AbortSignal) => get<Paginated<MovieSummary>>('discover/movie', {include_adult:false, page, ...params}, s),
  genres: (s?:AbortSignal) => get<{genres: Genre[]}>('genre/movie/list', {}, s),
  img: (path:string|null, size:'w154'|'w185'|'w342'|'w500'|'original'='w342') => path ? `${import.meta.env.VITE_TMDB_IMG_BASE}/${size}${path}` : ''
}
