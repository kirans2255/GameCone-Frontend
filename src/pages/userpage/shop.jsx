/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { getProduct } from '../../services/admin/login';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import { getSort, filterProducts, searchProducts } from '../../services/admin/login';
import { FaSearch } from 'react-icons/fa';
import { Slider } from 'antd';

const ShopPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [sortOrder, setSortOrder] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [searchTerm, setSearchTerm] = useState('');


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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

    const navigate = useNavigate();

    const handleRentNow = (id) => {
        navigate(`/single/${id}`);
    };

    // Pagination handlers
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };


    useEffect(() => {
        if (sortOrder) {
            handleSort();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortOrder]);

    const handleSort = async () => {
        try {
            console.log('Current sort order:', sortOrder);
            const result = await getSort(sortOrder);
            console.log('Fetched products:', result);
            setProducts(result.products);
        } catch (error) {
            console.error('Error fetching sorted products:', error.message);
        }
    };

    const handleSearch = async () => {
        try {
            const result = await searchProducts(searchTerm);
            setProducts(result.products);
            setCategories(result.categories)
        } catch (error) {
            console.error('Error searching products:', error.message);
        }
    };

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);



    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    const handlePriceFilter = async () => {
        try {
            const result = await filterProducts(priceRange);
            if (result.success) {
                setFilteredProducts(result.products);
            }
        } catch (error) {
            console.error('Error fetching filtered products:', error.message);
        }
    };


    // Get the products for the current page
    const currentProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    return (
        <div className="bg-black text-white">
            {/* Header */}
            <header className="flex justify-between items-center px-10 py-5 bg-black border-b border-gray-700">
                <div className="text-2xl font-bold">Gamecamo</div>
                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-5">
                    <a href="/home" className="hover:text-gray-400">HOME</a>
                    <a href="/shop" className="hover:text-gray-400">ACCESSORIES</a>
                    <a href="#" className="hover:text-gray-400">ABOUT US</a>
                    <a href="#" className="hover:text-gray-400">CONTACT US</a>
                </nav>
                {/* Icons */}
                <div className="hidden md:flex space-x-5">
                    <a href="/" style={{ fontSize: '24px' }}>❤️</a>
                    <a href="/cart" style={{ fontSize: '24px' }}>🛒</a>
                    <a href="/user" style={{ fontSize: '24px' }}>👤</a>
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="md:hidden bg-black text-white px-5 py-3 border-t border-gray-700">
                    <a href="/home" className="block py-2 hover:text-gray-400">HOME</a>
                    <a href="/shop" className="block py-2 hover:text-gray-400">ACCESSORIES</a>
                    <a href="#" className="block py-2 hover:text-gray-400">ABOUT US</a>
                    <a href="#" className="block py-2 hover:text-gray-400">CONTACT US</a>
                </nav>
            )}

            {/* Main Content Area */}
            <div className="flex px-10 py-10">
                <aside className="w-full lg:w-1/4 p-6 bg-gray-900 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Filter & Sort</h2>

                    {/* Search Bar */}
                    <div className="flex space-x-4 mb-4">
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 border rounded text-black"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
                        >
                            <FaSearch className="mr-2" /> Search
                        </button>
                    </div>

                    {/* Sort Options */}
                    <div className="mb-6">
                        <label className="block font-semibold mb-2">Sort By:</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="w-full p-2 border rounded bg-gray-700 text-white focus:outline-none"
                        >
                            <option value="">Select Sorting</option>
                            <option value="priceLowToHigh">Price: Low to High</option>
                            <option value="priceHighToLow">Price: High to Low</option>
                            <option value="nameAtoZ">Name: A to Z</option>
                            <option value="nameZtoA">Name: Z to A</option>
                        </select>
                    </div>

                    {/* Price Filter */}
                    <div className="mb-6">
                        <label className="block font-semibold mb-2">Filter by Price:</label>
                        <Slider
                            range
                            value={priceRange}
                            onChange={handlePriceChange}
                            min={0}
                            max={1000}
                            step={10}
                            className="mb-4"
                        />
                        <div className="flex justify-between">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                        </div>
                        <button
                            onClick={handlePriceFilter}
                            className="bg-green-600 text-white px-4 py-2 rounded mt-2 w-full"
                        >
                            Apply Filter
                        </button>
                    </div>
                </aside>

                {/* Product Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-full ml-6">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="relative">
                            <div className="bg-gray-800 rounded-lg p-5 relative shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
                                <img src={product.images.url} alt={product.name} className="w-full h-72 object-cover rounded-lg" />
                                <h3 className="text-lg font-semibold mt-4">{product.name}</h3>

                                {/* Price Tag */}
                                <div className="absolute top-4 right-4 bg-orange-500 px-3 py-1 rounded-full shadow-md text-lg font-bold text-white">
                                    ₹{product.price}
                                </div>

                                <div className="flex space-x-2 mt-4">
                                    <button
                                        className="flex-1 bg-black hover:bg-orange-500 text-white text-lg py-2 rounded-lg transition duration-300"
                                        onClick={() => handleRentNow(product._id)}
                                    >
                                        Rent Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            {/* Pagination */}
            <div className="flex justify-center py-10">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={products.length}
                    onChange={handlePageChange}
                    showSizeChanger
                />
            </div>

            {/* Footer Section */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h4 className="text-2xl font-bold text-white mb-2">CAMOS LAB</h4>
                        <p className="text-sm">Lorem is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="text-sm mb-4 md:mb-0">
                            <h5 className="text-white font-bold mb-2">About</h5>
                            <p>About Us</p>
                            <p>Projects</p>
                            <p>Contact</p>
                        </div>
                        <div className="text-sm">
                            <h5 className="text-white font-bold mb-2">Contact</h5>
                            <p>Lorem ipsum</p>
                            <p>dummy text</p>
                            <p>+123-456-7890</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    );
};

export default ShopPage;
