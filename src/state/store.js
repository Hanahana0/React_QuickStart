// src/state/store.js
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';

import authReducer from './authSlice';
import loadingReducer from './loadingSlice';
import tabsReducer from './tabsSlice';
import translationReducer from './translationSlice'; // 새로 추가


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'tabs', 'translation'] // 상태를 유지할 슬라이스 지정 유저정보도 들어와야하고 다국어 정보도 들어와야할지 고민좀해보자
};

const rootReducer = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
    tabs: tabsReducer,
    translation: translationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                // Ignore these field paths in all actions
                ignoredPaths: ['register', 'rehydrate']
            }
        })
});

const persistor = persistStore(store);

export {store, persistor};