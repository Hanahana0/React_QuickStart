// src/state/authSlice.js
import {createSlice} from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';
import ApiRequest from '../api/ApiRequest';
import {fetchMenus} from './menuSlice';
import {fetchTranslations} from './translationSlice';
import {persistor} from './store'; // 추가
import ApiResponse from '../api/ApiResponse';
import comService from '../comnServices/ComService';

// const baseUrl = "/auth/login";
const baseUrl = "/Login.do";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        loading: false,
        userInfo: null,
        DOMAINKEY: null,
        USERID: null,
        LANG_CD: null,
    },
    reducers: {
        setLoginStart: (state) => {
            state.loading = true;
        },
        setLoginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.loading = false;
            state.userInfo = action.payload;
            // API 송신시 계속 담고다녀야함 ApiRequest에서 참조시켜얗마
            state.USERID        = null;
            state.LANG_CD       = null;
            state.GV_TIMEZONE   = null;
            state.DOMAINKEY     = null;

        },
        setLoginFailure: (state) => {
            state.isLoggedIn = false;
            state.loading = false;
            state.userInfo = null;
            state.DOMAINKEY = null;
            state.USERID = null;
            state.LANG_CD = null;
        },
        setLogout: (state) => {
            state.isLoggedIn = false;
            state.userInfo = null;
            state.DOMAINKEY = null;
            state.USERID = null;
            state.LANG_CD = null;
        },
    },
});

export const {setLoginStart, setLoginSuccess, setLoginFailure, setLogout} = authSlice.actions;

export const login = (domainKey, userId, password, language) => async (dispatch) => {
    dispatch(setLoginStart());

    try {
        console.log("login start!");
        // ApiRequest를 사용해 일관된 요청 구조 생성
        const request = new ApiRequest('login', {}, {DOMAINKEY: domainKey, USERID: userId, PASSWORD: password, LANG_CD: language});
        // const request = new ApiRequest('LOGIN', {
        //     domain: domain,
        //     username: username,
        //     password: password
        // });
        const response = await axiosClient.post(baseUrl, request);


        // if (apiResponse.RTN_CD !== null) {
        //     // 로그인 실패 시 에러 메시지 처리
        //     dispatch(setLoginFailure());
        //     return {success: false, message: "아이디나 비밀번호를 확인하세요."};
        // }

        const {accessToken, refreshToken, userInfo} = response.RTN_DATA;

        // 토큰을 localStorage에 저장
        // localStorage.removeItem('persist:root');
        await persistor.purge(); // 영구적으로 저장된 상태 초기화
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // 로그인 성공 시 유저 정보(localStorage에 JSON 형식으로 저장)
        localStorage.setItem('auth', JSON.stringify({
            DOMAINKEY: domainKey,
            USERID: userId,
            LANG_CD: language || 'en'
        }));

        dispatch(setLoginSuccess({
            userInfo,
            DOMAINKEY: domainKey,
            USERID: userId,
            LANG_CD: language || 'en'
        }));

        // 로그인 성공 시 추가 데이터 로드 (필요시 활성화)
        // const menuList = await comService.getMenus();
        // console.log(menuList);
        // const translationLangList = await comService.getTranslationAll();
        // console.log(translationLangList);
        // dispatch(fetchTranslations()); // 다국어세팅
        // dispatch(fetchMenus()); // 메뉴 세팅


        return {success: true};
    } catch (error) {
        dispatch(setLoginFailure());
        return {success: false, message: "아이디나 비밀번호를 확인하세요."};
    }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // localStorage.removeItem('persist:root');
    dispatch(setLogout());

    await persistor.purge(); // 영구적으로 저장된 상태 초기화
};
// 토큰 검증로직 추가
export const checkTokenValidity = () => (dispatch) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        try {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const expiration = tokenPayload.exp * 1000;
            if (Date.now() >= expiration) {
                console.log("checkTokenValidity token is expiration")
                dispatch(handleTokenExpiration());
            }
        } catch (error) {
            console.error("Invalid token format:", error);
            dispatch(handleTokenExpiration());
        }
    } else {
        dispatch(setLogout());
    }
};

// 토큰 만료 시 처리 함수
const handleTokenExpiration = () => (dispatch) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(setLogout());
};

export default authSlice.reducer;
