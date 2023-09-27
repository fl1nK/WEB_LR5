import React, {useEffect} from "react";
import './App.css';

import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Registration from "./components/authorization/Registration";
import Login from "./components/authorization/Login";

import {useDispatch, useSelector} from "react-redux";
import {auth} from "./actions/user";
import Info from "./components/info/Info";
import Edit from "./components/info/Edit";
import Admin from "./components/info/Admin";

function App() {

    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("token")){
            dispatch(auth())
        }
    })


    return (
      <BrowserRouter>
        <div className='app'>
            <Navbar/>
            <div className="container">
                {!isAuth ?
                    <Routes>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                    :
                    <Routes>
                        <Route path='/login' element={<Navigate to='/info' />} />
                        <Route path="/info" element={<Info/>}/>
                        <Route path="/admin" element={<Admin/>}/>
                        <Route path="/edit" element={<Edit/>}/>
                    </Routes>
                }
            </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
