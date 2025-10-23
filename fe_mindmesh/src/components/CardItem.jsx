import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

function CardItem({ article }) {
  // Mengamankan akses created_at sebelum dibuat Date object
  const dateToFormat = article.created_at || new Date().toISOString();
  
  const formattedDate = new Date(dateToFormat).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const imageUrl = article.image || 'https://via.placeholder.com/300x200?text=No+Image'
  
  // Mengamankan article.id
  const detailLink = `/article/${article.id ?? 'default'}` 

  return (
    <Link to={detailLink} className='block'> 
      <div 
        className='neuro h-54 w-46 md:h-78 md:w-72 rounded-md p-3 flex flex-col justify-end transition-all duration-300 hover:shadow-lg cursor-pointer relative'
        style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        
        <div className='absolute inset-0 bg-black opacity-30 rounded-md'></div>

        <div className='relative w-full p-3 neuro-in rounded-md text-gray-800 bg-white bg-opacity-90'>
          
          <h3 className='font-bold text-lg md:text-xl line-clamp-2'>{article.title ?? 'No Title'}</h3>
          
          <p className='text-sm mt-1 line-clamp-1'>{article.content ?? 'No Content Available'}</p>
          
          <div className='flex items-center justify-between text-xs md:text-sm mt-2 pt-2 border-t border-gray-300'>
            
            <span className='flex items-center gap-1 font-semibold text-gray-600'>
              <FaUserCircle className='text-base md:text-lg'/>
              {/* PERBAIKAN KRITIS PADA BARIS 34 */}
              {article.user?.username ?? 'Anonim'}
            </span>
            
            <span className='text-gray-500'>
              {formattedDate}
            </span>

          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardItem