// eslint-disable-next-line no-unused-vars
import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

    const Navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            Navigate('/admin/login')
        }
    },[Navigate])
    

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
        {/* Add your overview components here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
