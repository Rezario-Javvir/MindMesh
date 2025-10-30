import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaClock, FaHome, FaArrowLeft } from 'react-icons/fa';

const API_BASE_URL = 'https://vfs90dhv-3000.asse.devtunnels.ms';
const ARTICLE_DETAIL_URL = `${API_BASE_URL}/article/detail`;
const IMAGE_PATH_PREFIX = 'upload/article/';
const AVATAR_PATH_PREFIX = 'upload/avatar/'; 
const API_DOMAIN = API_BASE_URL;

function ArticlePage() {
    const { articleId } = useParams(); 
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getImageUrl = (imagePath, isAvatar = false) => {
        if (!imagePath) {
            return isAvatar 
                ? null 
                : 'https://via.placeholder.com/1000x400?text=Image+Not+Available';
        }
        
        let fixedPath = imagePath.replace(/\\/g, "/");
        fixedPath = fixedPath.replace("public/", "");
        
        const prefix = isAvatar ? AVATAR_PATH_PREFIX : IMAGE_PATH_PREFIX;
        fixedPath = `${prefix}${fixedPath.replace(/^\//, '')}`;

        return `${API_DOMAIN}/${fixedPath.replace(/^\//, '')}`;
    };

    useEffect(() => {
        if (!articleId || articleId === 'default') {
            setError("Article ID is missing or invalid.");
            setLoading(false);
            return;
        }

        const fetchArticleDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${ARTICLE_DETAIL_URL}/${articleId}`);

                if (response.data && response.data.article) {
                    setArticle(response.data.article);
                } else {
                    setError('Artikel tidak ditemukan atau format data tidak sesuai.');
                }
                
            } catch (err) {
                console.error("Error fetching article detail:", err);
                setError(`Gagal memuat detail artikel: ${err.response?.data?.message || err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchArticleDetail();
    }, [articleId]);

    if (loading) {
        return <div className='flex items-center justify-center min-h-screen text-xl font-semibold'>Loading detail artikel...</div>;
    }

    if (error) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen p-8 text-center'>
                <p className='text-2xl text-red-600 mb-4'>Error: {error}</p>
                <button 
                    onClick={() => navigate(-1)} 
                    className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-2'
                >
                    <FaArrowLeft /> Kembali
                </button>
            </div>
        );
    }

    if (!article) {
        return <div className='flex items-center justify-center min-h-screen text-2xl'>Artikel tidak ditemukan.</div>;
    }

    const imageUrl = getImageUrl(article.image);
    
    const rawAvatarPath = article.user?.profile?.avatar || article.user?.avatar;
    const avatarUrl = getImageUrl(rawAvatarPath, true);
    const creatorUserId = article.user?.id || article.user?.user_id; 
    
    const profileLink = creatorUserId ? `/profile/user/${creatorUserId}` : '#'; 

    const formattedDate = article.created_at 
        ? new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'Unknown Date';

    const creatorUsername = article.user?.profile?.username || article.user?.username || 'Creator Username';

    return (
        <div className='flex flex-col min-h-screen bg-white'> 
            <div 
                className='relative w-full h-80 bg-gray-300 flex items-center justify-center text-gray-700 text-xl font-semibold overflow-hidden'
                style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {!article.image && "Image will be placed in this dark section"} 
            </div>

            <div className='flex-grow bg-white p-6 md:p-8 relative'>
                <Link to="/" className='absolute top-4 right-4 neuro-bub p-3 rounded-xl hover:bg-gray-100 transition-colors duration-200'>
                    <FaHome size={28} className='text-gray-600' />
                </Link>

                <h1 className='text-5xl md:text-6xl font-extrabold text-gray-900 mt-4 mb-4'>
                    {article.title ?? 'Title'}
                </h1>
                
                <div className='flex items-center text-base md:text-lg text-gray-700 mb-8 border-b pb-4'>
                    <p>Written by:</p>
                    <Link 
                        to={profileLink} 
                        className='flex items-center mr-4 font-semibold hover:text-blue-600 transition-colors duration-200 cursor-pointer'
                        aria-label={`Visit ${creatorUsername}'s profile`}
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {creatorUsername}
                    </Link>
                    
                    <span className='font-semibold'>|</span>
                    <span className='ml-4 text-gray-600'>
                        <FaClock className='inline-block mr-2 text-lg'/>
                        {formattedDate}
                    </span>
                </div>
                
                <div className='prose max-w-none text-gray-800 leading-relaxed text-lg'>
                    <p>{article.content ?? 'Content of the article will be displayed here.'}</p>
                </div>
            </div>
        </div>
    );
}

export default ArticlePage;