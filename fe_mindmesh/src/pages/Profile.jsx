import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCircle, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import CardItem from '../components/CardItem';
import EditProfileModal from '../components/EditProfileModal'; 

const API_BASE_URL = 'https://vfs90dhv-3000.asse.devtunnels.ms';
const GET_PROFILE_URL = `${API_BASE_URL}/profile/my-profile`;
const EDIT_PROFILE_URL = `${API_BASE_URL}/profile/my-profile/edit`;
const AVATAR_PATH_PREFIX = 'upload/avatar/'; 

function Profile() {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ username: '', bio: '', avatarFile: null }); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

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
  
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ 
      ...prev, 
      [name]: value
    }));
  }, []); 
  
  const handleFileChange = useCallback((e) => {
      setEditData(prev => ({ ...prev, avatarFile: e.target.files[0] }));
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsEditModalOpen(false);
    if (user) {
      setEditData({ username: user.username || '', bio: user.profile.bio || '', avatarFile: null });
    }
    setError(null);
  }, [user]);


  const fetchProfileData = useCallback(async () => {
    const userToken = localStorage.getItem('userToken');

    if (!userToken) {
      setError("User not logged in. Redirecting to login.");
      setLoading(false);
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(GET_PROFILE_URL, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });

      const responseData = response.data;

      if (!responseData || responseData.status !== 'success' || !responseData.data) {
        throw new Error("API did not return profile data or structure is unexpected.");
      }

      const profileData = responseData.data; 
      const userArticles = profileData.user?.article || []; 

      if (!profileData.id || !profileData.username) {
        throw new Error("Crucial user ID or username is missing from the API response.");
      }

      const userId = profileData.id; 
      const username = profileData.username; 
      const fullname = profileData.username; 

      const fullUser = {
        id: userId,
        username: username, 
        profile: {
          fullname: fullname,
          bio: profileData.bio,
          avatar: profileData.avatar,
        },
        article: userArticles, 
      };

      setUser(fullUser);
      setEditData({ username: fullUser.username || '', bio: fullUser.profile.bio || '', avatarFile: null }); 

      const articlesWithUser = (fullUser.article || []).map(article => ({
        ...article,
        user: { username: fullUser.username } 
      }));
      setArticles(articlesWithUser);

      localStorage.setItem('userData', JSON.stringify(fullUser));

    } catch (e) {
      console.error("Error fetching profile:", e.response?.data || e.message);
      let errorMessage = e.response?.data?.message || e.message;

      if (e.response?.status === 401 || e.response?.status === 403 || errorMessage.toLowerCase().includes("invalid") || errorMessage.toLowerCase().includes("expired")) {
        setError("Session expired or token invalid. Redirecting to login...");
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(`Failed to load profile: ${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);


  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);


  const handleEditSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitLoading(true);
    
    const token = localStorage.getItem('userToken');

    if (!user || !token) {
      setError("User not logged in or token missing.");
      setSubmitLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('username', editData.username); 
    formData.append('bio', editData.bio);

    if (editData.avatarFile) {
        formData.append('avatar', editData.avatarFile);
    }

    try {
      const response = await axios.patch(
        EDIT_PROFILE_URL,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.data.status === 'success' && response.data.data) {

        const updatedProfileData = response.data.data;
        const newAvatar = updatedProfileData.avatar || user.profile.avatar;

        const updatedUser = {
          ...user,
          username: updatedProfileData.username || user.username,
          profile: {
            ...user.profile,
            fullname: updatedProfileData.username || user.profile.fullname,
            bio: updatedProfileData.bio || user.profile.bio,
            avatar: newAvatar,
          }
        };

        setUser(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        setIsEditModalOpen(false);
        setError(null);
        setEditData(prev => ({ ...prev, avatarFile: null }));
      } else {
        setError(response.data.message || 'Failed to update profile. Server response incomplete.');
      }
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
      setError(`Update failed: ${err.response?.data?.message || 'Failed to connect to server or unauthorized.'}`);
    } finally {
      setSubmitLoading(false);
    }
  }, [user, editData]);


  const avatarUrl = user ? getAvatarUrl(user.profile?.avatar) : null;


  if (loading || !user) {
    return <div className='min-h-lvh flex items-center justify-center text-4xl font-bold'>{error || 'Loading Profile...'}</div>
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

            <button
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-full flex items-center gap-2 hover:bg-blue-600 transition'
              onClick={() => {
                setEditData({ username: user.username, bio: user.profile.bio, avatarFile: null });
                setError(null);
                setIsEditModalOpen(true);
              }}
            >
              <FaEdit /> Edit Profile
            </button>

            <div className='h-3/10 w-full rounded-md'>
            </div>
          </div>
        </div>

        <div className='h-lvh md:w-1/2 flex flex-col p-4 neuro-st text-gray-500 z-10 overflow-y-auto'>
          <h1 className='text-4xl font-bold mb-6'>Lists of {user.username}'s Article</h1>
          <div className='flex flex-wrap gap-4 justify-center items-start w-full'>
            {articles.length > 0 ? (
              articles.map((article) => (
                <CardItem 
                    key={article.id} 
                    article={article} 
                    isOwner={true} // <-- IMPORTANT: Set to true only on the Profile page
                />
              ))
            ) : (
              <p className='text-2xl mt-10'>No articles published yet.</p>
            )}
          </div>

          <Link className='absolute neuro-bub top-4 right-4 bg-col text-white p-2 rounded-md' to="/"><FaHome color='gray' size={40}/></Link>
        </div>
      </div>

      <EditProfileModal 
            isOpen={isEditModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleEditSubmit}
            editData={editData}
            onInputChange={handleInputChange}
            onFileChange={handleFileChange}
            submitLoading={submitLoading}
            error={error} 
        />
    </>
  )
}

export default Profile;
