import React, { createContext, useContext, useMemo, useReducer } from 'react'
type User = { id: string; email?: string; name?: string; provider: 'email'|'google'|'facebook'|'apple' }
type State = { user: User | null }
type Action = { type: 'LOGIN'; user: User } | { type: 'LOGOUT' }
const KEY='app:user', SESSION='app:session'
const initial: State = { user: JSON.parse(localStorage.getItem(KEY) || 'null') }
function reducer(state:State, action:Action): State {
  if(action.type==='LOGIN'){ localStorage.setItem(KEY, JSON.stringify(action.user)); localStorage.setItem(SESSION, JSON.stringify({userId:action.user.id, token:crypto.randomUUID()})); return { user: action.user } }
  if(action.type==='LOGOUT'){ localStorage.removeItem(SESSION); localStorage.removeItem(KEY); return { user: null } }
  return state
}
const Ctx = createContext<{ user: User | null; login:(u:User)=>void; logout:()=>void }|null>(null)
export function AuthProvider({children}:{children:React.ReactNode}){
  const [state, dispatch] = useReducer(reducer, initial)
  const value = useMemo(()=>({ user:state.user, login:(u:User)=>dispatch({type:'LOGIN', user:u}), logout:()=>dispatch({type:'LOGOUT'}) }),[state.user])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export function useAuth(){ const c=useContext(Ctx); if(!c) throw new Error('useAuth must be used within AuthProvider'); return c }
