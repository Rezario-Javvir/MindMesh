import React from 'react'
import { useState } from 'react'

function Login() {
  const [pesan,setPesan]=useState('Hello react')
  const [count,setCount]=useState(0)
  return (
    <div className='min-h-lvh bg-gray-900 flex flex-col md:flex-row flex-wrap'>
      <div className='w-full md:w-1/2 flex items-center justify-center p-10'>
        <div className='bg-col h-full w-4/5 rounded-md'></div>
      </div>
      <div className='w-full md:w-1/2 bg-amber-500'>
        <h1>{pesan}</h1>
        <button onClick={()=>setPesan('State already changed')}>Change message</button>
        <h1>{count}</h1>
        <button onClick={()=>setCount(count + 1)}>Add</button>
        <button onClick={()=>setCount(count - 1)}>Reduce</button>
        <button onClick={()=>setCount(0)}>Reset</button>
      </div>
    </div>
  )
}

export default Login
