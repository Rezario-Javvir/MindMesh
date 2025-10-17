import React from 'react'
import { Link } from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {FaPlus} from 'react-icons/fa'
import {FaBrain} from 'react-icons/fa'
import Cards from '../components/Cards'

function Home() {
  return (
    <div className='min-h-lvh bg-gray-100'>
        <div className='h-lvh flex items-start justify-center flex-col font-bold text-5xl p-5 bg-gray-200 text-gray-500'>
          <div className='neuro-in-b bg-sky-300 rounded-xl p-2 text-white h-full w-full flex items-center
          flex-col relative justify-center'>
            <Link className='absolute neuro-b text-white top-6 right-8 p-2  rounded-md' to="/Profile"><FaUser size={40}    color='white'/></Link>
            <Link className='absolute neuro-b text-white top-6 right-26 p-2 rounded-md' to="/AddArticle"><FaPlus size={40} color='white'/></Link>
            <FaBrain size={160} color='white' className='animate-pulse'/>
            <h1>Welcome to the mindmesh</h1>
            <p className='font-medium text-3xl'>Thousand thoughts is yours</p>
          </div>
        </div>
        <div className='h-lvh flex flex-wrap gap-10 items-center justify-center p-5'>
            <Cards/>            
            <Cards/>            
            <Cards/>            
            <Cards/>            
            <Cards/>            
            <Cards/>            
            <Cards/>            
            <Cards/>                       
        </div>
        <div className='h-lvh'>
        </div>
    </div>
  )
}

export default Home
