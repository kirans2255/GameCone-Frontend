// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLoginPage from '../../../pages/userpage/signuppage'
import GamecamoPage from "../../../pages/userpage/home";
import Login from '../../../pages/userpage/login'
// import ProtectRoute from '../../../components/layout/ProtectRoute'
// import AdminLayout from '../'

export default function UserRoutes() {

    // const [user,setUser] = useState(null);

    // const getUser = async() => {
    //     try{
    //         const url = `${import.meta.env.VITE_BASE_UR}/auth/google/callback/success`;
    //         const{data} = await axios.get(url,{withCredential:true});
    //         setUser(data.user._json)
    //     }catch (err){
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     getUser();
    // },[])

    return (
        <div>
            {/* <ProtectRoute> */}
                <Router>
                    <Routes>
                        <Route path='/signup' element={<UserLoginPage />}>
                        </Route>
                        <Route path='/home' element={<GamecamoPage />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                    </Routes>
                </Router>
            {/* </ProtectRoute> */}
        </div>
    )
}