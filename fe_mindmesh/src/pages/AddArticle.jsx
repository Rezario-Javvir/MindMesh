import React from 'react'
import {FaHome} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function AddArticle() {
  return (
    <div className='min-h-lvh text-gray-500 flex flex-col'>
        <div className='h-25 neuro-in flex items-center justify-between px-15'>
            <h1 className='font-bold text-6xl'>Add article</h1>
            <Link className='neuro-bub bg-col text-white p-2 rounded-md' to="/Account"><FaHome color='gray' size={40}/></Link>
        </div>
        <div className='min-h-143 neuro-st flex flex-col md:flex-row'>
            <div className='min-h-lvh w-full md:w-1/3 flex items-center justify-start pt-40 flex-col gap-5'>
                <input type="text" className="text-4xl neuro-in rounded-xl p-3" placeholder='Tittle'/>
                <input type="text" className="text-4xl neuro-in rounded-xl p-3" placeholder='Image'/>
                <input type="text" className="text-4xl neuro-in rounded-xl p-3" placeholder='Category'/>
            </div>
            <div className='min-h-lvh w-full md:w-2/3 neuro-in flex items-center justify-center px-15 flex-col gap-10'>
                <h1 className='text-4xl font-bold'>Article</h1>
                <textarea name="" id="" cols="30" rows="10" className='neuro-in w-full text-2xl font-semibold p-3 rounded-xl'></textarea>
                <button className='text-4xl font-semibold rounded-xl neuro-bub px-5 py-2'>Post</button>
            </div>
        </div>
    </div>
  )
}

export default AddArticle
