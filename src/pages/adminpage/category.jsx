/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaGamepad, FaClipboardList, FaUsers, FaChartLine, FaCog, FaSignOutAlt, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import {addCategory} from '../../services/admin/login';

const Modal = ({ isOpen, onClose, onSave, category, handleInputChange, handleFileChange, isEditing }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit' : 'Add'} Category</h2>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Category Name</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Category Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          {category.image && (
            <img
              src={URL.createObjectURL(category.image)}
              alt="Category Preview"
              className="mt-4 w-full h-48 object-cover rounded"
            />
          )}
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2">Cancel</button>
          <button onClick={onSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">{isEditing ? 'Update' : 'Add'} Category</button>
        </div>
      </div>
    </div>
  );
};

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', image: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setNewCategory({
      ...newCategory,
      image: e.target.files[0],
    });
  };

  const handleAddCategory = async () => {
    try {
      const result = await addCategory(newCategory);
      if (result.success) {
        if (isEditing) {
          const updatedCategories = categories.map((category, index) =>
            index === editIndex ? result.category : category
          );
          setCategories(updatedCategories);
          setIsEditing(false);
          setEditIndex(null);
        } else {
          setCategories([...categories, result.category]);
        }
        setNewCategory({ name: '', image: null });
        setIsModalOpen(false);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error adding category:', error.message);
    }
  };
  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setNewCategory({ name: '', image: null });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewCategory({ name: '', image: null });
    setIsEditing(false);
    setEditIndex(null);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold">Admin Dashboard</div>
        <nav className="flex-1">
          <ul>
            <li><Link to="/admin/dashboard" className="flex items-center p-4 hover:bg-gray-700"><FaHome className="mr-3" /> Overview</Link></li>
            <li><Link to="/consoles" className="flex items-center p-4 hover:bg-gray-700"><FaGamepad className="mr-3" /> Consoles</Link></li>
            <li><Link to="/admin/orders" className="flex items-center p-4 hover:bg-gray-700"><FaClipboardList className="mr-3" /> Orders</Link></li>
            <li><Link to="/users" className="flex items-center p-4 hover:bg-gray-700"><FaUsers className="mr-3" /> Users</Link></li>
            <li><Link to="/reports" className="flex items-center p-4 hover:bg-gray-700"><FaChartLine className="mr-3" /> Category</Link></li>
            <li><Link to="/settings" className="flex items-center p-4 hover:bg-gray-700"><FaCog className="mr-3" /> Settings</Link></li>
          </ul>
        </nav>

        <div className="p-4">
          <button
            className="w-full flex items-center justify-center p-4 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

        <div className="flex justify-end mb-6">
          <button
            onClick={openModal}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add Category
          </button>
        </div>

        {/* Categories List */}
        <div className="bg-white p-4 shadow-md rounded">
          <h2 className="text-xl font-semibold mb-4">Categories List</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <li key={index} className="border p-4 rounded bg-gray-50">
                <div className="mb-4">
                  <img
                    src={URL.createObjectURL(category.image)}
                    alt={category.name}
                    className="w-full h-64 object-cover rounded"  // Adjusted height and width
                  />
                </div>
                <div className="text-center font-semibold">{category.name}</div>
                <div className="flex justify-center mt-4">
                  <button onClick={() => handleEditCategory(index)} className="text-yellow-500 mr-4"><FaEdit /></button>
                  <button onClick={() => handleDeleteCategory(index)} className="text-red-500"><FaTrash /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleAddCategory}
        category={newCategory}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        isEditing={isEditing}
      />
    </div>
  );
};

export default CategoryPage;
