// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLoginPage from '../../../pages/userpage/signuppage'
import GamecamoPage from "../../../pages/userpage/home";
import Login from '../../../pages/userpage/login'
import Shop from '../../../pages/userpage/shop'
import Single from '../../../pages/userpage/single'
import Cart from '../../../pages/userpage/cart'
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
                        <Route path='/shop' element={<Shop />}></Route>
                        <Route path='/single/:id' element={<Single />}></Route>
                        <Route path='/cart' element={<Cart />}></Route>

                    </Routes>
                </Router>
            {/* </ProtectRoute> */}
        </div>
    )
}