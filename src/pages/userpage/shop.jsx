/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { getProduct } from '../../services/admin/login';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';

const ShopPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);

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

    // Get the products for the current page
    const currentProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
                    <a href="/" style={{ fontSize: '24px' }}>👤</a>
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

            {/* Banner Section */}
            <section className="text-center py-12">
                <h2 className="text-4xl font-bold">Our Impressive Collection of Games</h2>
                <p className="text-gray-400 mt-4">Ranging from the latest PS5 games to Xbox adventures, we have it all!</p>
                <div className="flex justify-center space-x-3 mt-5">
                    <button className="px-4 py-2 bg-white text-black rounded-full">Popular Products</button>
                    <button className="px-4 py-2 bg-gray-800 text-white rounded-full">Consoles</button>
                    <button className="px-4 py-2 bg-gray-800 text-white rounded-full">VR</button>
                    <button className="px-4 py-2 bg-gray-800 text-white rounded-full">More</button>
                </div>
            </section>

            {/* Product Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 px-5 py-10">
                {currentProducts.map((product) => (
                    <div key={product.id} className="relative">
                        <div className="bg-gray-800 rounded-lg p-5 relative shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 w-[400px] mx-auto">
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
