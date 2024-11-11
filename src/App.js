// src/App.js
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { store, persistor } from './state/store';
import { setLoadingFunctions } from './api/axiosClient';
import { showLoading, hideLoading } from './state/loadingSlice';
import { checkTokenValidity } from './state/authSlice';

import './layout/layout.css';
import LoadingIndicator from './components/LoadingIndicator';
import Content from "./layout/Content";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import SidebarController from "./layout/Sidebar-controller";
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';

const AppContent = () => {
    const dispatch = useDispatch();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    useEffect(() => {
        setLoadingFunctions(
            () => dispatch(showLoading()),
            () => dispatch(hideLoading())
        );

        // 앱이 처음 로드될 때 토큰 유효성 확인
        dispatch(checkTokenValidity());
    }, [dispatch]);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isLoading = useSelector((state) => state.loading.isLoading);

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={
                isLoggedIn ? (
                    <>
                        <Header />
                        <div className="main-layout">
                            <div className={`sidebar-container ${isSidebarVisible ? 'open' : 'closed'}`}>
                                <Sidebar className={isSidebarVisible ? 'open' : 'closed'} />
                                <SidebarController
                                    isSidebarVisible={isSidebarVisible}
                                    onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
                                />
                            </div>
                            <Content />
                        </div>
                    </>
                ) : <Navigate to="/login" />
            } />
        </Routes>
    );
};

const App = () => (
    <Provider store={store}>
        <PersistGate loading={<LoadingIndicator />} persistor={persistor}>
            <Router>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
                <AppContent />
            </Router>
        </PersistGate>
    </Provider>
);

export default App;
