import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaEye, FaEyeSlash, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [showPassword, setShowPassword] = useState(false) 
  const [modal, setModal] = useState({ show: false, message: '', type: '' })
  
  const navigate = useNavigate()

  const LOGIN_URL = 'https://kfbt6z3d-3000.asse.devtunnels.ms/auth/login' 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const showModal = (message, type) => {
    setModal({ show: true, message, type })
    setTimeout(() => {
      setModal({ show: false, message: '', type: '' })
    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault() 

    try {
      const response = await axios.post(LOGIN_URL, {
        email, 
        password,
      })

      const { user, token } = response.data.data

      // LANGKAH KRITIS 1: Simpan token dan data user ke localStorage
      localStorage.setItem('userToken', token)
      localStorage.setItem('userData', JSON.stringify(user))
      
      showModal('Login berhasil! Mengalihkan ke halaman utama...', 'success')
      
      setTimeout(() => {
        navigate('/')  // Mengarahkan ke Home, bukan Profile
      }, 1500) 

    } catch (error) {
      if (error.response) {
        console.error('Login failed:', error.response.data)
        showModal(`Login Gagal: ${error.response.data.message || 'Email atau password tidak valid'}`, 'error')
      } else if (error.request) {
        console.error('Login failed: No response from server')
        showModal('Login Gagal: Tidak dapat terhubung ke server', 'error')
      } else {
        console.error('Error:', error.message)
        showModal('Terjadi kesalahan tak terduga', 'error')
      }
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
      <div className='min-h-lvh bg-gray-100 flex flex-col md:flex-row-reverse'>
        <div className='h-lvh w-full md:w-1/2 flex items-center neuro-b-st justify-center p-20'>
          <div className='md:w-8/10 w-full neuro-b-st h-full rounded-xl flex items-center justify-center'>
            <Link to='/Register' className='neuro-b px-6 text-white py-4 rounded-xl text-4xl font-bold'>Register</Link>
          </div>
        </div>
        
        <div className='h-lvh w-full md:w-1/2 flex items-center justify-center flex-col bg-gray-200 gap-4 px-15 md:px-30 text-gray-500'>
          <h1 className='font-bold text-6xl'>Login</h1>
          <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-4'>
            
            <input 
              type="email" 
              className='px-4 py-2 text-4xl w-full neuro-in rounded-xl' 
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <div className='relative w-full'>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className='px-4 py-2 text-4xl w-full neuro-in rounded-xl' 
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-4xl text-gray-500' 
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            <div className='w-full flex justify-between'>
              <Link to="#">Forgot password?</Link>
              <Link to="/Register">Register</Link>
            </div>

            <button 
              type="submit"
              className='px-4 py-2 text-4xl w-6/10 neuro-bub text-center rounded-xl cursor-pointer'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login