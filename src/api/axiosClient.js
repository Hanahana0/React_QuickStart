// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
axiosClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token'); // sessionStorage에서 토큰 가져오기
        debugger;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem('token'); // 인증 실패 시 토큰 제거
            // window.location.href = '/login'; // 필요 시 로그인 페이지로 리다이렉트
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
