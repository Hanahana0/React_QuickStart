// src/state/authSlice.js
import {createSlice} from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';
import ApiRequest from '../api/ApiRequest';
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
    },
    reducers: {
        setLoginStart: (state) => {
            state.loading = true;
        },
        setLoginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.loading = false;
            state.userInfo = action.payload;
        },
        setLoginFailure: (state) => {
            state.isLoggedIn = false;
            state.loading = false;
            state.userInfo = null;
        },
        setLogout: (state) => {
            state.isLoggedIn = false;
            state.userInfo = null;
        },
    },
});

export const {setLoginStart, setLoginSuccess, setLoginFailure, setLogout} = authSlice.actions;

export const login = (domainKey, username, password) => async (dispatch) => {
    dispatch(setLoginStart());

    try {
        // ApiRequest를 사용해 일관된 요청 구조 생성
        const request = new ApiRequest('srchTest', {},{domainKey:domainKey, username:username, password:password});
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
        localStorage.removeItem('persist:root');
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        dispatch(setLoginSuccess(userInfo));
        // 로그인 성공 시 추가 데이터 로드 (필요시 활성화)
        // const menuList = await comService.getMenus();
        // console.log(menuList);
        // const translationLangList = await comService.getTranslationAll();
        // console.log(translationLangList);

        return {success: true};
    } catch (error) {
        dispatch(setLoginFailure());
        return {success: false, message: "아이디나 비밀번호를 확인하세요."};
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('persist:root');
    dispatch(setLogout());
};

export default authSlice.reducer;
