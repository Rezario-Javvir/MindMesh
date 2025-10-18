import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CardItem from '../components/CardItem'

function ArticlesPage() {
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
          setError('Format data tidak sesuai')
        }
        setLoading(false)
      } catch (err) {
        console.error("Error fetching articles:", err)
        setError('Gagal mengambil data dari server.')
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return <div className='p-8 text-center text-xl font-semibold'>Loading artikel...</div>
  }

  if (error) {
    return <div className='p-8 text-center text-xl text-red-600'>Error: {error}</div>
  }

  if (articles.length === 0) {
    return <div className='p-8 text-center text-xl'>Tidak ada artikel ditemukan.</div>
  }

  return (
    <div className='p-8'>
      <h2 className='text-4xl font-bold mb-8 text-gray-800'>Semua Artikel Terbaru</h2>
      
    
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {articles.map((article) => (
          <CardItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default ArticlesPage