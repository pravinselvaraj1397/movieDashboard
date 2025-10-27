# React TS TMDB + Tailwind (pnpm)

## Create & run with pnpm
```bash
pnpm i
cp .env.example .env   # set VITE_TMDB_API_KEY
pnpm dev
```

## Features
- Register/Login (email + mock social), saved to LocalStorage
- Session persisted (localStorage)
- Popular listing with infinite scroll
- Search with debounce + infinite scroll
- **Discover** page with **Genre / Year / Sort** filters (TMDB `/discover/movie`)
- Details page with meta, cast, trailer, and similar movies
- Favourites add/remove (persisted)
- Dark/Light mode toggle
- **i18n** (EN/ID) with a one-click toggle
- **Responsive images** via `srcSet/sizes`
- Tests (Vitest + RTL)

## TMDB API (best practices)
- `/movie/{popular|now_playing|upcoming|top_rated}?page=n`
- `/search/movie?query=...&page=n&include_adult=false`
- `/movie/:id?append_to_response=credits,videos,similar`
- `/discover/movie?with_genres=...&primary_release_year=...&sort_by=...`
- Images: `https://image.tmdb.org/t/p/{w342|w500|original}/{path}`
- Uses 429 `Retry-After` handling and in-memory URL cache.

## Optional Firebase
Set `VITE_USE_FIREBASE=true` and fill Firebase vars to enable `services/firebase.ts` helpers (Google Sign-In demo).
