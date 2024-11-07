// src/state/store.js
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';

import authReducer from './authSlice';
import loadingReducer from './loadingSlice';
import tabsReducer from './tabsSlice';
import translationReducer from './translationSlice';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'tabs', 'translation']
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
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredPaths: ['register', 'rehydrate']
            }
        })
});

const persistor = persistStore(store);

export {store, persistor};