import React, { useState, useEffect, useCallback } from 'react';
import { FaHome, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CREATE_ARTICLE_URL = 'https://vfs90dhv-3000.asse.devtunnels.ms/article/create';
// MENGGUNAKAN ENDPOINT YANG BENAR: /category/all
const CATEGORIES_URL = 'https://vfs90dhv-3000.asse.devtunnels.ms/category/all'; 

function AddArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null); 
  const [categories, setCategories] = useState([]); 
  const [categoryId, setCategoryId] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);
  
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [modal, setModal] = useState({ show: false, message: '', type: '' });

  const navigate = useNavigate();

  const showModal = useCallback((message, type) => {
    setModal({ show: true, message, type });
    setTimeout(() => {
      setModal({ show: false, message: '', type: '' });
    }, 3000);
  }, []);

  // Fungsi fetchCategories yang disesuaikan untuk respons `/category/all`
  const fetchCategories = useCallback(async (token) => {
    if (!token) return;

    setCategoryLoading(true);
    try {
      const response = await axios.get(CATEGORIES_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      // KRITIS: Akses array kategori melalui response.data.data
      const data = response.data.data;
      
      if (Array.isArray(data) && data.length > 0) {
        setCategories(data);
        // Set categoryId ke string kosong agar 'Select Category' terpilih
        setCategoryId(''); 
      } else {
        setCategories([]);
        showModal('No categories found. Cannot post article.', 'error');
      }
    } catch (error) {
      console.error('Error fetching categories:', error.response?.data || error.message);
      showModal('Failed to load categories. Check API token/permissions.', 'error');
      setCategories([]);
    } finally {
      setCategoryLoading(false);
    }
  }, [showModal]);


  // Efek untuk memuat Auth Data dan memicu fetchCategories
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userDataString = localStorage.getItem('userData');

    if (!token || !userDataString) {
      showModal('Authentication required. Redirecting to login.', 'error');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    try {
      const userData = JSON.parse(userDataString);
      
      // ATUR STATE PENTING
      setUserToken(token);
      setUserId(userData.id); 
      
      // Panggil fetchCategories setelah data Auth aman
      fetchCategories(token); 

    } catch (e) {
      console.error("Error parsing user data:", e);
      localStorage.clear();
      navigate('/login');
    }
  }, [navigate, showModal, fetchCategories]);
  
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        setMediaFile(file); 
    } else {
        setMediaFile(null);
        showModal('Only image files are allowed.', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // CEK SEBELUM SUBMIT
    if (!userToken || !userId) {
      showModal('Authentication data missing. Please log in again.', 'error');
      return;
    }
    if (!title || !content || !categoryId) {
      showModal('Title, Content, and Category are required.', 'error');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('user_id', userId); 
    formData.append('category_id', categoryId); 

    if (mediaFile) {
        formData.append('image', mediaFile); 
    }

    try {
      const response = await axios.post(CREATE_ARTICLE_URL, formData, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });

      console.log('Article posted successfully:', response.data);
      showModal('Article posted successfully! Redirecting to Home.', 'success');
      
      // Reset form setelah sukses
      setTitle('');
      setContent('');
      setMediaFile(null); 
      setCategoryId('');
      
      setTimeout(() => navigate('/'), 1000); 
      
    } catch (error) {
      console.error('Error posting article:', error.response?.data || error.message);
      showModal(`Post Failed: ${error.response?.data?.message || 'Server error or invalid input.'}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const ModalPopup = () => {
    // ... (tetap sama) ...
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
                
                <div className="w-4/5 text-center">
                    <label 
                        htmlFor="media-upload" 
                        className="block text-xl font-semibold mb-2 text-gray-700"
                    >
                        Media (Image Only, Optional)
                    </label>
                    <input 
                      id="media-upload"
                      type="file" 
                      accept="image/*" 
                      className="text-2xl neuro-in rounded-xl p-3 w-full border-2 border-dashed border-gray-300" 
                      onChange={handleMediaChange}
                    />
                    {mediaFile && (
                        <p className='text-sm text-green-600 mt-2'>Selected file: {mediaFile.name}</p>
                    )}
                </div>

                <div className="w-4/5 text-center">
                    <label 
                        htmlFor="category-select" 
                        className="block text-xl font-semibold mb-2 text-gray-700"
                    >
                        Category (Required)
                    </label>
                   <div className="w-4/5 text-center">
                    <label 
                        htmlFor="category-select" 
                        className="block text-xl font-semibold mb-2 text-gray-700"
                    >
                        Category (Required)
                    </label>
                    <select
                      id="category-select"
                      className="text-4xl neuro-in rounded-xl p-3 w-full bg-gray-300 border-0" 
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      required
                      disabled={categoryLoading || categories.length === 0}
                    >
                        {categoryLoading ? (
                            <option value="">Loading Categories...</option>
                        ) : (
                            <>
                                <option value="" disabled>Select Category</option>
                                {/* GANTI KE SINTAKSIS SATU BARIS UNTUK KEAMANAN */}
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.category_name}</option> 
                                ))}
                            </>
                        )}
                    </select>
                </div>
                </div>
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
                  disabled={loading || !userToken || !userId || categoryLoading || categories.length === 0}
                >
                  {loading ? 'Posting...' : 'Post'}
                </button>
            </div>
        </form>
      </div>
    </>
  )
}

export default AddArticle;