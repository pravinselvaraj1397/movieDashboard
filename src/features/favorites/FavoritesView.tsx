import React from 'react'
import { useFavorites } from './FavoritesContext'
import MovieGrid from '@/components/movie/MovieGrid'
export default function FavoritesView(){const{items}=useFavorites();const list=Object.values(items);return(<><h1 className="text-xl font-bold mb-2">Favourites</h1><MovieGrid items={list}/></>)}
