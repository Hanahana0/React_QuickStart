// src/state/authSlice.js
import {createSlice} from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        loading: false,
        userInfo: null
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
        }
    }
});

export const {setLoginStart, setLoginSuccess, setLoginFailure, setLogout} = authSlice.actions;

export const login = (username, password) => async (dispatch) => {
    dispatch(setLoginStart());
    try {
        const response = await axiosClient.post('/auth/login', {username, password});
        const accessToken = response.data.accessToken;
        const userInfo = response.data.userInfo;
        localStorage.removeItem('openMenus');
        localStorage.removeItem('persist:root');
        sessionStorage.setItem('accessToken', accessToken);
        dispatch(setLoginSuccess(userInfo));
    } catch (error) {
        dispatch(setLoginFailure());
        return {success: false, message: "아이디나 비밀번호를 확인하세요."};
    }
    return {success: true};
};

export const logout = () => (dispatch) => {
    sessionStorage.removeItem('accessToken');
    dispatch(setLogout());
};

export default authSlice.reducer;
