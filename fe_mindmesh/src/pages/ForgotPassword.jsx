import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const API_BASE_URL = 'https://vfs90dhv-3000.asse.devtunnels.ms';
const FORGOT_PASSWORD_URL = `${API_BASE_URL}/auth/forgot-password`;

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, message: '', type: '' });
    
    const navigate = useNavigate();

    const showModal = (message, type) => {
        setModal({ show: true, message, type });
        setTimeout(() => {
            setModal({ show: false, message: '', type: '' });
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(FORGOT_PASSWORD_URL, {
                email,
            });

            const token = response.data.debug_token;
            
            // SECURITY FIX: Store token in localStorage instead of URL
            localStorage.setItem('resetToken', token);
            
            showModal('Token received and stored. Redirecting to reset page...', 'success');
            
            // Navigate without the token in the URL
            setTimeout(() => {
                navigate('/reset-password'); 
            }, 3000);

        } catch (error) {
            if (error.response) {
                console.error('Forgot Password failed:', error.response.data);
                showModal(`Failed: ${error.response.data.message || 'Email not found'}`, 'error');
            } else if (error.request) {
                console.error('Forgot Password failed: No response from server');
                showModal('Failed: Cannot connect to the server', 'error');
            } else {
                console.error('Error:', error.message);
                showModal('An unexpected error occurred', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const ModalPopup = () => {
        if (!modal.show) return null;

        const isSuccess = modal.type === 'success';
        const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
        const Icon = isSuccess ? FaCheckCircle : FaExclamationCircle;

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
        );
    };

    return (
        <>
            <ModalPopup />
            <div className='min-h-lvh bg-gray-100 flex flex-col md:flex-row-reverse'>
                <div className='h-lvh w-full md:w-1/2 flex items-center neuro-b-st justify-center p-20'>
                    <div className='md:w-8/10 w-full neuro-b-st h-full rounded-xl flex items-center justify-center'>
                        <Link to='/login' className='neuro-b px-6 text-white py-4 rounded-xl text-4xl font-bold'>Back to Login</Link>
                    </div>
                </div>
                
                <div className='h-lvh w-full md:w-1/2 flex items-center justify-center flex-col bg-gray-200 gap-4 px-15 md:px-30 text-gray-500'>
                    <h1 className='font-bold text-6xl'>Forgot Password</h1>
                    <p className='text-2xl text-center mb-6'>Enter your email to get the reset token.</p>
                    
                    <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-4'>
                        
                        <input 
                            type="email" 
                            className='px-4 py-2 text-4xl w-full neuro-in rounded-xl' 
                            placeholder='Your Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                        
                        <div className='w-full flex justify-center'>
                            <Link to="/login" className='text-2xl text-blue-600 hover:underline'>Cancel</Link>
                        </div>

                        <button 
                            type="submit"
                            className='px-4 py-2 text-4xl w-6/10 neuro-bub text-center rounded-xl cursor-pointer'
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Request Reset Token'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;