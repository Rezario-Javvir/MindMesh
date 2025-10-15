import React from 'react'
import {FaHome} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Account() {
  return (
    <div className='flex flex-col md:flex-row bg-gray-900 min-h-lvh'>
      <div className='h-lvh w-full md:w-3/10 flex items-center justify-center flex-col gap-2'>
        <div className='h-50 w-50 bg-emerald-100 rounded-full'></div>
        <h1 className='text-emerald-100 font-bold text-4xl'>Username</h1>
        <h1 className='text-emerald-100 font-semibold text-2xl'>Nigger@gmail.com</h1>
      </div>
      <div className='h-lvh w-full md:w-7/10 bg-col p-2 flex flex-col gap-4 relative'>
        <h1 className='text-4xl font-bold text-gray-900'>Account settings</h1>
        <Link className='absolute top-2 right-2 bg-gray-900 p-2 rounded-md' to='/'><FaHome size={30} color='white'/></Link>
        <div className=' w-full h-9/10 flex items-center justify-start flex-wrap gap-2 p-10'>
            <ul>
                <h1 className='text-emerald-100 text-4xl font-bold'>Username</h1>
                <input type="text" className='bg-gray-900 rounded-md text-3xl p-2 text-emerald-100' />
            </ul>
            <ul>
                <h1 className='text-emerald-100 text-4xl font-bold'>Email</h1>
                <input type="text" className='bg-gray-900 rounded-md text-3xl p-2 text-emerald-100' />
            </ul>
            <ul>
                <h1 className='text-emerald-100 text-4xl font-bold'>Password</h1>
                <input type="text" className='bg-gray-900 rounded-md text-3xl p-2 text-emerald-100' />
            </ul>
        </div>
        <button className='bg-gray-900 bg-col p-2 absolute rounded-md text-2xl font-semibold bottom-2 right-2'>Save changes</button>
      </div>
    </div>
  )
}

export default Account
