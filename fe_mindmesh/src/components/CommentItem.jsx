import React from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'https://vfs90dhv-3000.asse.devtunnels.ms';
const AVATAR_PATH_PREFIX = 'upload/avatar/';
const API_DOMAIN = API_BASE_URL;

const UserIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
);

// Fungsi getImageUrl yang dibutuhkan oleh CommentItem
const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    let fixedPath = imagePath.replace(/\\/g, "/");
    fixedPath = fixedPath.replace("public/", "");
    
    const prefix = AVATAR_PATH_PREFIX;
    fixedPath = `${prefix}${fixedPath.replace(/^\//, '')}`;

    return `${API_DOMAIN}/${fixedPath.replace(/^\//, '')}`;
};


function CommentItem({ comment }) {
    if (!comment || typeof comment !== 'object' || !comment.user_id) {
        return <div className='p-3 bg-red-100 text-red-700 rounded-lg text-sm'>Comment data is invalid.</div>;
    }

    // 1. Ambil data pengguna sesuai struktur JSON yang disajikan
    const userProfile = comment.user?.profile;
    
    const creatorUsername = userProfile?.username || comment.user?.username || 'Anonymous User';
    const creatorUserId = userProfile?.user_id || comment.user?.user_id || comment.user_id;
    const rawAvatarPath = userProfile?.avatar;
    
    // 2. Gunakan getImageUrl untuk mendapatkan URL avatar
    const avatarUrl = rawAvatarPath ? getImageUrl(rawAvatarPath) : null;
    
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
}

export default CommentItem;