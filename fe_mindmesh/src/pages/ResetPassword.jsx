import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const API_BASE_URL = 'https://vfs90dhv-3000.asse.devtunnels.ms';
const RESET_PASSWORD_URL = `${API_BASE_URL}/auth/reset-password`;

function ResetPassword() {
    const navigate = useNavigate();

    const [resetToken, setResetToken] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        // Retrieve token from localStorage
        const storedToken = localStorage.getItem('resetToken');
        if (storedToken) {
            setResetToken(storedToken);
        } else {
            showModal('Reset token not found. Please restart the forgot password process.', 'error');
            // Navigate back if no token is present, but keep this commented out if you want to allow manual refresh
            // setTimeout(() => navigate('/forgot-password'), 3000); 
        }

        // Cleanup function: remove token if user leaves this page unexpectedly
        return () => {
            // Uncomment the line below if you want the token to be single-use 
            // even if the user just closes the tab or navigates away.
            // localStorage.removeItem('resetToken');
        };
    }, [navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const showModal = (message, type) => {
        setModal({ show: true, message, type });
        setTimeout(() => {
            setModal({ show: false, message: '', type: '' });
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            showModal('New password and confirmation password do not match.', 'error');
            return;
        }

        if (!resetToken) {
            showModal('Reset token is missing. Please restart the process.', 'error');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${RESET_PASSWORD_URL}?token=${resetToken}`, {
                new_password: newPassword,
            });

            console.log('Reset Password success:', response.data);
            showModal(
                response.data.message || 'Password successfully reset! Please log in.', 
                'success'
            );
            
            // SUCCESS: Remove token from storage and navigate
            localStorage.removeItem('resetToken');
            setTimeout(() => {
                navigate('/login'); 
            }, 2000);

        } catch (error) {
            if (error.response) {
                console.error('Reset Password failed:', error.response.data);
                showModal(`Failed: ${error.response.data.message || 'Invalid or expired token'}`, 'error');
                // Optional: If token is definitely expired/invalid, remove it to force restart
                // localStorage.removeItem('resetToken'); 
            } else if (error.request) {
                console.error('Reset Password failed: No response from server');
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
                        <Link to='/login' className='neuro-b px-6 text-white py-4 rounded-xl text-4xl font-bold'>Login</Link>
                    </div>
                </div>
                
                <div className='h-lvh w-full md:w-1/2 flex items-center justify-center flex-col bg-gray-200 gap-4 px-15 md:px-30 text-gray-500'>
                    <h1 className='font-bold text-6xl'>Reset Password</h1>
                    <p className='text-2xl text-center mb-6'>Enter your new password.</p>

                    {!resetToken && (
                        <p className='text-red-500 font-bold text-3xl'>Waiting for reset token. Please check email or restart process.</p>
                    )}
                    {resetToken && (
                        <p className='text-green-500 font-bold text-lg mb-4 break-all'>Token loaded successfully. Ready to reset.</p>
                    )}

                    <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-4'>
                        
                        <div className='relative w-full'>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                className='px-4 py-2 text-4xl w-full neuro-in rounded-xl' 
                                placeholder='New Password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                disabled={loading || !resetToken}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className='absolute inset-y-0 right-0 pr-3 flex items-center text-4xl text-gray-500'
                                disabled={loading || !resetToken}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className='relative w-full'>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                className='px-4 py-2 text-4xl w-full neuro-in rounded-xl' 
                                placeholder='Confirm New Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                disabled={loading || !resetToken}
                            />
                        </div>
                        
                        <button 
                            type="submit"
                            className='px-4 py-2 text-4xl w-6/10 neuro-bub text-center rounded-xl cursor-pointer'
                            disabled={loading || newPassword !== confirmPassword || !resetToken}
                        >
                            {loading ? 'Processing...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;