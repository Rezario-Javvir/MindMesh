import React, { useState, useEffect, useCallback } from 'react';
import { FaHome, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://vfs90dhv-3000.asse.devtunnels.ms';
const GET_ARTICLE_URL = `${API_BASE_URL}/article/detail/`;
const UPDATE_ARTICLE_URL = `${API_BASE_URL}/article/edit/`;

function EditArticle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(null);

    const [userToken, setUserToken] = useState(null);
    const [modal, setModal] = useState({ show: false, message: '', type: '' });

    const showModal = useCallback((message, type) => {
        setModal({ show: true, message, type });
        setTimeout(() => {
            setModal({ show: false, message: '', type: '' });
        }, 3000);
    }, []);

    const getImageUrl = (rawPath) => {
        if (!rawPath) return null;
        const IMAGE_PATH_PREFIX = 'upload/article/';
        let fixedPath = rawPath.replace(/\\/g, "/");
        fixedPath = fixedPath.replace("public/", "");
        fixedPath = fixedPath.replace(/^\//, '');

        if (!fixedPath.startsWith(IMAGE_PATH_PREFIX)) {
            fixedPath = `${IMAGE_PATH_PREFIX}${fixedPath}`;
        }
        return `${API_BASE_URL}/${fixedPath}`;
    };

    const fetchArticleData = useCallback(async (token) => {
        if (!token || !id) {
            setInitialLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${GET_ARTICLE_URL}${id}`);
            const article = response.data.article;

            if (!article || !article.id) {
                throw new Error("Article not found or access denied.");
            }

            const userDataString = localStorage.getItem('userData');
            const loggedInUserId = userDataString ? JSON.parse(userDataString).id : null;

            if (article.user_id !== loggedInUserId) {
                showModal('You are not authorized to edit this article.', 'error');
                setTimeout(() => navigate('/'), 2000);
                return;
            }

            setTitle(article.title);
            setContent(article.content);
            setCurrentImage(article.image ? getImageUrl(article.image) : null);

        } catch (error) {
            console.error('Error fetching article:', error.response?.data || error.message);
            showModal(`Failed to load article: ${error.response?.data?.message || 'Server error.'}`, 'error');
            setTimeout(() => navigate('/'), 2000);
        } finally {
            setInitialLoading(false);
        }
    }, [id, navigate, showModal]);

    useEffect(() => {
        const token = localStorage.getItem('userToken');

        if (!token) {
            showModal('Authentication required. Redirecting to login.', 'error');
            setTimeout(() => navigate('/login'), 1500);
            return;
        }

        setUserToken(token);
        fetchArticleData(token);
    }, [navigate, showModal, fetchArticleData]);

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setMediaFile(file);
        } else {
            setMediaFile(null);
            showModal('Only image files are allowed.', 'error');
        }
    };

    const handleRemoveImage = () => {
        setCurrentImage(null);
        setMediaFile(null); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userToken || !id) {
            showModal('Article ID or Authentication data missing.', 'error');
            return;
        }
        if (!title || !content) {
            showModal('Title and Content are required.', 'error');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        if (mediaFile) {
            formData.append('image', mediaFile);
        }

        if (currentImage === null && !mediaFile) {
            formData.append('remove_image', 'true');
        }

        try {
            const response = await axios.patch(`${UPDATE_ARTICLE_URL}${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            console.log('Article updated successfully:', response.data);
            showModal('Article updated successfully! Redirecting to Profile.', 'success');

            setTimeout(() => navigate('/profile'), 1000);

        } catch (error) {
            console.error('Error updating article:', error.response?.data || error.message);
            showModal(`Update Failed: ${error.response?.data?.message || 'Server error or invalid input.'}`, 'error');
        } finally {
            setLoading(false);
        }
    };

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

    if (initialLoading) {
        return <div className='min-h-lvh flex items-center justify-center text-4xl font-bold text-gray-600'>Loading Data...</div>;
    }

    return (
        <>
            <ModalPopup />
            <div className='min-h-lvh text-gray-500 flex flex-col'>
                <div className='h-25 neuro-in-b z-10 flex items-center justify-between px-15 text-white'>
                    <h1 className='font-bold text-6xl'>Edit Article (ID: {id})</h1>
                    <Link className='neuro-b bg-col text-white p-2 rounded-md' to="/"><FaHome color='white' size={40} /></Link>
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
                                New Media (Image Only, Optional)
                            </label>

                            {currentImage && (
                                <div className="mb-4 p-3 neuro-in rounded-xl">
                                    <p className='text-sm font-semibold mb-2'>Current Image:</p>
                                    <img src={currentImage} alt="Current Article" className="w-full h-auto rounded-lg mb-2 object-cover" />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="text-sm text-red-600 hover:text-red-800 font-semibold"
                                    >
                                        Remove Current Image
                                    </button>
                                </div>
                            )}

                            <input
                                id="media-upload"
                                type="file"
                                accept="image/*"
                                className="text-2xl neuro-in rounded-xl p-3 w-full border-2 border-dashed border-gray-300"
                                onChange={handleMediaChange}
                                key={mediaFile}
                            />
                            {mediaFile && (
                                <p className='text-sm text-green-600 mt-2'>Selected NEW file: {mediaFile.name}</p>
                            )}
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
                            disabled={loading || !userToken}
                        >
                            {loading ? 'Updating...' : 'Update Article'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditArticle;