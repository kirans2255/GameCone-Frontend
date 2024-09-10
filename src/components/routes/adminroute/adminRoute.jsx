// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLoginPage from '../../../pages/adminpage/adminpage'
import AdminDashboard from "../../../pages/adminpage/dashboard";
import CategoryPage from '../../../pages/adminpage/category';
import UserPage from '../../../pages/adminpage/user'
// import AdminLayout from '../'

export default function AdminRoutes() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path = '/admin/login' element={<AdminLoginPage />}>
                    </Route>
                    <Route path = '/admin/dashboard' element={<AdminDashboard />}></Route> 
                    <Route path = '/admin/category' element = {<CategoryPage />}></Route>
                    <Route path = '/admin/user' element={<UserPage/>}></Route> 
                </Routes>
            </Router>
        </div>
    )
}