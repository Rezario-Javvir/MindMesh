import React from 'react'
import { Link } from 'react-router-dom'
import {FaHome} from 'react-icons/fa'
import {FaCog} from 'react-icons/fa'
import Cards from '../components/Cards'

function Profile() {
  return (
    <div className='flex flex-wrap min-h-lvh flex-col md:flex-row'>
      <div className='h-lvh md:w-1/2 bg-gray-900 flex items-end'>
        <div className='h-7/10 w-full grad-to-t bottom-0 relative flex flex-col px-10 items-center justify-center gap-2'>
            <div className='bg-emerald-100 w-60 h-60 rounded-full absolute left-1/4 md:left-1/3 -top-30'>
            </div>
            <h1 className='font-bold text-4xl mt-4 text-gray-900'>Username</h1>
            <div className='h-3/10 w-full rounded-md bg-emerald-100 inset-shadow-black-500'>
            </div>
        </div>
      </div>

      <div className='h-lvh md:w-1/2 grad-to-b flex flex-col p-4'>
        <h1 className='text-white'>Lists of article</h1>
        <div className='flex flex-wrap gap-2 justify-center items-center h-full'>
        </div>
        <Link className='absolute top-2 right-2 bg-col text-white p-2 rounded-md' to="/"><FaHome size={30}/></Link>
        <Link className='absolute top-2 right-15 bg-col text-white p-2 rounded-md' to="/Account"><FaCog size={30}/></Link>
      </div>
    </div>
  )
}

export default Profile