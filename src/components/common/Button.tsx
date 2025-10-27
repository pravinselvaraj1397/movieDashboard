import React from 'react'
export default function Button({className='',...p}:React.ButtonHTMLAttributes<HTMLButtonElement>){return <button className={'btn btn-primary '+className}{...p}/>}
