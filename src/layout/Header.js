// src/layout/Header.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../state/authSlice';
import './layout.css';

const Header = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="header-container">
            <div className="header-left">
                <span className="header-logo">QLinx</span>
            </div>
            <div className="header-right">
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
