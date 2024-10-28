/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { FaHeart } from 'react-icons/fa';
import single from '../../services/user/shop'
import { addcart, cart } from '../../services/user/cart';
import { addwishlist, wishlist, deleteWishlist } from '../../services/user/wishlist';

const GamecamoPage = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchProductAndCart = async () => {
            try {
                const productData = await single(id);
                setProduct(productData);

                const cartData = await cart();

                const isProductInCart = cartData.cart.products.some(cartItem => cartItem.productId === productData._id);
                setIsAddedToCart(isProductInCart)
            } catch (error) {
                setError('Could not fetch product or cart details.');
            }
        };

        fetchProductAndCart();
    }, [id]);

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
                if (result.success) {
                    setIsAddedToCart(true);
                }
            } catch (error) {
                alert(`Failed to add product to cart: ${error.message}`);
            }
        }
    };




    const handleToggleWishlist = async () => {
        const productDetails = {
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            images: product.images
        };

        try {
            if (isInWishlist) {
                // Remove from wishlist
                const result = await deleteWishlist(product._id);
                if (result.success) {
                    setIsInWishlist(false);
                } else {
                    console.error(result.message);
                }
            } else {
                // Add to wishlist
                const result = await addwishlist(productDetails);
                
                if (result.success) {
                    setIsInWishlist(true);
                }
            }
        } catch (error) {
            alert(`Failed to toggle wishlist: ${error.message}`);
        }
    };


    const handleGoToCart = () => {
        navigate('/cart');
    }


    if (error) return <div className="text-red-500">{error}</div>;
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
                        <a href="/wishlist" style={{ fontSize: '24px' }}>❤️</a>
                        <a href="/cart" style={{ fontSize: '24px' }}>🛒</a>
                        <a href="/user" style={{ fontSize: '24px' }}>👤</a>
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
                            <button className="focus:outline-none ml-5" onClick={handleToggleWishlist}>
                                <FaHeart className={`w-8 h-8 transition-colors duration-300 ${isInWishlist ? 'text-red-500' : 'text-gray-400'}`} />
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
                            {isAddedToCart ? (
                                <button className="bg-white text-black-800 font-bold border border-green-600 px-5 py-2 rounded-full" onClick={handleGoToCart}>
                                    🛒   Go to Cart
                                </button>
                            ) : (
                                <button className="bg-green-600 text-white px-5 py-2 rounded-full" onClick={handleAddToCart}>
                                    Add to Cart
                                </button>
                            )}
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
