import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaPlus, FaBrain, FaSearch } from 'react-icons/fa'
import axios from 'axios'
import CardItem from '../components/CardItem' 

function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('') 
  const [isSearching, setIsSearching] = useState(false) 

  const BASE_URL = 'https://kfbt6z3d-3000.asse.devtunnels.ms/blog'

  const fetchArticles = async (query = '') => {
    setLoading(true)
    setError(null)
    
    let url = `${BASE_URL}/all`
    
    if (query) {
      url = `${BASE_URL}/search?title=${query}`
    }

    try {
      const response = await axios.get(url)
      
      let fetchedArticles = [];

      // PENTING: Server search Anda menggunakan properti "data"
      if (response.data && Array.isArray(response.data.data)) {
        fetchedArticles = response.data.data;
      } 
      // Pengecekan untuk format /all (mungkin menggunakan "articles")
      else if (response.data && Array.isArray(response.data.articles)) {
        fetchedArticles = response.data.articles;
      } 
      // Pengecekan untuk array langsung
      else if (Array.isArray(response.data)) {
        fetchedArticles = response.data;
      }

      setArticles(fetchedArticles)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching articles:", err)
      setError('Failed to take data from server.')
      setArticles([])
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const query = searchQuery.trim()

    if (query !== '') {
      fetchArticles(query)
      setIsSearching(true)
    } else {
      fetchArticles()
      setIsSearching(false)
    }
  }

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

      
          <form onSubmit={handleSearch} className='w-full max-w-lg mt-8 relative'>
            <input
              type="text"
              className='w-full px-6 py-4 text-xl neuro-in rounded-full text-gray-800'
              placeholder='Search articles by title...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className='absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition'>
                <FaSearch size={20} />
            </button>
          </form>
      

        </div>
      </div>
      
      <div className='p-5'>
          {isSearching && searchQuery.trim() !== '' && (
              <h2 className='text-3xl font-bold mb-6 text-gray-800'>
                  Search Results for: "{searchQuery.trim()}"
              </h2>
          )}
          
          {loading ? (
            <div className='text-3xl font-semibold text-gray-700 text-center'>Loading articles...</div>
          ) : error ? (
            <div className='text-3xl font-semibold text-red-600 text-center'>Error: {error}</div>
          ) : articles.length === 0 ? (
            <div className='text-3xl font-semibold text-gray-700 text-center'>
                {isSearching ? `No results found for "${searchQuery.trim()}".` : 'No articles found.'}
            </div>
          ) : (
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start justify-center'>
              {articles.map((article) => (
                <CardItem key={article.id} article={article} />
              ))}
            </div>
          )}
      </div>
      
      <div className='h-lvh'>
      </div>
    </div>
  )
}

export default Home