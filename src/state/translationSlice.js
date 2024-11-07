// src/state/translationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';

export const fetchTranslations = createAsyncThunk(
    'translation/fetchTranslations',
    async (language, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/api/translation?lang=${language}`);
            const data = response.data.reduce((acc, item) => {
                acc[item.msg] = item.translationText;
                return acc;
            }, {});
            return data;
        } catch (error) {
            console.error("다국어 데이터를 가져오는 중 오류가 발생했습니다:", error);
            return rejectWithValue(error.response?.data || "Fetch error");
        }
    }
);

const translationSlice = createSlice({
    name: 'translation',
    initialState: {
        translations: {},
        language: 'ko', // 기본 언어 설정
        loading: false,
        error: null,
    },
    reducers: {
        changeLanguage: (state, action) => {
            state.language = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTranslations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTranslations.fulfilled, (state, action) => {
                state.loading = false;
                state.translations = action.payload;
            })
            .addCase(fetchTranslations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { changeLanguage } = translationSlice.actions;
export default translationSlice.reducer;
