import { useEffect, useRef, useState } from 'react'
export function useInfinite<T>(fetchPage:(p:number,s:AbortSignal)=>Promise<{results:T[];page:number;total_pages:number}>){
  const[items,setItems]=useState<T[]>([]);const[page,setPage]=useState(1);const[total,setTotal]=useState<number|null>(null);const[l,SL]=useState(false);const[e,SE]=useState<Error|null>(null);const r=useRef<AbortController|null>(null)
  async function load(n:number){r.current?.abort();const c=new AbortController();r.current=c;SL(true);try{const d=await fetchPage(n,c.signal);setItems(p=>n===1?d.results:p.concat(d.results));setPage(d.page);setTotal(d.total_pages)}catch(x:any){if(x?.name!=='AbortError')SE(x)}finally{SL(false)}}
  useEffect(()=>{load(1);return()=>r.current?.abort()},[])
  return{items,page,totalPages:total,loading:l,error:e,loadMore:()=>{if(!l&&(total===null||page<total))load(page+1)},reset:()=>load(1)}
}
