import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaHome, FaUserCircle, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import CardItem from '../components/CardItem';

const API_BASE_URL = 'https://vfs90dhv-3000.asse.devtunnels.ms';
const GET_VISIT_PROFILE_URL = `${API_BASE_URL}/profile/user`; 
const AVATAR_PATH_PREFIX = 'upload/avatar/'; 

function ProfileVisit() {
  const { userId } = useParams(); 
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;
    
    if (avatarPath.startsWith('http') || avatarPath.startsWith('data:')) {
        return avatarPath;
    }

    let path = avatarPath;
    path = path.replace(/\\/g, "/"); 
    path = path.replace("public/", ""); 
    path = path.replace(/^\//, ''); 

    if (!path.startsWith(AVATAR_PATH_PREFIX)) {
        path = `${AVATAR_PATH_PREFIX}${path}`;
    }

    return `${API_BASE_URL}/${path}`;
  };
  
  const fetchProfileData = useCallback(async () => {
    if (!userId) {
        setError("User ID tidak ditemukan di URL.");
        setLoading(false);
        return;
    }

    setLoading(true);
    setError(null);
    try {
    
        const response = await axios.get(`${GET_VISIT_PROFILE_URL}/${userId}`);

        const responseData = response.data;

        if (!responseData || responseData.status !== 'success' || !responseData.data) {
            throw new Error("API did not return profile data or user not found.");
        }

        const profileData = responseData.data; 
        const userArticles = profileData.user?.article || []; 

        if (!profileData.id || !profileData.username) {
            throw new Error("Crucial user ID or username is missing from the API response.");
        }

        const fullUser = {
            id: profileData.id,
            username: profileData.username, 
            profile: {
                fullname: profileData.username,
                bio: profileData.bio,
                avatar: profileData.avatar,
            },
            article: userArticles, 
        };

        setUser(fullUser);

        const articlesWithUser = (fullUser.article || []).map(article => ({
            ...article,
            user: { 
                id: fullUser.id,
                username: fullUser.username,
                profile: fullUser.profile,
            }
        }));
        setArticles(articlesWithUser);

    } catch (e) {
        console.error("Error fetching visited profile:", e.response?.data || e.message);
        setError(`Gagal memuat profil: ${e.response?.data?.message || 'Pengguna tidak ditemukan.'}`);
    } finally {
        setLoading(false);
    }
  }, [userId]);


  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);


  const avatarUrl = user ? getAvatarUrl(user.profile?.avatar) : null;


  if (loading) {
    return <div className='min-h-lvh flex items-center justify-center text-4xl font-bold'>Loading Profile...</div>
  }

  if (error) {
    return (
        <div className='min-h-lvh flex flex-col items-center justify-center text-2xl font-bold p-4'>
            <p className='text-red-600 mb-4'>{error}</p>
            <button onClick={() => navigate(-1)} className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-2'>
                <FaArrowLeft /> Kembali
            </button>
        </div>
    )
  }

  return (
    <>
      <div className='flex flex-wrap min-h-lvh flex-col md:flex-row'>

        <div className='h-lvh md:w-1/2 flex items-end bg-white neuro-in'>
          <div className='h-7/10 w-full neuro-st bottom-0 relative flex flex-col px-10 items-center justify-center gap-2'>
            <div className='w-60 h-60 neuro rounded-full absolute left-3/10 md:left-5/14 -top-30 flex items-center justify-center text-gray-500'>
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className='w-full h-full rounded-full object-cover' />
              ) : (
                <FaUserCircle size={100} className='text-gray-400' />
              )}
            </div>
            <h1 className='font-bold text-4xl mt-18 text-gray-500 '>{user.username}</h1>
            <p className='text-lg text-gray-600 text-center'>{user.profile?.bio ?? 'No bio available.'}</p>

        
            <div className='h-10'> {/* Spacer untuk menjaga layout tetap sama */} </div>

            <div className='h-3/10 w-full rounded-md'>
            </div>
          </div>
        </div>

        <div className='h-lvh md:w-1/2 flex flex-col p-4 neuro-st text-gray-500 z-10 overflow-y-auto'>
          <h1 className='text-4xl font-bold mb-6'>Lists of {user.username}'s Article</h1>
          <div className='flex flex-wrap gap-4 justify-center items-start w-full'>
            {articles.length > 0 ? (
              articles.map((article) => (
                <CardItem key={article.id} article={article} />
              ))
            ) : (
              <p className='text-2xl mt-10'>{user.username} No article yet.</p>
            )}
          </div>

          <Link className='absolute neuro-bub top-4 right-4 bg-col text-white p-2 rounded-md' to="/"><FaHome color='gray' size={40}/></Link>
        </div>
      </div>
    </>
  )
}

export default ProfileVisit;