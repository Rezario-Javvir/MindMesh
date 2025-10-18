import React from 'react'
import { useState } from 'react'
import reactVg from '../assets/react.svg'

function TestPage() {
    const [count,setCount]=useState(0)
    const [show,setShow]=useState(false)
  return (
    <div className='bg-gray-900 min-h-lvh flex items-center flex-col justify-center text-cyan-400'>
        <img src={reactVg} alt="reactVg" className='animate-pulse w-20 ' />
        <h1 className='text-8xl text-cyan-400 font-bold'>{count}</h1>
        <div className='flex gap-2'>
            <button className='border-2 text-cyan-400 border-cyan-400 px-3 font-semibold rounded-md shadow-md shadow-cyan-400 hover:bg-cyan-400 hover:text-gray-900' onClick={()=> setShow(true)}>Show</button>
            <button className='border-2 text-cyan-400 border-cyan-400 px-3 font-semibold rounded-md shadow-md shadow-cyan-400 hover:bg-cyan-400 hover:text-gray-900' onClick={()=> setShow(false)}>Hide</button>
        </div>
        {show ? <p>Hello world</p>:null}
    </div>
  )
}

export default TestPage
