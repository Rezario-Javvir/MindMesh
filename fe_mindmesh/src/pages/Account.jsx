import React from 'react'
import {FaHome} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Account() {
  return (
    <div className='flex flex-col md:flex-row min-h-lvh text-gray-500'>
      <div className='h-lvh w-full md:w-3/10 flex items-center justify-center flex-col gap-2 neuro-in bg-gray-100'>
        <div className='h-50 w-50 neuro-bub rounded-full'></div>
        <h1 className='text-gray-500 font-bold text-4xl'>Username</h1>
        <h1 className='text-gray-500 font-semibold text-2xl'>Nigger@gmail.com</h1>
      </div>

      <div className='h-lvh w-full neuro-st md:w-7/10 bg-col p-2 flex flex-col gap-4 relative'>
        <h1 className='text-4xl font-bold text-gray-600'>Account settings</h1>
        <Link className='absolute top-2 right-2 neuro-bub p-2 rounded-md' to='/'><FaHome size={40} color='gray'/></Link>
        <div className=' w-full h-9/10 flex items-center justify:center md:justify-start flex-wrap gap-2 p-2 md:p-10 text-gray-500'>
            <ul className='w-full md:w-4/10'>
                <h1 className='text-4xl font-bold'>Username</h1>
                <input type="text" className='neuro-in w-full rounded-md text-3xl p-2 text-gray-500' />
            </ul>
            <ul className='w-full md:w-4/10'>
                <h1 className='text-4xl font-bold'>Email</h1>
                <input type="text" className='neuro-in w-full rounded-md text-3xl p-2 text-gray-500' />
            </ul>
            <ul className='w-full md:w-4/10'>
                <h1 className='text-4xl font-bold'>Password</h1>
                <input type="text" className='neuro-in w-full rounded-md text-3xl p-2 text-gray-500' />
            </ul>
        </div>
        <button className='neuro bg-col p-2 absolute rounded-md text-2xl font-semibold bottom-2 right-2'>Save changes</button>
      </div>
    </div>
  )
}

export default Account
