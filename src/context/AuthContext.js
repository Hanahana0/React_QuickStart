// src/context/AuthContext.js
import React, {createContext, useContext, useState, useEffect} from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // 초기 로딩 상태 설정

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            axiosClient.post('/auth/validate', {token})
                .then(() => {
                    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setIsLoggedIn(true);
                })
                .catch(() => {
                    sessionStorage.removeItem('token');
                    setIsLoggedIn(false);
                })
                .finally(() => setLoading(false)); // 로딩 완료
        } else {
            setLoading(false); // 토큰이 없을 때 로딩 완료
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axiosClient.post('/auth/login', {username, password});
            const token = response.data;
            sessionStorage.setItem('token', token);
            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsLoggedIn(true);
            return {success: true};
        } catch (error) {
            return {success: false, message: "아이디나 비밀번호를 확인하세요."};
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('token');
        delete axiosClient.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
