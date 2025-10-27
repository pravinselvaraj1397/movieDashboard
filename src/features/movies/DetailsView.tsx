import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { tmdb } from './client'
import { useCancelable } from '@/hooks/useCancelable'
import MovieGrid from '@/components/movie/MovieGrid'
import { useFavorites } from '@/features/favorites/FavoritesContext'
import Button from '@/components/common/Button'
import { useTranslation } from 'react-i18next'

function YouTube({ videoKey }: { videoKey?: string }) {
  const { t } = useTranslation()
  if (!videoKey) return null
  const src = `https://www.youtube.com/embed/${videoKey}`
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">{t('trailer')}</h2>
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl">
        <iframe title="Trailer" src={src} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="absolute inset-0 w-full h-full border-0" />
      </div>
    </div>
  )
}

export default function DetailsView() {
  const { id } = useParams()
  const { data, loading } = useCancelable((s)=> tmdb.details(id!, s), [id])
  const { add, remove, items } = useFavorites()
  const { t } = useTranslation()
  const isFav = !!items[Number(id)]
  const poster = tmdb.img(data?.poster_path, 'w500')

  const cast = useMemo(()=> (data?.credits?.cast || []).slice(0,12), [data])
  const trailerKey = useMemo(()=> {
    const vids = data?.videos?.results || []
    const t = vids.find((v:any) => v.site === 'YouTube' && v.type === 'Trailer') || vids.find((v:any) => v.site === 'YouTube')
    return t?.key as string | undefined
  }, [data])

  if (loading) return <p>Loading...</p>
  if (!data) return <p>Not found.</p>

  const metaLeft = [
    ['Year', (data.release_date||'').slice(0,4)],
    ['Runtime', `${data.runtime} min`],
    ['Genres', data.genres?.map((g:any)=>g.name).join(', ')],
    ['Rating', (data.vote_average ?? 0).toFixed(1)],
  ]
  const metaRight = [
    ['Spoken', (data.spoken_languages||[]).map((l:any)=>l.english_name).join(', ')],
    ['Companies', (data.production_companies||[]).map((c:any)=>c.name).join(', ')],
    ['Countries', (data.production_countries||[]).map((c:any)=>c.name).join(', ')],
  ]

  return (
    <article className="grid gap-4">
      <div className="grid grid-cols-[180px,1fr] gap-4 max-[700px]:grid-cols-1">
        {poster ? <img src={poster} alt={data.title} className="w-[180px] aspect-[2/3] object-cover rounded-xl border border-zinc-800" /> : <div className="w-[180px] aspect-[2/3] bg-zinc-800 animate-pulse rounded-xl" />}
        <div>
          <h1 className="text-2xl font-extrabold">{data.title} <small className="text-muted font-normal">({(data.release_date||'').slice(0,4)})</small></h1>
          <p className="text-muted">{data.tagline}</p>
          <p className="mt-2">{data.overview}</p>
          <div className="mt-3 flex gap-2">
            {!isFav ? <Button onClick={()=>add({ id: data.id, title: data.title, poster_path: data.poster_path, vote_average: data.vote_average, release_date: data.release_date })}>{t('add_fav')}</Button>
                     : <Button onClick={()=>remove(data.id)} className="btn-ghost">{t('remove_fav')}</Button>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
        <dl className="card p-4">{metaLeft.map(([k,v]) => (<div className="flex justify-between py-1" key={k}><dt className="text-muted">{k}</dt><dd>{v || '-'}</dd></div>))}</dl>
        <dl className="card p-4">{metaRight.map(([k,v]) => (<div className="flex justify-between py-1" key={k}><dt className="text-muted">{k}</dt><dd>{v || '-'}</dd></div>))}</dl>
      </div>

      <div>
        <h2 className="text-xl font-bold my-2">{t('cast')}</h2>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
          {cast.map((c:any) => (
            <li key={c.cast_id || (c.credit_id || c.id)} className="card">
              {c.profile_path ? <img className="w-full aspect-[2/3] object-cover" src={tmdb.img(c.profile_path)} alt={c.name} /> : <div className="w-full aspect-[2/3] bg-zinc-800 animate-pulse" />}
              <div className="p-3">
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-muted">{c.character}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <YouTube videoKey={trailerKey} />

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">{t('similar')}</h2>
        <MovieGrid items={data.similar?.results || []} />
      </div>
    </article>
  )
}
