import React, { useState, useEffect } from 'react'
import { FaHome, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const CREATE_ARTICLE_URL = 'https://kfbt6z3d-3000.asse.devtunnels.ms/blog/create'

function AddArticle() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('') // Optional
  const [categoryId, setCategoryId] = useState('') // Asumsi ini adalah ID numerik
  const [loading, setLoading] = useState(false)
  
  const [userToken, setUserToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [modal, setModal] = useState({ show: false, message: '', type: '' })

  const navigate = useNavigate()

  // 1. Ambil Token dan User ID saat komponen dimuat
  useEffect(() => {
    const token = localStorage.getItem('userToken')
    const userDataString = localStorage.getItem('userData')

    if (!token || !userDataString) {
      showModal('Authentication required. Redirecting to login.', 'error')
      setTimeout(() => navigate('/login'), 1500)
      return
    }

    try {
      const userData = JSON.parse(userDataString)
      setUserToken(token)
      setUserId(userData.id)
    } catch (e) {
      console.error("Error parsing user data:", e)
      localStorage.clear()
      navigate('/login')
    }
  }, [navigate])


  const showModal = (message, type) => {
    setModal({ show: true, message, type })
    setTimeout(() => {
      setModal({ show: false, message: '', type: '' })
    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!userToken || !userId) {
      showModal('Authentication data missing. Please log in again.', 'error')
      return
    }

    if (!title || !content || !categoryId) {
      showModal('Title, Content, and Category are required.', 'error')
      return
    }

    setLoading(true)

    try {
      const postData = {
        title,
        content,
        image: image || null, // Kirim null jika image kosong
        user_id: userId,
        category_id: parseInt(categoryId), // Pastikan category_id adalah integer
      }

      const response = await axios.post(CREATE_ARTICLE_URL, postData, {
        headers: {
          'Content-Type': 'application/json',
          // KRITIS: Sertakan token untuk otorisasi
          'Authorization': `Bearer ${userToken}`,
        },
      })

      console.log('Article posted successfully:', response.data)
      showModal('Article posted successfully!', 'success')
      
      // Reset form setelah sukses
      setTitle('')
      setContent('')
      setImage('')
      setCategoryId('')
      
    } catch (error) {
      console.error('Error posting article:', error.response?.data || error.message)
      showModal(`Post Failed: ${error.response?.data?.message || 'Server error or invalid input.'}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const ModalPopup = () => {
    if (!modal.show) return null

    const isSuccess = modal.type === 'success'
    const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500'
    const Icon = isSuccess ? FaCheckCircle : FaExclamationCircle

    return (
      <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-start justify-center pt-20 z-50'>
        <div className={`p-4 rounded-lg shadow-2xl text-white flex items-center gap-4 text-2xl font-semibold ${bgColor}`}>
          <Icon className='text-3xl' />
          <span>{modal.message}</span>
          <button onClick={() => setModal({ show: false, message: '', type: '' })} className='ml-4 text-xl font-bold'>
            &times;
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <ModalPopup />
      <div className='min-h-lvh text-gray-500 flex flex-col'>
        <div className='h-25 neuro-in-b z-10 flex items-center justify-between px-15 text-white'>
            <h1 className='font-bold text-6xl'>Add article</h1>
            <Link className='neuro-b bg-col text-white p-2 rounded-md' to="/"><FaHome color='white' size={40}/></Link>
        </div>
        <form onSubmit={handleSubmit} className='min-h-143 neuro-st flex flex-col md:flex-row'>
            <div className='min-h-lvh w-full md:w-1/3 flex items-center justify-start pt-40 flex-col gap-5'>
                <input 
                  type="text" 
                  className="text-4xl neuro-in rounded-xl p-3" 
                  placeholder='Title (Required)'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <input 
                  type="text" 
                  className="text-4xl neuro-in rounded-xl p-3" 
                  placeholder='Image URL (Optional)'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <input 
                  type="number" 
                  className="text-4xl neuro-in rounded-xl p-3" 
                  placeholder='Category ID (e.g., 1, 2, 3)'
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                />
            </div>
            <div className='min-h-lvh w-full md:w-2/3 neuro-in flex items-center justify-center px-15 flex-col gap-10'>
                <h1 className='text-4xl font-bold'>Article Content (Required)</h1>
                <textarea 
                  name="content" 
                  cols="30" 
                  rows="10" 
                  className='neuro-in w-full text-2xl font-semibold p-3 rounded-xl'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
                <button 
                  type="submit"
                  className='text-4xl font-semibold rounded-xl neuro-bub px-5 py-2'
                  disabled={loading || !userToken}
                >
                  {loading ? 'Posting...' : 'Post'}
                </button>
            </div>
        </form>
    </div>
    </>
  )
}

export default AddArticle