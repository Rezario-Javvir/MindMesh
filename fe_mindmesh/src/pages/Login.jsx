import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Login() {
  return (
    <div className='min-h-lvh bg-gray-100 flex flex-col md:flex-row'>
      <div className='h-lvh w-full md:w-1/2 flex items-center justify-center p-20'>
        <div className='md:w-8/10 w-full neuro-b h-full rounded-xl flex items-center justify-center'>
          <Link to='/Register' className='text-gray-500 neuro px-6 py-4 text-4xl font-bold hover:neuro-in rounded-xl neuro-b text-white'>Register</Link>
        </div>
      </div>
      <div className='h-lvh w-full md:w-1/2 flex items-center justify-center flex-col bg-gray-200 gap-4 px-15 md:px-30 text-gray-500'>
        <h1 className='font-bold text-6xl'>Login</h1>
        <input type="text" className='px-4 py-2 text-4xl w-full neuro-in rounded-xl' placeholder='Email'/>
        <input type="text" className='px-4 py-2 text-4xl w-full neuro-in rounded-xl' placeholder='Password'/>
        <div className='w-full flex justify-between'>
          <Link>Forgot password?</Link>
          <Link>Register</Link>
        </div>
        <Link className='px-4 py-2 text-4xl w-6/10 neuro text-center rounded-xl' to='/Register'>Login</Link>
      </div>
    </div>
  )
}

export default Login
