import React from 'react'
import { tmdb } from './client'
import MovieGrid from '@/components/movie/MovieGrid'
import FilterBar from '@/components/filters/FilterBar'
import { useInfinite } from '@/hooks/useInfinite'
import IntersectionSentinel from '@/components/common/IntersectionSentinel'

export default function DiscoverView(){
  const [genres, setGenres] = React.useState<{id:number;name:string}[]>([])
  const [selected, setSelected] = React.useState<number[]>([])
  const [year, setYear] = React.useState('')
  const [sort, setSort] = React.useState('popularity.desc')
  React.useEffect(()=>{const c=new AbortController();tmdb.genres(c.signal).then(d=>setGenres(d.genres));return()=>c.abort()},[])
  const fetcher = React.useCallback((page:number, s:AbortSignal)=>{const p:any={sort_by:sort}; if(selected.length)p.with_genres=selected.join(','); if(year)p.primary_release_year=year; return tmdb.discover(p, page, s)},[selected,year,sort])
  const list = useInfinite(fetcher)
  React.useEffect(()=>{list.reset()},[fetcher])
  const toggle = (id:number)=> setSelected(a=> a.includes(id)? a.filter(x=>x!==id): a.concat(id))
  return (<section className="grid gap-3">
    <FilterBar genres={genres} selectedGenres={selected} onToggleGenre={toggle} year={year} onYear={setYear} sort={sort} onSort={setSort}/>
    <MovieGrid items={list.items}/>
    <IntersectionSentinel onIntersect={list.loadMore}/>
  </section>)
}
