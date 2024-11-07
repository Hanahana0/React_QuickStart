// src/state/translationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';

export const fetchTranslations = createAsyncThunk(
    'translation/fetchTranslations',
    async (language, { getState, rejectWithValue }) => {
        const { translation } = getState();

        // 이미 해당 언어로 번역 데이터가 로드된 경우 API 호출을 건너뜁니다.
        if (translation.translations[language]) {
            return { language, data: translation.translations[language] };
        }

        try {
            const response = await axiosClient.get(`/api/translation?lang=${language}`);
            const data = response.data.reduce((acc, item) => {
                acc[item.msg] = item.translationText;
                return acc;
            }, {});
            return { language, data };
        } catch (error) {
            console.error("다국어 데이터를 가져오는 중 오류가 발생했습니다:", error);
            return rejectWithValue(error.response?.data || "Fetch error");
        }
    }
);

const translationSlice = createSlice({
    name: 'translation',
    initialState: {
        translations: {}, // 각 언어의 번역 데이터를 저장
        language: 'ko', // 기본 언어 설정
        lastFetchedLanguage: null,
        loading: false,
        error: null,
    },
    reducers: {
        setLanguage: (state, action) => {
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
                const { language, data } = action.payload;
                // translations 객체에 특정 언어의 데이터를 저장
                state.translations = {
                    ...state.translations,
                    [language]: data,
                };
                state.language = language;
                state.lastFetchedLanguage = language;
            })
            .addCase(fetchTranslations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setLanguage } = translationSlice.actions;
export default translationSlice.reducer;
