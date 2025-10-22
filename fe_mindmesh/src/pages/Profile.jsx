import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaHome, FaCog, FaUserCircle} from 'react-icons/fa'
import CardItem from '../components/CardItem'

function Profile() {
  const [user, setUser] = useState(null)
  const [articles, setArticles] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const userDataString = localStorage.getItem('userData')
    
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString)
        setUser(userData)
      
        // Modifikasi Data Artikel untuk CardItem
        const userArticles = userData.blog || []
        
        // Menyuntikkan (inject) objek user ke setiap artikel
        const articlesWithUser = userArticles.map(article => ({
          ...article,
          user: {
            username: userData.username
          }
        }))

        setArticles(articlesWithUser)
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e)
   
        localStorage.clear()
        navigate('/login')
      }
    } else {

      navigate('/login')
    }
  }, [navigate])

  if (!user) {
    return <div className='min-h-lvh flex items-center justify-center text-4xl font-bold'>Loading Profile...</div>
  }

  return (
    <div className='flex flex-wrap min-h-lvh flex-col md:flex-row'>

      <div className='h-lvh md:w-1/2 flex items-end bg-white neuro-in'>
        <div className='h-7/10 w-full neuro-st bottom-0 relative flex flex-col px-10 items-center justify-center gap-2'>
            <div className='w-60 h-60 neuro rounded-full absolute left-1/4 md:left-1/3 -top-30 flex items-center justify-center text-gray-500'>
      
              {user.profile?.avatar ? (
                <img src={user.profile.avatar} alt="Avatar" className='w-full h-full rounded-full object-cover' />
              ) : (
                <FaUserCircle size={100} className='text-gray-400' />
              )}
            </div>
            <h1 className='font-bold text-4xl mt-4 text-gray-500 '>{user.username}</h1>
            <p className='text-lg text-gray-600 text-center'>{user.profile?.bio ?? 'No bio available.'}</p>
            <div className='h-3/10 w-full rounded-md'>
            </div>
        </div>
      </div>

  
      <div className='h-lvh md:w-1/2 flex flex-col p-4 neuro-st text-gray-500 z-10 overflow-y-auto'>
        <h1 className='text-4xl font-bold mb-6'>Lists of {user.username}'s Article</h1>
        <div className='flex flex-wrap gap-4 justify-center items-start w-full'>
          {articles.length > 0 ? (
            articles.map((article) => (
              <CardItem key={article.id} article={article} />
            ))
          ) : (
            <p className='text-2xl mt-10'>No articles published yet.</p>
          )}
        </div>
        
    
        <Link className='absolute neuro-bub top-4 right-4 bg-col text-white p-2 rounded-md' to="/"><FaHome color='gray' size={40}/></Link>
        <Link className='absolute neuro-bub top-4 right-20 bg-col text-white p-2 rounded-md' to="/Account"><FaCog color='gray' size={40}/></Link>
      </div>
    </div>
  )
}

export default Profile