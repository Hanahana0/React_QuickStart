// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await axiosClient.post('/auth/login', { username, password });
            console.log("response >>> " , response);
            const token = response.data; // 로그인 성공 시 받은 토큰
            // setUser(response.data.user); // 유저 정보 저장
            setIsLoggedIn(true); // 로그인 상태 변경
            sessionStorage.setItem('token', token); // 토큰을 sessionStorage에 저장
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "아이디나 비밀번호를 확인하세요." };
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.removeItem('token'); // 로그아웃 시 토큰 제거
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
