/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import users from '../../services/user/user'
import { Logout } from '../../services/user/login'
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();


  // Form state to track changes in input fields
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    profilePicture: '',
  });


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  // Function to fetch user data from backend API
  const fetchUserData = async () => {
    setLoading(true); // Set loading to true at the start

    try {
      const userData = await users(); // Call the updated user function directly
      setUser(userData); // No need to access response.data here
      setEditForm({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        profilePicture: userData.profilePicture || 'https://via.placeholder.com/150',
      });
    } catch (err) {
      console.error(err); // Log error for debugging
      setError('Error fetching user data');
    } finally {
      setLoading(false); // Ensure loading is set to false in all cases
    }
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditForm((prev) => ({ ...prev, profilePicture: imageUrl }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Updated user details:', editForm);
    toggleEditModal();
  };

  const handleLogout = async () => {
    try {
      await Logout();
      navigate('/home')
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="text-2xl font-bold text-white">Gamecamo</div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-400 hover:text-gray-300 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <ul
          className={`md:flex md:space-x-8 ${isOpen ? 'block' : 'hidden'
            } absolute md:static top-16 left-0 w-full bg-black md:bg-transparent z-20 md:z-auto p-4 md:p-0 md:justify-center`}
        >
          <li><a href="/home" className="block py-2 md:py-0 hover:text-gray-400 text-lg">Home</a></li>
          <li><a href="/shop" className="block py-2 md:py-0 hover:text-gray-400 text-lg">Accessories</a></li>
          <li><a href="#" className="block py-2 md:py-0 hover:text-gray-400 text-lg">About Us</a></li>
          <li><a href="#" className="block py-2 md:py-0 hover:text-gray-400 text-lg">Contact Us</a></li>
        </ul>
        <div className="hidden md:flex space-x-5">
          <a href="/" className="text-xl">❤️</a>
          <a href="/cart" className="text-xl">🛒</a>
          <a href="/user" className="text-xl">👤</a>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="flex justify-center mt-40">
        <div className="bg-white text-black rounded-lg shadow-lg overflow-hidden max-w-lg w-full">
          {/* Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>

          {/* Profile Image */}
          <div className="flex justify-center -mt-16">
            <img
              className="h-32 w-32 rounded-full border-4 border-white object-cover"
              src={user.profilePicture || 'https://via.placeholder.com/150'}
              alt="Profile"
            />
          </div>

          {/* User Information */}
          <div className="text-center px-6 py-4">
            <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
            {/* <p className="text-gray-500 mt-2">{user.bio || 'No bio available'}</p> */}
            <div className="flex justify-center space-x-5 mt-4 text-gray-600">
              <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
              {/* <p><strong>Joined:</strong> {user.joined || 'Unknown'}</p> */}
            </div>
            <p className="text-gray-600 mt-4"><strong>Email:</strong> {user.email}</p>

            <button
              className="mt-5 px-8 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              onClick={toggleEditModal}
            >
              Edit Profile
            </button>
            <br></br>
            <button
              className="mt-5 px-8 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture</label>
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                {editForm.profilePicture && (
                  <img
                    src={editForm.profilePicture}
                    alt="Preview"
                    className="mt-4 h-32 w-32 rounded-full object-cover"
                  />
                )}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={toggleEditModal}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
