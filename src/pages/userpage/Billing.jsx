/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const BillingPage = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [coupon, setCoupon] = useState('');
    const [address, setAddress] = useState(null);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(''); // New state for payment method

    const handleCouponChange = (e) => setCoupon(e.target.value);
    const handleAddressChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

    const handleCheckout = () => {
        console.log("Checkout with:", { products, coupon, address, paymentMethod });
    };

    const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Navbar */}
            <header className="bg-black text-white p-5">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-3xl font-bold">Gamecamo</div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-5">
                        <a href="/home" className="hover:text-gray-400">HOME</a>
                        <a href="/shop" className="hover:text-gray-400">ACCESSORIES</a>
                        <a href="/about" className="hover:text-gray-400">ABOUT US</a>
                        <a href="/contact" className="hover:text-gray-400">CONTACT US</a>
                    </nav>

                    {/* Icons */}
                    <div className="hidden md:flex space-x-5">
                        <a href="/wishlist" style={{ fontSize: '24px' }}>❤️</a>
                        <a href="/cart" style={{ fontSize: '24px' }}>🛒</a>
                        <a href="/user" style={{ fontSize: '24px' }}>👤</a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setNavOpen(!navOpen)}>
                            {navOpen ? <XIcon className="h-6 w-6 text-white" /> : <MenuIcon className="h-6 w-6 text-white" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden ${navOpen ? 'block' : 'hidden'} bg-black mt-4 p-5`}>
                    <nav className="flex flex-col space-y-4 text-center">
                        <a href="/home" className="text-white hover:text-gray-400">HOME</a>
                        <a href="/shop" className="text-white hover:text-gray-400">ACCESSORIES</a>
                        <a href="/about" className="text-white hover:text-gray-400">ABOUT US</a>
                        <a href="/contact" className="text-white hover:text-gray-400">CONTACT US</a>
                    </nav>
                    <div className="flex justify-center space-x-5 mt-4">
                        <a href="/wishlist" className="text-white" style={{ fontSize: '24px' }}>❤️</a>
                        <a href="/cart" className="text-white" style={{ fontSize: '24px' }}>🛒</a>
                        <a href="/user" className="text-white" style={{ fontSize: '24px' }}>👤</a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row justify-center p-6">
                {/* Product List Section */}
                <div className="w-full md:w-2/3 bg-white p-6 shadow-lg rounded-lg mb-6 md:mb-0">
                    <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
                    {products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                                <div>
                                    <h3 className="font-semibold text-lg">{product.name}</h3>
                                    <p className="text-gray-500 text-sm">{product.size}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-lg font-medium">{product.quantity}</span>
                                <span className="text-lg font-semibold">${(product.price * product.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between mt-6 text-lg font-semibold">
                        <span>Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>



                {/* Payment and Address Section */}
                <div className="w-full md:w-1/3 bg-white p-6 shadow-lg rounded-lg ml-0 md:ml-6">
                    <h2 className="text-3xl font-bold mb-6">Billing Info</h2>



                    {/* Coupon Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Apply Coupon</h3>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Enter coupon code"
                                value={coupon}
                                onChange={handleCouponChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                            />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Apply
                            </button>
                        </div>
                    </div>


                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                        {address ? (
                            <div>
                                <p className="text-gray-600">{address.name}</p>
                                <p className="text-gray-600">{address.street}</p>
                                <p className="text-gray-600">{address.city}, {address.state} {address.zip}</p>
                                <p className="text-gray-600">{address.country}</p>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAddressModalOpen(true)}
                                className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 mt-4"
                            >
                                Add Address
                            </button>
                        )}
                    </div>

                    {/* Payment Method Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                        <label className="flex items-center mb-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Razorpay"
                                checked={paymentMethod === 'Razorpay'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mr-2"
                            />
                            Razorpay
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Cash on Delivery"
                                checked={paymentMethod === 'Cash on Delivery'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mr-2"
                            />
                            Cash on Delivery
                        </label>
                    </div>

                    {/* Checkout Button */}
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700"
                    >
                        Checkout
                    </button>
                </div>
            </div>
            {isAddressModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Add Address</h2>
                        <form>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handleAddressChange}
                                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                            />
                            <input
                                type="text"
                                name="street"
                                placeholder="Street"
                                onChange={handleAddressChange}
                                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                onChange={handleAddressChange}
                                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                            />
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                onChange={handleAddressChange}
                                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                            />
                            <input
                                type="text"
                                name="zip"
                                placeholder="Zip Code"
                                onChange={handleAddressChange}
                                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                            />
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                onChange={handleAddressChange}
                                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAddressModalOpen(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsAddressModalOpen(false);
                                    }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Save Address
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillingPage;
