import React from 'react'
import { tmdb } from './client'
import MovieGrid from '@/components/movie/MovieGrid'
import { useInfinite } from '@/hooks/useInfinite'
import IntersectionSentinel from '@/components/common/IntersectionSentinel'
import { useTranslation } from 'react-i18next'

export default function HomeView() {
  const { t } = useTranslation()
  const popular = useInfinite((page, s) => tmdb.list('popular', page, s))
  const hero = (popular.items || [])[0] as any
  return (
    <>
      {hero && (
        <section className="card relative overflow-hidden">
          <img src={tmdb.img(hero.backdrop_path || hero.poster_path, 'w500') || ''} alt={hero.title} className="w-full h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
          <div className="absolute left-4 right-4 bottom-4 grid gap-1">
            <h1 className="text-2xl font-extrabold">{hero.title}</h1>
            <div className="text-muted">{(hero.release_date||'').slice(0,4)} • ⭐ {(hero.vote_average ?? 0).toFixed(1)}</div>
          </div>
        </section>
      )}
      <section className="mt-6">
        <h2 className="text-xl font-bold mb-2">{t('popular')}</h2>
        <MovieGrid items={popular.items} />
        <IntersectionSentinel onIntersect={popular.loadMore} />
      </section>
    </>
  )
}
