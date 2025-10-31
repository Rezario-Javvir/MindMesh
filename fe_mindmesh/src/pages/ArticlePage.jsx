import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const API_BASE_URL = 'https://vfs90dhv-3000.asse.devtunnels.ms';
const ARTICLE_DETAIL_URL = `${API_BASE_URL}/article/detail`;
const COMMENT_POST_URL = `${API_BASE_URL}/comment/article`;
const IMAGE_PATH_PREFIX = 'upload/article/';
const AVATAR_PATH_PREFIX = 'upload/avatar/';
const API_DOMAIN = API_BASE_URL;

const getImageUrl = (imagePath, isAvatar = false) => {
    if (!imagePath) {
        return isAvatar 
            ? null 
            : 'https://via.placeholder.co/1000x400/18525D/FFFFFF?text=Image+Not+Available';
    }
    
    let fixedPath = imagePath.replace(/\\/g, "/");
    fixedPath = fixedPath.replace("public/", "");
    
    const prefix = isAvatar ? AVATAR_PATH_PREFIX : IMAGE_PATH_PREFIX;
    fixedPath = `${prefix}${fixedPath.replace(/^\//, '')}`;

    return `${API_DOMAIN}/${fixedPath.replace(/^\//, '')}`;
};

const ClockIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
);

const HomeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
);

const ArrowLeftIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
        <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
);

const PaperPlaneIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send">
        <path d="m22 2-7 19-2-7L3 10z"/><path d="M22 2 11 13"/>
    </svg>
);

const UserIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
);

