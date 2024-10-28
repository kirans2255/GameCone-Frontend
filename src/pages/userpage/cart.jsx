/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { cart, deleteCart } from '../../services/user/cart'

const CartPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const fetchCart = async () => {
        try {
            const result = await cart();
            if (result && result.cart) {
                setProducts(result.cart.products);
            }
        } catch (error) {
            console.error('Error fetching cart:', error.message);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleDeleteCart = async (product) => {
        try {
            const result = await deleteCart(product._id);
            fetchCart();
            if (result.success) {
                await fetchCart();
                setProducts(products.filter(p => p._id !== product._id));
            } else {
                console.error(result.mess);
            }
        } catch (error) {
            console.error('Error deleting cart:', error.message);
        }
    };


    // const handleIncrease = (index) => {
    //     const updatedProducts = [...products];
    //     updatedProducts[index].quantity += 1;
    //     setProducts(updatedProducts);
    // };

    // const handleDecrease = (index) => {
    //     if (products[index].quantity > 1) {
    //         const updatedProducts = [...products];
    //         updatedProducts[index].quantity -= 1;
    //         setProducts(updatedProducts);
    //     }
    // };




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
                    <a href="/wishlist" style={{ fontSize: '24px' }}>❤️</a>
                    <a href="/cart" style={{ fontSize: '24px' }}>🛒</a>
                    <a href="/user" style={{ fontSize: '24px' }}>👤</a>
                </div>
            </nav>
            <br></br>
            <br></br>

            <h1 className="text-4xl font-bold mb-8 text-left">My Cart</h1>

            <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
                {/* Cart Section */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1 md:w-2/3">
                    {products.length > 0 ? (
                        products.map((product, index) => (
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

                                <FaTrashAlt className="text-red-500 cursor-pointer ml-6" onClick={() => handleDeleteCart(product)} />
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                {/* Billing Section */}
                <div className="w-full md:w-1/3">
                    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Billing Information</h3>
                        <div className="mb-4">
                            {products.map((product) => (
                                <div key={product._id} className="flex justify-between items-center">
                                    <p className="text-lg">{product.name}</p>
                                    <p className="text-lg font-semibold">₹ {product.price}</p>
                                </div>
                            ))}

                            {/* Delivery Fee Section */}
                            <div className="flex justify-between mt-4 text-lg">
                                <p>Delivery Fee</p>
                                {/* <p>₹ {deliveryFee}</p> */}
                            </div>

                            {/* Total Cash Section */}
                            <div className="flex justify-between mt-2 text-lg font-bold">
                                <p>Total Cash</p>
                                <p>₹ {products.reduce((acc, product) => acc + product.price * product.quantity, 0)}</p>
                            </div>
                        </div>

                        <a href="/payment"
                            className="bg-green-600 text-white py-3 rounded-lg w-full mt-4 hover:bg-green-700 transition-all duration-300 inline-block text-center">
                            Continue
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
