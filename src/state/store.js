// src/state/store.js
import {configureStore, createSlice} from '@reduxjs/toolkit';
import api from '../api/axiosClient';

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        translations: {},
        currentLang: 'en',
    },
    reducers: {
        setTranslations: (state, action) => {
            state.translations = action.payload;
        },
        setCurrentLang: (state, action) => {
            state.currentLang = action.payload;
        },
    },
});

export const {setTranslations, setCurrentLang} = languageSlice.actions;

export const fetchTranslations = (lang) => async (dispatch) => {
    try {
        const response = await api.get(`/api/translation?lang=${lang}`);
        dispatch(setTranslations(response.data));
    } catch (error) {
        console.error('Failed to fetch translations:', error);
    }
};

const store = configureStore({
    reducer: {
        language: languageSlice.reducer,
    },
});

export default store;
