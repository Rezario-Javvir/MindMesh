import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaPlus, FaBrain } from 'react-icons/fa'
import axios from 'axios'
import CardItem from '../components/CardItem' 

function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = 'https://kfbt6z3d-3000.asse.devtunnels.ms/blog/all' 

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(API_URL)
        
        if (response.data && response.data.articles) {
          setArticles(response.data.articles)
        } else {
          setError('Data format is incorrect')
        }
        setLoading(false)
      } catch (err) {
        console.error("Error fetching articles:", err)
        setError('Failed to fetch data from the server.')
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return (
    <div className='min-h-lvh bg-gray-100'>
      
      <div className='h-lvh flex items-start justify-center flex-col font-bold text-5xl p-5 bg-gray-200 text-gray-500'>
        <div className='neuro-in-b rounded-xl p-2 z-10 text-white h-full w-full flex items-center
        flex-col relative justify-center'>
          <Link className='absolute neuro-b text-white top-6 right-8 p-2 rounded-md' to="/Profile"><FaUser size={40} color='white'/></Link>
          <Link className='absolute neuro-b text-white top-6 right-26 p-2 rounded-md' to="/AddArticle"><FaPlus size={40} color='white'/></Link>
          <FaBrain size={160} color='white' className='animate-pulse'/>
          <h1>Welcome to the mindmesh</h1>
          <p className='font-medium text-3xl'>Thousand thoughts is yours</p>
        </div>
      </div>
      
      <div className='h-lvh flex flex-wrap gap-10 items-center justify-center p-5'>
        
        {loading ? (
          <div className='text-3xl font-semibold text-gray-700'>Loading articles...</div>
        ) : error ? (
          <div className='text-3xl font-semibold text-red-600'>Error: {error}</div>
        ) : articles.length === 0 ? (
          <div className='text-3xl font-semibold text-gray-700'>No articles found.</div>
        ) : (
      
          articles.map((article) => (
            <CardItem key={article.id} article={article} />
          ))
        )}
      </div>
      
      <div className='h-lvh'>
      </div>
    </div>
  )
}

export default Home