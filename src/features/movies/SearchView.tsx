import React from 'react'
import { tmdb } from './client'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import MovieGrid from '@/components/movie/MovieGrid'
import SearchBar from '@/components/common/SearchBar'
import { useInfinite } from '@/hooks/useInfinite'
import IntersectionSentinel from '@/components/common/IntersectionSentinel'

export default function SearchView() {
  const [q, setQ] = React.useState('')
  const debounced = useDebouncedValue(q, 450)
  const search = useInfinite((page, signal) => debounced ? tmdb.search(debounced, page, signal) : Promise.resolve({ results: [], page:1, total_pages:1 }))
  React.useEffect(() => { search.reset() }, [debounced])
  return (
    <section>
      <h1 className="text-xl font-bold mb-2">Search</h1>
      <SearchBar value={q} onChange={setQ} />
      <div className="mt-4"><MovieGrid items={search.items} /></div>
      {debounced && <IntersectionSentinel onIntersect={search.loadMore} />}
    </section>
  )
}
