import React from 'react';

const EditProfileModal = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    editData, 
    onInputChange, 
    onFileChange, 
    submitLoading, 
    error 
}) => {
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Profile</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        {/* INPUT UNTUK USERNAME */}
                        <label className="block text-gray-700 font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            name="username" 
                            value={editData.username}
                            onChange={onInputChange} 
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Bio</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded"
                            name="bio"
                            value={editData.bio}
                            onChange={onInputChange}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Change Avatar (Optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full p-2 border border-gray-300 rounded"
                            onChange={onFileChange}
                        />
                        {editData.avatarFile && <p className='text-sm text-green-600 mt-1'>File selected: {editData.avatarFile.name}</p>}
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose} 
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                            disabled={submitLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
                            disabled={submitLoading}
                        >
                            {submitLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Menggunakan React.memo untuk menstabilkan modal dan mencegah kehilangan fokus
export default React.memo(EditProfileModal);