/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { addProduct, getProduct, editProduct, deleteProduct, getCategories ,searchProducts} from '../../services/admin/login'; // Ensure to import the necessary functions
// import ProductPages from '../adminpage/sort'

const Modal = ({ isOpen, onClose, onSave, product, handleInputChange, handleFileChange, isEditing, categories }) => {
  // eslint-disable-next-line no-unused-vars
  // const [categories, setCategories] = useState([]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit' : 'Add'} Product</h2>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Product Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Product Edition</label>
          <input
            type="text"
            name="edition"
            value={product.edition}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Product Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            {categories.map((category) => (
              <option key={category._id} value={category.CategoryName}>
                {category.CategoryName}
              </option>
            ))}

          </select>
        </div>


        <div className="mb-4">
          <label className="block mb-2 font-semibold">Product Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>


        <div className="mb-4">
          <label className="block mb-2 font-semibold">Product Images</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />

          {product.image && (
            <img
              src={typeof product.image === 'string' ? product.image : URL.createObjectURL(product.image)}
              alt="product preview"
              className="mt-4 w-full h-48 object-cover rounded"
            />
          )}

        </div>

        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2">Cancel</button>
          <button onClick={onSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">{isEditing ? 'Update' : 'Add'} Product</button>
        </div>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', edition: '', category: '', quantity: '', image: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const [selectedCategory, setSelectedCategory] = useState('');
  // console.log("c",categories)



  const fetchCategories = async () => {
    try {
      const result = await getCategories();
      console.log("cat:", result)
      setCategories(result.categories);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const result = await getProduct();
      setProducts(result.products);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setNewProduct({
      ...newProduct,
      image: e.target.files[0],
    });
  };

  
  const handleSearch = async () => {
    try {
      const result = await searchProducts(searchTerm);
      setProducts(result.products);
    } catch (error) {
      console.error('Error searching products:', error.message);
    }
  };


  const handleSaveProduct = async () => {
    try {
      if (isEditing) {
        console.log('newproduct:', newProduct);
        const result = await editProduct(editProductId, newProduct.name, newProduct.price, newProduct.edition, newProduct.category, newProduct.quantity, newProduct.image);
        fetchProducts();
        console.log("result :", result)

        if (result.success) {
          const updatedProducts = products.map((product, index) =>
            index === editIndex ? result.product : product
          );
          setProducts(updatedProducts);
        }
      } else {
        const result = await addProduct(newProduct);
        if (result.success) {
          setProducts([...products, result.product]);
        }
      }
      setNewProduct({ name: '', price: '', edition: '', category: '', quantity: '', image: null });
      setIsModalOpen(false);
      setIsEditing(false);
      setEditIndex(null);
      setEditProductId(null);
    } catch (error) {
      console.error('Error saving product:', error.message);
    }
  };

  const handleOpenDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const result = await deleteProduct(id);
      fetchProducts()
      if (result.success) {
        setProducts(products.filter(product => product._id !== id));
      }
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
    closeDeleteModal();
  };

  const handleEditProduct = (index, product) => {
    setEditIndex(index);
    setEditProductId(product._id);
    setNewProduct({ name: product.name, price: product.price, edition: product.edition, category: product.category, quantity: product.quantity, image: product.images.url || null });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setNewProduct({ name: '', price: '', edition: '', category: '', quantity: '', image: null });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewProduct({ name: '', price: '', edition: '', category: '', quantity: '', image: null });
    setIsEditing(false);
    setEditIndex(null);
  };

  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Navigate('/admin/login');
    }
  }, [Navigate]);


  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">


      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Product Management</h1>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          >
            <FaSearch className="mr-2" /> Search
          </button>
        </div>
        <button onClick={openModal} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"><FaPlus className="mr-2" /> Add Product</button>
        {/* <div>
          <ProductPages />
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-gray-50">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 relative transform hover:scale-105 w-96 mx-auto"
            >
              <div className="relative mb-6">
                {typeof product.images.url === 'string' ? (
                  <img
                    src={product.images.url}
                    alt={product.productName}
                    className="w-80 h-56 object-cover rounded-lg mx-auto"
                  />
                ) : (
                  product.image && (
                    <img
                      src={URL.createObjectURL(product.images.url)}
                      alt={product.productName}
                      className="w-80 h-56 object-cover rounded-lg mx-auto"
                    />
                  )
                )}
                <div className="absolute top-2 right-2 bg-white px-5 py-2 rounded-full shadow-md text-base font-semibold text-gray-700">
                  ₹{product.price}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-lg text-gray-600 mt-2">Edition: {product.edition}</p>
                <p className="text-lg text-gray-600 mt-2">Category: {product.category}</p>
                <p className="text-lg text-gray-600 mt-2">Quantity: {product.quantity}</p>

                <div className="flex justify-center items-center mt-6 space-x-6">
                  <button
                    onClick={() => handleEditProduct(index, product)}
                    className="p-4 bg-yellow-200 rounded-full hover:bg-yellow-400 transition-colors duration-200 flex items-center"
                    aria-label="Edit"
                  >
                    <FaEdit className="text-yellow-600" size={22} />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(product)}
                    className="p-4 bg-red-200 rounded-full hover:bg-red-400 transition-colors duration-200 flex items-center"
                    aria-label="Delete"
                  >
                    <FaTrash className="text-red-600" size={22} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>



        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveProduct}
          product={newProduct}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          isEditing={isEditing}
          categories={categories}
        />

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
              <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
              <p>Are you sure you want to delete {productToDelete?.name}?</p>
              <div className="flex justify-end mt-4">
                <button onClick={closeDeleteModal} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2">Cancel</button>
                <button onClick={() => handleDeleteProduct(productToDelete._id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
