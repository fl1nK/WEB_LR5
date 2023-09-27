import React from 'react';
import {NavLink} from "react-router-dom";
import {logout} from "../../reducers/userReducer";
import {useDispatch, useSelector} from "react-redux";
const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const roles = useSelector(state => state.user.currentUser.roles)
    const isAdmin = roles == "ADMIN";

    const dispatch = useDispatch()

    return (
        <div className="navbar_container">
            <div className="navbar">
                {!isAuth && <NavLink to="/login">Увійти</NavLink> }
                {!isAuth && <NavLink to="/registration">Реєстрація</NavLink> }
                {isAuth && <NavLink to="/info">Інформація</NavLink> }
                {isAdmin && isAuth && <NavLink to="/admin">Адмін</NavLink>}
                {isAuth && <NavLink to="/edit">Редагувати</NavLink> }
                {isAuth && <a onClick={() => dispatch(logout())}>Вихід</a> }
            </div>
        </div>
    );
};

export default Navbar;