import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TranslationProvider } from './context/TranslationContext';
import './layout/layout.css';
import Content from "./layout/Content";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import SidebarController from "./layout/Sidebar-controller";

const App = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

    return (
        <TranslationProvider>
            <Router>
                <div className="app-container">
                    <Header />
                    <div className={`main-layout ${isSidebarVisible ? 'sidebar-open' : 'sidebar-closed'}`}>
                        <Sidebar className={isSidebarVisible ? 'open' : 'closed'}/>
                        <SidebarController
                            isSidebarVisible={isSidebarVisible}
                            onToggleSidebar={toggleSidebar}
                        />
                        <Content/>
                    </div>
                </div>
            </Router>
        </TranslationProvider>
    );
};

export default App;
