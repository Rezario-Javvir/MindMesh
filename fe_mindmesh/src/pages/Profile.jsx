import React from 'react'
import { Link } from 'react-router-dom'
import {FaHome} from 'react-icons/fa'
import {FaCog} from 'react-icons/fa'
import Cards from '../components/Cards'

function Profile() {
  return (
    <div className='flex flex-wrap min-h-lvh flex-col md:flex-row'>
      <div className='h-lvh md:w-1/2 flex items-end bg-white neuro-in'>
        <div className='h-7/10 w-full bottom-0 relative flex flex-col px-10 items-center bg-white justify-center gap-2'>
            <div className='w-60 h-60 neuro rounded-full absolute left-1/4 md:left-1/3 -top-30'>
            </div>
            <h1 className='font-bold text-4xl mt-4 text-gray-500 '>Username</h1>
            <div className='h-3/10 w-full rounded-md'>
            </div>
        </div>
      </div>

      <div className='h-lvh md:w-1/2 flex flex-col p-4 neuro-st text-gray-500'>
        <h1 className='text-4xl font-bold'>Lists of article</h1>
        <div className='flex flex-wrap gap-2 justify-center items-center h-full'>
        </div>
        <Link className='absolute neuro-bub top-2 right-2 bg-col  text-white p-2 rounded-md' to="/"><FaHome color='gray' size={40}/></Link>
        <Link className='absolute neuro-bub top-2 right-20 bg-col text-white p-2 rounded-md' to="/Account"><FaCog color='gray' size={40}/></Link>
      </div>
    </div>
  )
}

export default Profile