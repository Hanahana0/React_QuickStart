import React, { useState, useTransition } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { TabsProvider } from './context/TabsContext';
import { TranslationProvider } from './context/TranslationContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { setLoadingFunctions } from './api/axiosClient'; // 추가

import './layout/layout.css';
import LoadingIndicator from './components/LoadingIndicator';
import Content from "./layout/Content";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import SidebarController from "./layout/Sidebar-controller";
import Login from './pages/Login';

import { ToastContainer } from 'react-toastify';

const AppContent = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [isPending, startTransition] = useTransition();

    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return <LoadingIndicator />;
    }

    const handleMenuClick = (menu) => {
        startTransition(() => {
            if (!tabs.some((tab) => tab.path === menu.path)) {
                setTabs([...tabs, menu]);
            }
            setActiveTab(menu.path);
        });
    };

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={
                isLoggedIn ? (
                    <TranslationProvider>
                        <>
                            <Header />
                            <div className="main-layout">
                                <div className={`sidebar-container ${isSidebarVisible ? 'open' : 'closed'}`}>
                                    <Sidebar
                                        className={isSidebarVisible ? 'open' : 'closed'}
                                        onMenuClick={handleMenuClick}
                                        tabs={tabs}
                                    />
                                    <SidebarController
                                        isSidebarVisible={isSidebarVisible}
                                        onToggleSidebar={toggleSidebar}
                                    />
                                </div>
                                <Content
                                    tabs={tabs}
                                    activeTab={activeTab}
                                    onTabClick={setActiveTab}
                                    onTabClose={(path) => setTabs(tabs.filter(tab => tab.path !== path))}
                                    setTabs={setTabs}
                                />
                            </div>
                        </>
                    </TranslationProvider>
                ) : <Navigate to="/login" />
            } />
        </Routes>
    );
};

const App = () => (
    <LoadingProvider>
        <LoadingContextConnector /> {/* LoadingContextConnector 추가 */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <AuthProvider>
            <TabsProvider>
                <Router>
                    <LoadingIndicator /> {/* 로딩 인디케이터를 항상 렌더링 */}
                    <AppContent />
                </Router>
            </TabsProvider>
        </AuthProvider>
    </LoadingProvider>
);

const LoadingContextConnector = () => {
    const { showLoading, hideLoading } = useLoading();
    setLoadingFunctions(showLoading, hideLoading); // axiosClient에 로딩 함수 설정
    return null; // 실제 렌더링하지 않음
};

export default App;
