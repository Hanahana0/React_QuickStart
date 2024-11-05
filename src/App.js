// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { TranslationProvider } from './context/TranslationContext';
import { TabsProvider } from './context/TabsContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './layout/layout.css';

import Content from "./layout/Content";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import SidebarController from "./layout/Sidebar-controller";
import Login from './pages/Login';

const AppContent = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(null);

    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
    const { isLoggedIn, loading } = useAuth(); // 로딩 상태 가져오기

    if (loading) {
        return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
    }

    const handleMenuClick = (menu) => {
        if (!tabs.some((tab) => tab.path === menu.path)) {
            setTabs([...tabs, menu]);
        }
        setActiveTab(menu.path);
    };

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={
                isLoggedIn ? (
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
                ) : <Navigate to="/login" />
            } />
        </Routes>
    );
};

const App = () => (
    <AuthProvider>
        <TranslationProvider>
            <TabsProvider>
                <Router>
                    <AppContent />
                </Router>
            </TabsProvider>
        </TranslationProvider>
    </AuthProvider>
);

export default App;
