/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { FaHeart } from 'react-icons/fa';
import single from '../../services/user/shop'
import { addcart } from '../../services/user/cart';

const GamecamoPage = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);


    // Toggle wishlist state
    const toggleWishlist = () => {
        setIsInWishlist(!isInWishlist);
        // Optional: Add logic here to save the wishlist state in the backend or localStorage
    }

   
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await single(id);
                setProduct(productData);
            } catch (error) {
                setError('Could not fetch product details.');
            }
        };

        fetchProduct();
    }, [id]);

    // const handleAddToCart = async () => {
    //     if (product) {
    //         const result = await addcart(product._id); // Use the product ID to add to cart
    //         if (result.success) {
    //             alert('Product added to cart successfully!'); // Notify user
    //         } else {
    //             alert(`Failed to add product to cart: ${result.message}`); // Notify error
    //         }
    //     }
    // };

    const handleAddToCart = async () => {
        if (product) {
            const productDetails = {
                productId: product._id,
                name: product.name, 
                price: product.price,
                quantity: 1, 
                images: product.images 
            };
    
            try {
                const result = await addcart(productDetails); 
            } catch (error) {
                alert(`Failed to add product to cart: ${error.message}`) 
            }
        }
    };
    

    if (error) return <div className="text-red-500">{error}</div>; // Render error if any
    if (!product) return <div>Loading...</div>;

    return (
        <div>
            {/* Navbar */}
            <header className="bg-black text-white p-5">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-3xl font-bold">Gamecamo{ }</div>

                    {/* Navbar links */}
                    <nav className="hidden md:flex space-x-5">
                        <a href="/home" className="hover:text-gray-400">HOME</a>
                        <a href="/shop" className="hover:text-gray-400">ACCESSORIES</a>
                        <a href="/about" className="hover:text-gray-400">ABOUT US</a>
                        <a href="/contact" className="hover:text-gray-400">CONTACT US</a>
                    </nav>

                    <div className="hidden md:flex space-x-5">
                        <a href="/" style={{ fontSize: '24px' }}>❤️</a>
                        <a href="/cart" style={{ fontSize: '24px' }}>🛒</a>
                        <a href="/" style={{ fontSize: '24px' }}>👤</a>
                    </div>

                    {/* Hamburger Menu */}
                    <div className="md:hidden">
                        <button onClick={() => setNavOpen(!navOpen)}>
                            {navOpen ? <XIcon className="h-6 w-6 text-white" /> : <MenuIcon className="h-6 w-6 text-white" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden ${navOpen ? 'block' : 'hidden'} space-y-4 text-center bg-black mt-4`}>
                    <a href="/home" className="block hover:text-gray-400">HOME</a>
                    <a href="/shop" className="block hover:text-gray-400">ACCESSORIES</a>
                    <a href="/about" className="block hover:text-gray-400">ABOUT US</a>
                    <a href="/contact" className="block hover:text-gray-400">CONTACT US</a>
                </div>
            </header>

            {/* Product Section */}
            <div className="container mx-auto p-5">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div>
                        <img src={product.images.url} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
                        {/* Optional thumbnails */}
                        {/* <div className="flex space-x-3 mt-4">
                            <img src="xbox-thumb1.jpg" alt="Thumbnail 1" className="w-24 h-24 object-cover rounded-lg" />
                            <img src="xbox-thumb2.jpg" alt="Thumbnail 2" className="w-24 h-24 object-cover rounded-lg" />
                        </div> */}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-center">

                        <h1 className="text-4xl font-bold flex items-center">
                            {product.name}
                            {/* Wishlist Button */}
                            <button
                                className="focus:outline-none ml-5"
                                onClick={toggleWishlist}
                            >
                                <FaHeart
                                    className={`w-8 h-8 transition-colors duration-300 ${isInWishlist ? 'text-red-500' : 'text-white'} `}
                                    style={{
                                        stroke: 'black',
                                        strokeWidth: 20,
                                        fill: isInWishlist ? 'red' : 'white',
                                        outline: 'black',
                                    }}
                                />
                            </button>
                        </h1>
                        <p className="text-xl text-gray-500 mt-4">{product.category}</p>
                        <p className="mt-4">Edition: {product.edition}</p>

                        {/* Price */}
                        <div className="mt-6 flex items-center space-x-2">
                            <span className="text-3xl font-bold text-green-500">₹{product.price}</span>
                        </div>

                        {/* Add to Cart */}
                        <div className="flex items-center space-x-4 mt-6">
                            <button className="bg-green-600 text-white px-5 py-2 rounded-full" onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description and Reviews Section */}
            <div className="container mx-auto p-5 mt-10">
                {/* Description */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold">Description</h2>
                    <p className="mt-4 text-gray-500">
                        {product.description}
                    </p>
                </div>

                {/* Reviews */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold">Reviews</h2>
                    <div className="flex space-x-4 mt-4">
                        <img src="xbox-series-s.jpg" alt="Review product" className="w-16 h-16 object-cover rounded-lg" />
                        <div>
                            <p>5.0 Rating</p>
                            <p className="text-gray-500">"Great product! Worth every penny."</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black text-white py-10 mt-10">
                <div className="container mx-auto text-center">
                    <p className="text-gray-400 mb-5">© 2024 Gamecamo. All Rights Reserved.</p>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="text-gray-400">Privacy Policy</a>
                        <a href="#" className="text-gray-400">Terms & Conditions</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default GamecamoPage;
