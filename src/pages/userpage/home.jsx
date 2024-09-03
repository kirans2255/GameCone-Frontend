// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'

const GamecamoPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
          <li><a href="#" className="block py-2 md:py-0 hover:text-gray-400 text-lg md:text-xl">Accessories</a></li>
          <li><a href="#" className="block py-2 md:py-0 hover:text-gray-400 text-lg md:text-xl">About Us</a></li>
          <li><a href="#" className="block py-2 md:py-0 hover:text-gray-400 text-lg md:text-xl">Contact Us</a></li>
        </ul>
        <div className="hidden md:flex space-x-4 text-white ">
          <a href="#" className="hover:text-gray-400"><FaSearch /></a>
          <a href="#" className="hover:text-gray-400"><FaShoppingCart /></a>
          <a href="#" className="hover:text-gray-400"><FaUser /></a>
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
          <div className="w-1/2 md:w-1/5 p-2">
            <img src="https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png" alt="GTA V" className="rounded-lg shadow-lg" />
            <h3 className="mt-4 text-center text-sm md:text-xl">GTA V</h3>
          </div>
          <div className="w-1/2 md:w-1/5 p-2">
            <img src="https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png" alt="Red Dead Redemption 2" className="rounded-lg shadow-lg" />
            <h3 className="mt-4 text-center text-sm md:text-xl">Red Dead Redemption 2</h3>
          </div>
          <div className="w-1/2 md:w-1/5 p-2">
            <img src="https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg" alt="Cyberpunk 2077" className="rounded-lg shadow-lg" />
            <h3 className="mt-4 text-center text-sm md:text-xl">Cyberpunk 2077</h3>
          </div>
          <div className="w-1/2 md:w-1/5 p-2">
            <img src="https://www.metacritic.com/a/img/catalog/provider/6/12/6-1-881130-52.jpg" alt="FIFA 23" className="rounded-lg shadow-lg" />
            <h3 className="mt-4 text-center text-sm md:text-xl">EA Sports FIFA 23</h3>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 md:px-8 md:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600">See All</button>
        </div>
      </section>
    </div>
  );
};

export default GamecamoPage;
