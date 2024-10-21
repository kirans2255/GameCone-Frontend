/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
// import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'
import { getProduct } from '../../services/admin/login';

const GamecamoPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [products, setProducts] = useState([])

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

  return (
    <div className="bg-black text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold">Gamecamo</div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-400 hover:text-gray-300 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <ul className={`md:flex md:space-x-8 ${isOpen ? 'block' : 'hidden'} absolute md:static top-16 left-0 w-full bg-black md:bg-transparent z-20 md:z-auto p-4 md:p-0 md:justify-center`}>
          <li><a href="#" className="block py-2 md:py-0 hover:text-gray-400 text-lg md:text-xl">Home</a></li>
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

      {/* Hero Section */}
      <header className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://res-console.cloudinary.com/dewwgy7px/thumbnails/v1/image/upload/v1724997921/V2hhdHNBcHBfSW1hZ2VfMjAyNC0wOC0xM19hdF8xOC4xMy40Ml9mZmZlYjczNF9mamUwcGE=/drilldown')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold uppercase">Elevate Your Gaming Experience</h1>
          <p className="mt-4 text-sm md:text-lg max-w-2xl mx-auto">In a world where magic meets technology, join a group of warriors, rogues, and mages in the battle against the shadow empire...</p>
        </div>
      </header>

      {/* Game Showcase */}
      <section className="px-4 md:px-8 py-2">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Currently Trending Games</h2>
        <div className="flex flex-wrap justify-center md:justify-between">
          {products.map((product) => (
            <div key={product.id} className="w-1/2 md:w-1/6">
              <img
                src={product.images.url}
                alt={product.name}
                className="h-full w-full object-cover rounded-lg shadow-lg" // Adjust the height as needed
              />
              <h3 className="mt-4 text-center text-sm md:text-xl">{product.name}</h3>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 md:px-8 md:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600">See All</button>
        </div>
      </section>

      <div className="font-sans">
        {/* Racing Wheel Section */}
        <section className="bg-black text-white p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <img
              src="https://jvgelectronics.in/storage/product/1709371341img1.png"
              alt="Racing Wheel"
              className="max-w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-4xl font-bold">
              Ultimate Driving Experience: Rent a Pro Racing Wheel
            </h2>
            <p className="mt-4 text-lg">
              A gaming racing wheel provides a realistic driving experience by mimicking the feel of steering, accelerating, and braking in racing games. With features like force feedback and pedal sets, it enhances immersion and control for gamers seeking a more authentic racing simulation.<br /> <br /> <br />This racing wheel is available for rent . Experience realistic driving without the commitment!
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded mt-6">
              Rent Now
            </button>
          </div>
        </section>

        {/* Gaming Bundle Section */}
        <section className="bg-cover bg-center text-white py-56"
          style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/retro-wave-gamepad-cyberpunk-style_74102-5513.jpg')" }}>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-20">
              Ultimate Gaming Bundle: PS4 Console with VR and More
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-40">
              Experience immersive gaming with a PS4 console, a selection of PC Game DVDs, and a VR setup. Dive into action-packed adventures and explore virtual worlds like never before.
            </p>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  🎮
                </div>
                <p>Mobile Game Development</p>
              </div>
              <div className="text-center">
                <div className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  💻
                </div>
                <p>PC Game Development</p>
              </div>
              <div className="text-center">
                <div className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  🕹️
                </div>
                <p>VR Games</p>
              </div>
              <div className="text-center">
                <div className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  🎮
                </div>
                <p>PS5 Game Development</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-black text-white py-16">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">
              Trusted by Thousands of Happy Customers
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800 p-8 rounded">
                <p className="text-xl italic mb-4">
                  "An amazing UI for any gamer..."
                </p>
                <div className="flex items-center justify-center">
                  <div className="rounded-full bg-white h-12 w-12 mr-4"></div>
                  <p className="font-bold">Rishab Shetty</p>
                </div>
              </div>
              <div className="bg-gray-800 p-8 rounded">
                <p className="text-xl italic mb-4">
                  "The real-time console feedback is stunning..."
                </p>
                <div className="flex items-center justify-center">
                  <div className="rounded-full bg-white h-12 w-12 mr-4"></div>
                  <p className="font-bold">Yasika Chitaly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h4 className="text-2xl font-bold text-white mb-2">CAMOS LAB</h4>
              <p className="text-sm">
                Lorem ipsum is simply dummy text of the printing and typesetting industry.
              </p>
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
    </div>


  );
};

export default GamecamoPage;
