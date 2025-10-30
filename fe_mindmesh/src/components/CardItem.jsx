import React from 'react'
import { Link } from 'react-router-dom' // Pastikan Link diimpor
import { FaUserCircle } from 'react-icons/fa'

const API_DOMAIN = 'https://vfs90dhv-3000.asse.devtunnels.ms'; 

const IMAGE_PATH_PREFIX = 'upload/article/';
const AVATAR_PATH_PREFIX = 'upload/avatar/';

// Fungsi untuk mendapatkan URL gambar
const getImageUrl = (rawPath, prefix) => {
    if (!rawPath) return null;

    let fixedPath = rawPath.replace(/\\/g, "/");
    fixedPath = fixedPath.replace("public/", ""); 
    fixedPath = fixedPath.replace(/^\//, ''); 
    
    if (!fixedPath.startsWith(prefix)) {
        fixedPath = `${prefix}${fixedPath}`;
    }

    return `${API_DOMAIN}/${fixedPath}`;
};

function CardItem({ article }) {

  const dateToFormat = article.created_at || new Date().toISOString();
  
  const formattedDate = new Date(dateToFormat).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

    // LOGIKA GAMBAR ARTIKEL
  const rawImageName = article.image;
  const defaultArticleImage = 'https://via.placeholder.com/300x200?text=No+Image';
  const articleImageUrl = rawImageName
    ? getImageUrl(rawImageName, IMAGE_PATH_PREFIX)
    : defaultArticleImage;

    // LOGIKA GAMBAR AVATAR
    const rawAvatarPath = article.user?.profile?.avatar || article.user?.avatar;
    const avatarUrl = rawAvatarPath ? getImageUrl(rawAvatarPath, AVATAR_PATH_PREFIX) : null;
    const username = article.user?.profile?.username || article.user?.username || 'Anonim';
    const userId = article.user?.id || article.user?.user_id; // Ambil ID pengguna

  const detailLink = `/article/${article.id ?? 'default'}`;
    const profileLink = userId ? `/profile/user/${userId}` : '#'; // Link profil

  return (
    <div className='flex justify-center'>
    <Link to={detailLink} className='block'> 
      <div 
        className='neuro h-75 w-62 md:h-78 md:w-72 rounded-md p-3 flex flex-col justify-end transition-all duration-300 hover:shadow-lg cursor-pointer relative'
        style={{ backgroundImage: `url(${articleImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        
        <div className='absolute inset-0 bg-black opacity-30 rounded-md'></div>

        <div className='relative w-full p-3 neuro-in rounded-md text-gray-800 bg-white bg-opacity-90'>
          
          <h3 className='font-bold text-lg md:text-xl line-clamp-2'>{article.title ?? 'No Title'}</h3>
          
          <p className='text-sm mt-1 line-clamp-1'>{article.content ?? 'No Content Available'}</p>
          
          <div className='flex items-center justify-between text-xs md:text-sm mt-2 pt-2 border-t border-gray-300'>
            
                {/* MODIFIKASI: Username menjadi Link */}
            <Link to={profileLink} className='flex items-center gap-1 font-semibold text-gray-600 hover:text-blue-600 z-20' onClick={(e) => e.stopPropagation()}>
                {avatarUrl ? (
                    <img src={avatarUrl} alt={`${username}'s avatar`} className='w-5 h-5 rounded-full object-cover' />
                ) : (
                    <FaUserCircle className='text-base md:text-lg'/>
                )}
              {username}
            </Link>
            
            <span className='text-gray-500'>
              {formattedDate}
            </span>

          </div>
        </div>
      </div>
    </Link>
    </div>
  )
}

export default CardItem;