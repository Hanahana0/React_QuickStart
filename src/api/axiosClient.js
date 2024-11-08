// src/api/axiosClient.js
import axios from 'axios';
import ApiRequest from "./ApiRequest";
import ApiResponse from "./ApiResponse";
import {notify} from '../components/toast';

let showLoading = null;
let hideLoading = null;

/**
 *  1. Error Handling (오류 처리)
 *     notify 로 감싸서 화면에 오류내용 보여주도록 현재는 해놨으나 추후 모달 만들어서 다국어 입혀서 해당 컴포넌트가 보여지도록 해야함!!
 *  2. Loading Indicator (로딩 인디케이터)
 *  3. Request Retry Mechanism (재요청 메커니즘) 필요없을듯 ?
 *  4. 환경 변수 및 설정 공통화
 *  5. API 요청 로깅 및 분석
 *  6. 응답 데이터 가공 및 통일화
 *  7. Token Expiration Handling (토큰 만료 처리)
 *  8. API 호출 성공/실패 콜백 함수 공통화
 *  9. React Context 를 활용한 전역 상태 관리 !!! 이미 로그인할 때 처리할 거라 따로 필요없을듯??????
 */

// 로딩 상태 관리 함수 설정
export const setLoadingFunctions = (show, hide) => {
    showLoading = show;
    hideLoading = hide;
};

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 2000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
axiosClient.interceptors.request.use(
    (config) => {

        if (typeof showLoading === 'function') showLoading(); // 함수가 설정된 경우에만 호출

        // ApiRequest를 통해 요청 데이터 구조 통일
        // const requestData = new ApiRequest(config.data.P_ACT,config.data.P_PARAM);
        // requestData.validate(); // 요청 데이터 유효성 검사
        // config.data = requestData;

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        if (typeof hideLoading === 'function') hideLoading(); // 함수가 설정된 경우에만 호출
        return Promise.reject(error);
    }
);

// 응답 인터셉터
axiosClient.interceptors.response.use(
    (response) => {

        if (typeof hideLoading === 'function') hideLoading(); // 함수가 설정된 경우에만 호출

        // ApiResponse를 통해 응답 데이터를 가공하여 통일된 형식으로 반환
        const apiResponse = new ApiResponse(response.data);
        return apiResponse;
    },
    async (error) => {
        if (typeof hideLoading === 'function') hideLoading(); // 함수가 설정된 경우에만 호출

        const originalRequest = error.config;

        // 401 에러 및 _retry 플래그 확인
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 로컬스토리지에서 리프레시 토큰 가져오기
                const refreshToken = localStorage.getItem('refreshToken');

                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                // refresh-token 요청을 위한 ApiRequest 생성
                const request = new ApiRequest('REFRESH_TOKEN', { refreshToken });

                // refresh-token 요청
                const response = await axiosClient.post('/auth/refresh-token', request);
                const newAccessToken = response.RTN_DATA.accessToken;

                // 새로운 엑세스 토큰 저장 및 원래 요청 헤더 업데이트
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // 원래의 요청을 재시도
                return axiosClient(originalRequest);
            } catch (refreshError) {
                // refresh-token 요청이 실패한 경우 처리
                notify("세션이 만료되었습니다. 다시 로그인해주세요.", "warning");
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                // window.location.href = '/login'; // 로그인 페이지로 리다이렉트
                return Promise.reject(refreshError);
            }
        }

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
                case 999:
                    // 로그인 실패시임 이떈 처리할 거 없음
                    break;
                default:
                    notify("요청을 처리하는 중 문제가 발생했습니다.", "error");
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
