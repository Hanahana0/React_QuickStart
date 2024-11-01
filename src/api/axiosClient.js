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
        // console.log("axiosClient.interceptors.request :: ", config);
        const token = sessionStorage.getItem('token'); // 로컬 스토리지에 저장된 토큰 가져오기
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
        // console.log("axiosClient.interceptors.response :: ", response);
        return response;
    },
    (error) => {
        // console.log("axiosClient.interceptors.response :: ", error);
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem('token');
            // window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        }
        return Promise.reject(error);
    }
);

export default axiosClient;