import React from 'react'
import MovieCard from './MovieCard'
import type { MovieSummary } from '@/features/movies/client'
export default function MovieGrid({items=[] as MovieSummary[]}){if(!items?.length)return<p className="text-muted">No movies.</p>;return<div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4">{items.map(m=><MovieCard key={m.id} movie={m}/> )}</div>}
