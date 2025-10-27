import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import TextField from '@/components/form/TextField'
import Button from '@/components/common/Button'
import { findEmail, findSocial } from './userStore'

export default function LoginView(){
  const { login } = useAuth()
  const [email,setEmail]=React.useState('')
  const [pass,setPass]=React.useState('')
  const [msg,setMsg]=React.useState('')
  const nav=useNavigate()
  const submit=(e:React.FormEvent)=>{ e.preventDefault(); const u=findEmail({email,password:pass}); if(!u){setMsg('No matching account. Please register first.'); return} login({id:u.id,email:u.email,name:u.name,provider:'email'}); nav('/') }
  const social=(p:'google'|'facebook'|'apple')=>{ const u=findSocial(p); if(!u){setMsg(`${p} not registered on this device. Go to Register.`); return} login({id:u.id,name:u.name,provider:p}); nav('/') }
  return (<form onSubmit={submit} className="max-w-md mx-auto grid gap-2">
    <h1 className="text-2xl font-extrabold mb-2">Sign in</h1>
    <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
    <TextField label="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)}/>
    <div className="flex gap-2 flex-wrap">
      <Button type="submit">Continue</Button>
      <Button type="button" className="btn-ghost" onClick={()=>social('google')}>Google</Button>
      <Button type="button" className="btn-ghost" onClick={()=>social('facebook')}>Facebook</Button>
      <Button type="button" className="btn-ghost" onClick={()=>social('apple')}>Apple</Button>
    </div>
    {msg?<p className="text-sm text-muted mt-2">{msg}</p>:null}
  </form>)
}
