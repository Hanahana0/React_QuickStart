// src/state/tabsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tabsSlice = createSlice({
    name: 'tabs',
    initialState: {
        tabs: [],
        activeTab: null,
        tabStates: {}
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
                const remainingTabs = state.tabs;
                state.activeTab = remainingTabs.length > 0 ? remainingTabs[0].path : null;
            }

            delete state.tabStates[path];
        },
        saveTabState: (state, action) => {
            const { path, stateData } = action.payload;
            state.tabStates[path] = stateData;
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        setTabs: (state, action) => {
            state.tabs = action.payload; // 전체 탭을 업데이트
        }
    }
});

export const { openTab, closeTab, saveTabState, setActiveTab, setTabs } = tabsSlice.actions;
export default tabsSlice.reducer;
