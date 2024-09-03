// eslint-disable-next-line no-unused-vars
import React,{useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaGamepad, FaClipboardList, FaUsers, FaChartLine, FaCog ,FaSignOutAlt} from 'react-icons/fa';

const AdminDashboard = () => {

    const Navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            Navigate('/admin/login')
        }
    },[Navigate])

    const handleLogout = () => {
        localStorage.removeItem('token');
        Navigate('/admin/login');
      };
    
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold">Admin Dashboard</div>
        <nav className="flex-1">
          <ul>
            <li><Link to="/admin/dashboard" className="flex items-center p-4 hover:bg-gray-700"><FaHome className="mr-3" /> Overview</Link></li>
            <li><Link to="/consoles" className="flex items-center p-4 hover:bg-gray-700"><FaGamepad className="mr-3" /> Consoles</Link></li>
            <li><Link to="/admin/orders" className="flex items-center p-4 hover:bg-gray-700"><FaClipboardList className="mr-3" /> Orders</Link></li>
            <li><Link to="/users" className="flex items-center p-4 hover:bg-gray-700"><FaUsers className="mr-3" /> Users</Link></li>
            <li><Link to="/admin/category" className="flex items-center p-4 hover:bg-gray-700"><FaChartLine className="mr-3" /> Category</Link></li>
            <li><Link to="/settings" className="flex items-center p-4 hover:bg-gray-700"><FaCog className="mr-3" /> Settings</Link></li>
          </ul>
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-4 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </div>

      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
        {/* Add your overview components here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
