import React, { createContext, useContext, useMemo, useReducer } from 'react'
import type { MovieSummary } from '@/features/movies/client'
type State = Record<number, MovieSummary>
type Action = { type:'ADD'; movie:MovieSummary } | { type:'REMOVE'; id:number }
const KEY='app:favorites'
const initial: State = JSON.parse(localStorage.getItem(KEY) || '{}')
function reducer(state: State, action: Action): State {
  if(action.type==='ADD'){const next={...state,[action.movie.id]:action.movie}; localStorage.setItem(KEY, JSON.stringify(next)); return next}
  if(action.type==='REMOVE'){const{[action.id]:_,...rest}=state; localStorage.setItem(KEY, JSON.stringify(rest)); return rest}
  return state
}
const Ctx=createContext<{items:State;add:(m:MovieSummary)=>void;remove:(id:number)=>void}|null>(null)
export function FavoritesProvider({children}:{children:React.ReactNode}){ const [state,dispatch]=useReducer(reducer, initial); const value=useMemo(()=>({items:state,add:(m:MovieSummary)=>dispatch({type:'ADD',movie:m}),remove:(id:number)=>dispatch({type:'REMOVE',id})}),[state]); return<Ctx.Provider value={value}>{children}</Ctx.Provider> }
export function useFavorites(){const c=useContext(Ctx); if(!c) throw new Error('useFavorites must be used within FavoritesProvider'); return c}
