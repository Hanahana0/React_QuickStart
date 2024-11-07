// src/state/loadingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'loading',
    initialState: { loadingCount: 0 },
    reducers: {
        showLoading: (state) => {
            state.loadingCount += 1; // 로딩 카운트 증가
        },
        hideLoading: (state) => {
            if (state.loadingCount > 0) {
                state.loadingCount -= 1; // 로딩 카운트 감소
            }
        }
    }
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
