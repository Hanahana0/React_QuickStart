// src/state/menuSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import comService from '../comnServices/ComService';

export const fetchMenus = createAsyncThunk('menu/fetchMenus', async () => {
    const response = await comService.getMenus();
    return response.RTN_DATA;
});

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenus.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMenus.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchMenus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default menuSlice.reducer;
