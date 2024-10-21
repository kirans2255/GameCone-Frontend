/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { wishlist, deleteWishlist } from '../../services/user/wishlist';

const WishlistPage = () => {
    const [products, setProducts] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    const fetchWishlist = async () => {
        try {
            const result = await wishlist();
            if (result && result.wishlist) {
                setProducts(result.wishlist.products);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error.message);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);


    const handleDeleteWishlist = async (product) => {
        try {
            const result = await deleteWishlist(product._id);
            fetchWishlist()
            if (result.success) {
                setProducts(products.filter(p => p._id !== product._id));
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error deleting wishlist item:', error.message);
        }
    };


    return (
        <div className="min-h-screen bg-black text-white p-4">
            <nav className="flex items-center justify-between p-4">
                <div className="text-2xl font-bold">Gamecamo</div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-400 hover:text-gray-300 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
                <ul className={`md:flex md:space-x-8 ${isOpen ? 'block' : 'hidden'} absolute md:static top-16 left-0 w-full bg-black md:bg-transparent z-20 md:z-auto p-4 md:p-0 md:justify-center`}>
                    <li><a href="/home" className="block py-2 md:py-0 hover:text-gray-400 text-lg md:text-xl">Home</a></li>
                    <li><a href="/shop" className="block py-2 md:py-0 hover:text-gray-400 text-lg md:text-xl">Accessories</a></li>
                    <li><a href="#" className="block py-2 md:py-0 hover:text-gray-400 text-lg md:text-xl">About Us</a></li>
                    <li><a href="#" className="block py-2 md:py-0 hover:text-gray-400 text-lg md:text-xl">Contact Us</a></li>
                </ul>
                <div className="hidden md:flex space-x-5">
                    <a href="/" style={{ fontSize: '24px' }}>❤️</a>
                    <a href="/cart" style={{ fontSize: '24px' }}>🛒</a>
                    <a href="/user" style={{ fontSize: '24px' }}>👤</a>
                </div>
            </nav>

            <br></br>
            <br></br>

            <h1 className="text-4xl font-bold mb-8 text-left">My Wishlist</h1>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <img
                                    src={product.images.url}
                                    alt={product.name}
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                                <div className="ml-6">
                                    <h3 className="text-xl font-semibold">{product.name}</h3>
                                    <p className="text-lg text-gray-400 mt-2">₹ {product.price}</p>
                                </div>
                            </div>
                            <FaTrashAlt
                                className="text-red-500 cursor-pointer ml-6"
                                onClick={() => handleDeleteWishlist(product)}
                            />
                        </div>
                    ))
                ) : (
                    <p>Your wishlist is empty.</p>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
