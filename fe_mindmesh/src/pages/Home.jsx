import React from 'react'
import { Link } from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {FaPlus} from 'react-icons/fa'
import Cards from '../components/Cards'

function Home() {
  return (
    <div className='min-h-lvh bg-gray-900 text-col'>
        <div className='h-lvh flex items-start justify-center flex-col font-bold text-5xl p-5'>
            <h1>Welcome to the mindme</h1>
            <p className='font-medium text-3xl'>Thousand thoughts is yours</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='absolute bottom-0 left-0'><path fill="#42757A" fill-opacity="1" d="M0,128L48,128C96,128,192,128,288,149.3C384,171,480,213,576,197.3C672,181,768,107,864,85.3C960,64,1056,96,1152,106.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
        <div className='bg-col h-lvh flex flex-wrap gap-10 items-center justify-center p-5'>
            <Cards/>            
            <Cards/>            
            <Cards/>            
            <Cards/>            
            <Cards/>            
            <Cards/>            
            <Cards/>            
            <Cards/>            
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='top-0 left-0'><path fill="#42757A" fill-opacity="1" d="M0,32L48,74.7C96,117,192,203,288,208C384,213,480,139,576,112C672,85,768,107,864,101.3C960,96,1056,64,1152,74.7C1248,85,1344,139,1392,165.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
        <div className='h-lvh'>

        </div>
        <Link className='absolute bg-col text-white top-2 right-2 p-2 rounded-md' to="/Profile"><FaUser size={30}/></Link>
        <Link className='absolute bg-col text-white top-2 right-15 p-2 rounded-md' to="/AddArticle"><FaPlus size={30}/></Link>
    </div>
  )
}

export default Home
