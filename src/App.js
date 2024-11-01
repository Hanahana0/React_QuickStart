import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TranslationProvider } from './context/TranslationContext';
import { TabsProvider } from './context/TabsContext';
import './layout/layout.css';

import Content from "./layout/Content";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import SidebarController from "./layout/Sidebar-controller";

const App = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [tabs, setTabs] = useState([]); // 열린 탭 상태
    const [activeTab, setActiveTab] = useState(null); // 현재 활성화된 탭

    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

    // 탭 추가/활성화 로직만 관리 (navigate는 Sidebar로 이동)
    const addTab = (menu) => {
        const existingTab = tabs.find(tab => tab.path === menu.path);
        if (existingTab) {
            setActiveTab(existingTab.path); // 이미 열려 있는 탭을 활성화
        } else {
            const newTab = { title: menu.title, path: menu.path };
            setTabs([...tabs, newTab]);
            setActiveTab(newTab.path); // 새로 추가된 탭을 활성화
        }
    };

    // 탭 닫기 기능
    const closeTab = (path) => {
        const updatedTabs = tabs.filter(tab => tab.path !== path);
        setTabs(updatedTabs);
        // 닫은 탭이 현재 활성화된 탭일 경우, 다른 탭을 활성화
        if (activeTab === path) {
            setActiveTab(updatedTabs.length > 0 ? updatedTabs[0].path : null);
        }
    };

    return (
        <TranslationProvider>
            <TabsProvider>
                <Router>
                    <div className="app-container">
                        <Header />
                        <div className="main-layout">
                            <div className={`sidebar-container ${isSidebarVisible ? 'open' : 'closed'}`}>
                                <Sidebar
                                    className={isSidebarVisible ? 'open' : 'closed'}
                                    onMenuClick={addTab} // Sidebar에서 메뉴 클릭 시 탭 추가
                                />
                                <SidebarController
                                    isSidebarVisible={isSidebarVisible}
                                    onToggleSidebar={toggleSidebar}
                                />
                            </div>
                            <Content
                                tabs={tabs}                // 열려 있는 탭 전달
                                activeTab={activeTab}      // 활성화된 탭 전달
                                onTabClick={setActiveTab}  // 탭 클릭 시 활성화
                                onTabClose={closeTab}      // 탭 닫기 기능
                            />
                        </div>
                    </div>
                </Router>
            </TabsProvider>
        </TranslationProvider>
    );
};

export default App;
