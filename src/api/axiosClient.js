// src/api/axiosClient.js
import axios from 'axios';
import { notify } from '../components/toast';

/**
 *  1. Error Handling (오류 처리)
 *  2. Loading Indicator (로딩 인디케이터)
 *  3. Request Retry Mechanism (재요청 메커니즘) 필요없을듯 ?
 *  4. 환경 변수 및 설정 공통화
 *  5. API 요청 로깅 및 분석
 *  6. 응답 데이터 가공 및 통일화
 *  7. Token Expiration Handling (토큰 만료 처리)
 *  8. API 호출 성공/실패 콜백 함수 공통화
 *  9. React Context 를 활용한 전역 상태 관리 !!! 이미 로그인할때 처리할거라 따로 필요없을듯??????
 *  */

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 2000,
    withCredentials: true, // 쿠키 전송을 위해 추가
    headers: {
        'Content-Type': 'application/json',
    },
});

let showLoading = null;
let hideLoading = null;

// 로딩 상태 관리 함수 설정
export const setLoadingFunctions = (show, hide) => {
    showLoading = show;
    hideLoading = hide;
};

// 요청 인터셉터
axiosClient.interceptors.request.use(
    (config) => {
        if (showLoading) showLoading();
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        if (hideLoading) hideLoading();
        return Promise.reject(error);
    }
);

// 응답 인터셉터
axiosClient.interceptors.response.use(
    (response) => {
        if (hideLoading) hideLoading();
        return response;
    },
    async (error) => {
        if (hideLoading) hideLoading();

        const originalRequest = error.config;

        // 액세스 토큰 만료로 인해 401 오류가 발생했을 경우
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;  // 무한 재시도 방지

            try {
                const response = await axiosClient.post('/auth/refresh-token'); // 쿠키에 있는 리프레시 토큰으로 요청
                const newAccessToken = response.data.accessToken;
                sessionStorage.setItem('accessToken', newAccessToken); // 엑세스 토큰만 세션 스토리지에 저장
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest); // 원래 요청 재시도
            } catch (refreshError) {
                notify("세션이 만료되었습니다. 다시 로그인해주세요.", "warning");
                sessionStorage.removeItem('accessToken'); // 리프레시 토큰은 제거하지 않음 (쿠키에 있음)
            }
        }

        // 기타 오류 처리
        if (error.code === 'ECONNABORTED') {
            notify("요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.", "error");
        } else if (!error.response) {
            notify("네트워크 문제가 발생했습니다. 인터넷 연결을 확인해주세요.", "error");
        } else {
            switch (error.response.status) {
                case 403:
                    notify("권한이 없습니다. 관리자에게 문의하세요.", "error");
                    break;
                case 404:
                    notify("요청한 리소스를 찾을 수 없습니다.", "error");
                    break;
                case 500:
                    notify("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.", "error");
                    break;
                case 999: // 로그인 실패시임
                    break;
                default:
                    notify("요청을 처리하는 중 문제가 발생했습니다.", "error");
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
