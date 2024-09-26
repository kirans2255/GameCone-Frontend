// AdminRoutes.jsx
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLoginPage from '../../../pages/adminpage/adminpage';
import AdminDashboard from "../../../pages/adminpage/dashboard";
import CategoryPage from '../../../pages/adminpage/category';
import UserPage from '../../../pages/adminpage/user';
import ProductPage from '../../../pages/adminpage/product'
import Layoutside from '../../layout/layoutside';
// import ProtectRoute from '../../../components/layout/ProtectRoute';

export default function AdminRoutes() {
    return (
        <Router >
            <Routes>
                <Route path='/admin/login' element={<AdminLoginPage />} />
                <Route element = {<Layoutside />} >

                <Route 
                    path='/admin/dashboard' 
                    element={
                        // <ProtectRoute>
                            <AdminDashboard />
                        // </ProtectRoute>
                    } 
                />
                <Route 
                    path='/admin/category' 
                    element={
                        // <ProtectRoute>
                            <CategoryPage />
                        // </ProtectRoute>
                    } 
                />
                <Route 
                    path='/admin/user' 
                    element={
                        // <ProtectRoute>
                            <UserPage />
                        // </ProtectRoute>
                    } 
                />
                <Route 
                    path='/admin/product' 
                    element={
                        // <ProtectRoute>
                            <ProductPage />
                        // </ProtectRoute>
                    } 
                />
                 </Route>
            </Routes>
        </Router>
    );
}
