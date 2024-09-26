/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, toggle } from '../../services/admin/login';

const UserPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const result = await getUser();
            setUsers(result.user);
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const Navigate = useNavigate()

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

    const handleToggleBlockUser = async (userId) => {
        console.log("user:", userId);

        try {
            const updatedUser = await toggle(userId);

             fetchUsers();

            setUsers(users.map(user => user.id === userId ? updatedUser : user));
            
            // localStorage.removeItem('token');
            // navigate('/admin/user');
        } catch (error) {
            console.error('Error toggling block status:', error.message);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}


            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">User Management</h1>

                {/* User Management Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="border-b border-gray-200">
                                    <td className="p-4">{user.name}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleToggleBlockUser(user._id)}
                                            className={`py-2 px-4 rounded ${user.isBlocked ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                                        >
                                            {user.isBlocked ? 'Unblock' : 'Block'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
