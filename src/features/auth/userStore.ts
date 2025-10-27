export type StoredUser = { id: string; provider: 'email'|'google'|'facebook'|'apple'; email?: string; password?: string; name?: string }
const KEY='app:users'
function getUsers(): StoredUser[] { try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] } }
function save(list: StoredUser[]) { localStorage.setItem(KEY, JSON.stringify(list)) }
export function registerEmail({ email, password, name }:{ email:string; password:string; name?:string }){
  const u=getUsers(); if(u.some(x=>x.provider==='email'&&x.email===email)) throw new Error('Email already registered.')
  const user:StoredUser={ id:crypto.randomUUID(), provider:'email', email, password, name }; u.push(user); save(u); return user
}
export function registerSocial({ provider, name }:{ provider:'google'|'facebook'|'apple'; name?:string }){
  const u=getUsers(); if(u.some(x=>x.provider===provider)) throw new Error(`${provider} already registered on this device.`)
  const user:StoredUser={ id:crypto.randomUUID(), provider, name:name||`User (${provider})` }; u.push(user); save(u); return user
}
export function findEmail({ email, password }:{ email:string; password:string }){ return getUsers().find(u=>u.provider==='email'&&u.email===email&&u.password===password)||null }
export function findSocial(provider:StoredUser['provider']){ return getUsers().find(u=>u.provider===provider)||null }
