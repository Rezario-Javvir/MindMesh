import React from 'react'
import { Link } from 'react-router-dom'
import {FaHome} from 'react-icons/fa'

function AddArticle() {
  return (
    <div className='bg-col min-h-lvh flex flex-col relative'>
      <h1 className='m-2 text-gray-900 font-bold text-4xl'>Add article</h1>
      <Link className='p-2 bg-gray-900 rounded-md absolute top-2 right-2' to='/'><FaHome size={30} color='white'/></Link>
      <div className='bg-col-dark absolute bottom-0 h-110 md:h-130 w-full flex flex-wrap p-2'>
        <div className='h-full md:w-3/10 px-4 flex items-start flex-col gap-2 w-full'>
            <h1 className='text-emerald-100 text-3xl font-bold'>Title</h1>
            <input type="text" className='bg-gray-900 w-full text-2xl text-emerald-100 p-2 rounded-md' />
            <h1 className='text-emerald-100 text-3xl font-bold'>Image</h1>
            <input type="text" className='bg-gray-900 w-full text-2xl text-emerald-100 p-2 rounded-md' />
            <h1 className='text-emerald-100 text-3xl font-bold'>Category</h1>
            <input type="text" className='bg-gray-900 w-full text-2xl text-emerald-100 p-2 rounded-md' />
        </div>
        <div className='bg-col-dark h-full w-full md:w-7/10 p-4 flex flex-col'>
            <h1 className='text-4xl text-emerald-100 font-bold'>Article</h1>
            <input type="text" className='bg-gray-900 h-full rounded-md' />
        </div>
      </div>
    </div>
  )
}

export default AddArticle
