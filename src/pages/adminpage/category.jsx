/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { addCategory, getCategories, deleteCategory, editCategory } from '../../services/admin/login';

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
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);


  const fetchCategories = async () => {
    try {
      const result = await getCategories();
      console.log("Categories: ", result);
      setCategories(result.categories);
      console.log('Categories state:', result.categories)
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [])


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

  const DeleteModal = ({ isOpen, onClose, onDelete, category }) => {
    if (!isOpen) return null;


    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <div className="mb-4">
            <p>Are you sure you want to delete this category?</p>
          </div>
          <div className="mb-4 flex flex-col items-center">
            {category && category.CategoryImage.url && (
              <img
                src={category.CategoryImage.url}
                alt={category.CategoryName}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
            )}
            <h3 className="text-lg font-semibold">{category.CategoryName}</h3>
          </div>
          <div className="flex justify-end">
            <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2">
              Cancel
            </button>
            <button onClick={() => { onDelete(category._id); onClose(); }} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>

    );
  };


  const handleDeleteCategory = async (id) => {
    try {
      const result = await deleteCategory(id);
      fetchCategories();

      if (result.success) {
        setCategories(categories.filter(category => category._id !== id));
        // setIsDeleteModalOpen(false);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting category:', error.message);
    }
  };


  const handleSaveCategory = async () => {
    try {
      if (isEditing) {
        // Edit the category
        console.log('newCategory:', newCategory);
        const result = await editCategory(editCategoryId, newCategory.name, newCategory.image);
        fetchCategories();
        console.log("result :", result);

        if (result.success) {
          const updatedCategories = categories.map((category, index) =>
            index === editIndex ? result.category : category
          );
          setCategories(updatedCategories);
        }
      }
      setNewCategory({ name: '', image: null });
      setIsModalOpen(false);
      setIsEditing(false);
      setEditIndex(null);
      setEditCategoryId(null);
    } catch (error) {
      console.error('Error saving category:', error.message);
    }
  };

  const handleOpenDeleteModal = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };



  const handleEditCategory = (index, category) => {
    setEditIndex(index);
    setEditCategoryId(category._id);
    setNewCategory({ name: category.CategoryName, image: null });
    setIsEditing(true);
    setIsModalOpen(true);
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

  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      Navigate('/admin/login')
    }
  }, [Navigate])



  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">

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

        <div className="bg-white p-4 shadow-md rounded">
          <h2 className="text-xl font-semibold mb-4">Categories List</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <li key={index} className="border p-4 rounded bg-gray-50">
                <div className="mb-4">
                  {typeof category.CategoryImage.url === 'string' ? (
                    <img
                      src={category.CategoryImage.url}
                      alt={category.CategoryName}
                      className="w-full h-64 object-cover rounded"
                    />
                  ) : (
                    category.image && (
                      <img
                        src={URL.createObjectURL(category.CategoryImage.url)}
                        alt={category.CategoryName}
                        className="w-full h-64 object-cover rounded"
                      />
                    )
                  )}
                </div>
                <div className="text-center font-semibold text-xl">{category.CategoryName}</div>
                <div className="flex justify-center mt-4">
                  <button onClick={() => handleEditCategory(index, category)} className="text-blue-500 mr-4"><FaEdit size={20} /></button>
                  <button onClick={() => handleOpenDeleteModal(category)} className="text-red-500"><FaTrash size={20} /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={isEditing ? handleSaveCategory : handleAddCategory}
        category={newCategory}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        isEditing={isEditing}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteCategory}
        category={categoryToDelete}
      />

    </div>
  );
};

export default CategoryPage;
