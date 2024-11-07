// src/state/tabsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const tabsSlice = createSlice({
    name: 'tabs',
    initialState: {
        tabs: [],
        activeTab: null,
        tabStates: {},
    },
    reducers: {
        openTab: (state, action) => {
            const existingTab = state.tabs.find(t => t.path === action.payload.path);
            if (!existingTab) {
                state.tabs.push(action.payload);
            }
            state.activeTab = action.payload.path;
        },
        closeTab: (state, action) => {
            const path = action.payload;
            state.tabs = state.tabs.filter(tab => tab.path !== path);
            if (state.activeTab === path) {
                state.activeTab = state.tabs.length > 0 ? state.tabs[0].path : null;
            }
            delete state.tabStates[path];
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        setTabs: (state, action) => {
            state.tabs = action.payload;
        },
        updateTabTitles: (state, action) => {
            // Redux의 translation 상태에서 번역 데이터 참조
            const translations = action.payload.translations;
            state.tabs = state.tabs.map(tab => ({
                ...tab,
                title: translations[tab.title] || tab.title, // 번역된 제목으로 업데이트
            }));
        }
    }
});

export const { openTab, closeTab, setActiveTab, setTabs, updateTabTitles } = tabsSlice.actions;
export default tabsSlice.reducer;
