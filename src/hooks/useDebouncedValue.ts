import { useEffect, useState } from 'react'
export function useDebouncedValue<T>(v:T,d=400){const[s,SS]=useState(v);useEffect(()=>{const t=setTimeout(()=>SS(v),d);return()=>clearTimeout(t)},[v,d]);return s}
