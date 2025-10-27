import React from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@/components/form/TextField'
import Button from '@/components/common/Button'
import { registerEmail, registerSocial } from './userStore'

export default function RegisterView(){
  const [name,setName]=React.useState(''); const [email,setEmail]=React.useState(''); const [pass,setPass]=React.useState(''); const [msg,setMsg]=React.useState(''); const nav=useNavigate()
  const submit=(e:React.FormEvent)=>{ e.preventDefault(); try{ registerEmail({email,password:pass,name}); setMsg('Registered! You can login now.'); setTimeout(()=>nav('/login'),600)}catch(err:any){ setMsg(err.message||'Failed to register') } }
  const social=(p:'google'|'facebook'|'apple')=>{ try{ registerSocial({provider:p,name}); setMsg(`${p} registered! Proceed to login.`); setTimeout(()=>nav('/login'),600)}catch(err:any){ setMsg(err.message||'Failed to register') } }
  return (<section className="max-w-lg mx-auto grid gap-2">
    <h1 className="text-2xl font-extrabold mb-2">Create account</h1>
    <p className="text-sm text-muted">Registers are saved locally on this device (no backend).</p>
    <form onSubmit={submit} className="grid gap-1">
      <TextField label="Name (optional)" value={name} onChange={e=>setName(e.target.value)}/>
      <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <TextField label="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)}/>
      <div className="flex gap-2 mt-1"><Button type="submit">Register</Button></div>
    </form>
    <div className="flex gap-2 mt-3 flex-wrap">
      <Button className="btn-ghost" onClick={()=>social('google')}>Google</Button>
      <Button className="btn-ghost" onClick={()=>social('facebook')}>Facebook</Button>
      <Button className="btn-ghost" onClick={()=>social('apple')}>Apple</Button>
    </div>
    {msg?<p className="text-sm text-muted mt-2">{msg}</p>:null}
  </section>)
}
