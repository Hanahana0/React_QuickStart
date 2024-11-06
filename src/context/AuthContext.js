// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            axiosClient.post('/auth/validate', { token: accessToken })
                .then(() => {
                    setIsLoggedIn(true);
                })
                .catch(async () => {
                    try {
                        const response = await axiosClient.post('/auth/refresh-token'); // 쿠키에 있는 리프레시 토큰으로 엑세스 토큰 갱신
                        const newAccessToken = response.data.accessToken;
                        sessionStorage.setItem('accessToken', newAccessToken); // 엑세스 토큰만 세션 스토리지에 저장
                        setIsLoggedIn(true);
                    } catch {
                        sessionStorage.removeItem('accessToken');
                        setIsLoggedIn(false);
                    }
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axiosClient.post('/auth/login', { username, password });
            const { accessToken } = response.data;
            sessionStorage.setItem('accessToken', accessToken); // 엑세스 토큰만 세션 스토리지에 저장
            setIsLoggedIn(true);
            return { success: true };
        } catch (error) {
            return { success: false, message: "아이디나 비밀번호를 확인하세요." };
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('accessToken');
        // 리프레시 토큰은 쿠키에서 서버 쪽에서 자동으로 제거
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