const CommentItem = ({ comment }) => {
    const rawAvatarPath = comment.user?.profile?.avatar || comment.user?.avatar;
    const avatarUrl = getImageUrl(rawAvatarPath, true);
    const creatorUsername = comment.user?.profile?.username || comment.user?.username || 'Anonymous User';
    const creatorUserId = comment.user?.id || comment.user?.user_id;
    const profileLink = creatorUserId ? `/profile/user/${creatorUserId}` : '#'; 
    
    const formattedDate = comment.created_at
        ? new Date(comment.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'Unknown Date';

    return (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mr-3">
                    {avatarUrl ? (
                        <img 
                            src={avatarUrl} 
                            alt={`${creatorUsername}'s avatar`} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentNode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`; }} 
                        />
                    ) : (
                        <UserIcon className='text-gray-600 w-5 h-5'/>
                    )}
                </div>
                <div>
                    <Link to={profileLink} className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                        {creatorUsername}
                    </Link>
                    <p className="text-xs text-gray-500">{formattedDate}</p>
                </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm mt-2">{comment.text || "Comment text not available."}</p>
        </div>
    );
};

function ArticlePage() {
    const { articleId } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCommentText, setNewCommentText] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    
    const [userToken, setUserToken] = useState(null);
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        setUserToken(token);
        setIsAuthChecked(true);
    }, []);

    useEffect(() => {
        if (!articleId || articleId === 'default') {
            setError("Article ID is missing or invalid.");
            setLoading(false);
            return;
        }
        fetchArticleDetail();
    }, [articleId]);


    const fetchArticleDetail = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${ARTICLE_DETAIL_URL}/${articleId}`);
            if (response.data && response.data.article) {
                setArticle(response.data.article);
            } else {
                setError('Article not found or data format is incorrect.');
            }
        } catch (err) {
            console.error("Error fetching article detail:", err);
            setError(`Failed to load article details: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handlePostComment = async (e) => {
        e.preventDefault();
        
        if (!userToken) {
            console.error("Failed to post comment: User not logged in.");
            return;
        }

        if (!newCommentText.trim()) return;

        setIsPosting(true);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`, 
                }
            };

            const payload = { text: newCommentText };
            
            const response = await axios.post(
                `${COMMENT_POST_URL}/${articleId}`, 
                payload,
                config
            );

            if (response.data.status === 'created') {
                const newCommentData = response.data.new_comment;
                
                const updatedComments = article.comment ? [...article.comment, newCommentData] : [newCommentData];

                setArticle(prevArticle => ({
                    ...prevArticle,
                    comment: updatedComments
                }));

                setNewCommentText('');
            }

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            alert(`Failed to post comment. Error: ${errorMessage}. Invalid or expired token.`);
            console.error(`Failed to post comment. Error: ${errorMessage}. Invalid or expired token.`, err.response || err);
        } finally {
            setIsPosting(false);
        }
    };

    if (loading) {
        return <div className='flex items-center justify-center min-h-screen text-xl font-semibold'>Loading article details...</div>;
    }

    if (error) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen p-8 text-center'>
                <p className='text-2xl text-red-600 mb-4'>Error: {error}</p>
                <button 
                    onClick={() => navigate(-1)} 
                    className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-2'
                >
                    <ArrowLeftIcon className='text-lg'/> Back
                </button>
            </div>
        );
    }

    if (!article) {
        return <div className='flex items-center justify-center min-h-screen text-2xl'>Article not found.</div>;
    }

    const imageUrl = getImageUrl(article.image);
    const creatorUserId = article.user?.id || article.user?.user_id; 
    const profileLink = creatorUserId ? `/profile/user/${creatorUserId}` : '#'; 
    const formattedDate = article.created_at 
        ? new Date(article.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'Unknown Date';
    const creatorUsername = article.user?.profile?.username || article.user?.username || 'Creator Username';
    const comments = article.comment || [];

    const validComments = comments.filter(comment => comment && typeof comment === 'object' && comment.user_id);
    const validCommentCount = validComments.length;
    
    const canPostComment = isAuthChecked && !!userToken;


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
                    <HomeIcon size={28} className='text-gray-600' />
                </Link>

                <h1 className='text-5xl md:text-6xl font-extrabold text-gray-900 mt-4 mb-4'>
                    {article.title ?? 'Title'}
                </h1>
                
                <div className='flex items-center text-base md:text-lg text-gray-700 mb-8 border-b pb-4'>
                    <p>Written by:</p>
                    <Link 
                        to={profileLink} 
                        className='flex items-center mr-4 font-semibold hover:text-blue-600 transition-colors duration-200 cursor-pointer'
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <span className='ml-2'>{creatorUsername}</span>
                    </Link>
                    
                    <span className='font-semibold'>|</span>
                    <span className='ml-4 text-gray-600 flex items-center gap-1'>
                        <ClockIcon className='text-lg'/>
                        {formattedDate}
                    </span>
                </div>
                
                <div className='prose max-w-none text-gray-800 leading-relaxed text-lg mb-10'>
                    <p>{article.content ?? 'Content of the article will be displayed here.'}</p>
                </div>

                <div className='mt-10 pt-8 border-t border-gray-200'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>Comments ({validCommentCount})</h2>

                    <form onSubmit={handlePostComment} className='mb-8 flex'>
                        <textarea
                            className='flex-grow p-3 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Write your comment...'
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            rows="2"
                            required
                            disabled={!canPostComment}
                        />
                        <button
                            type='submit'
                            className='bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center justify-center'
                            disabled={isPosting || !newCommentText.trim() || !canPostComment}
                        >
                            {isPosting ? 'Sending...' : <PaperPlaneIcon className='text-lg' />}
                        </button>
                    </form>
                    
                    {!isAuthChecked && <p className='text-sm text-gray-500 mb-4'>Checking login status...</p>}
                    {isAuthChecked && !userToken && <p className='text-sm text-red-500 mb-4'>You must be logged in to post a comment.</p>}

                    <div className='space-y-6'>
                        {validComments.length > 0 ? (
                            validComments.map((comment, index) => (
                                <CommentItem key={comment.id || index} comment={comment} />
                            ))
                        ) : (
                            <p className='text-gray-500 italic'>No comments yet. Be the first to comment!</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ArticlePage;
