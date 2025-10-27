import React from 'react'
import type { Genre } from '@/features/movies/client'

export default function FilterBar({ genres, selectedGenres, onToggleGenre, year, onYear, sort, onSort }:{genres:Genre[];selectedGenres:number[];onToggleGenre:(id:number)=>void;year:string;onYear:(y:string)=>void;sort:string;onSort:(s:string)=>void}){
  const years = Array.from({length:60}).map((_,i)=> String(new Date().getFullYear()-i))
  return (<div className="card p-3 grid gap-2">
    <div className="flex gap-2 flex-wrap items-center">
      <span className="text-sm text-muted">Genre</span>
      <div className="flex gap-2 flex-wrap">
        {genres.map(g=>(<button key={g.id} onClick={()=>onToggleGenre(g.id)} className={`px-2 py-1 rounded-lg border ${selectedGenres.includes(g.id)?'border-blue-400 bg-blue-500/20':'border-zinc-700'} text-sm`}>{g.name}</button>))}
      </div>
    </div>
    <div className="flex gap-3 flex-wrap items-center">
      <label className="text-sm text-muted">Year
        <select value={year} onChange={e=>onYear(e.target.value)} className="ml-2 bg-transparent border border-zinc-700 rounded-lg px-2 py-1">
          <option value="">Any</option>{years.map(y=><option key={y} value={y}>{y}</option>)}
        </select>
      </label>
      <label className="text-sm text-muted">Sort
        <select value={sort} onChange={e=>onSort(e.target.value)} className="ml-2 bg-transparent border border-zinc-700 rounded-lg px-2 py-1">
          <option value="popularity.desc">Popularity</option>
          <option value="vote_average.desc">Rating</option>
          <option value="primary_release_date.desc">Release Date</option>
        </select>
      </label>
    </div>
  </div>)
}
