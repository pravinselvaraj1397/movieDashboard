import React from 'react'
import { Link } from 'react-router-dom'
import { tmdb } from '@/features/movies/client'
import type { MovieSummary } from '@/features/movies/client'

export default function MovieCard({ movie }: { movie: MovieSummary }) {
  const poster = tmdb.img(movie.poster_path, 'w342')
  const srcSet = [tmdb.img(movie.poster_path, 'w185')+' 185w', tmdb.img(movie.poster_path, 'w342')+' 342w', tmdb.img(movie.poster_path, 'w500')+' 500w'].join(', ')
  const sizes = '(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 170px'
  return (
    <article className="card relative transition hover:-translate-y-0.5 hover:border-zinc-700">
      {poster ? <img src={poster} srcSet={srcSet} sizes={sizes} alt={movie.title} className="w-full aspect-[2/3] object-cover" loading="lazy" /> : <div className="w-full aspect-[2/3] bg-zinc-800 animate-pulse" />}
      <span className="badge">⭐ {(movie.vote_average ?? 0).toFixed(1)}</span>
      <div className="p-3">
        <h3 className="font-semibold leading-tight"><Link to={`/movie/${movie.id}`}>{movie.title}</Link></h3>
        <div className="text-sm text-muted">{(movie.release_date||'').slice(0,4)}</div>
      </div>
    </article>
  )
}
