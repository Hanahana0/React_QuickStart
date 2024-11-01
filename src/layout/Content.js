import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorHandling from '../lib/ErrorHandler';
import { useTranslations } from '../context/TranslationContext';

const loadComponent = (componentPath) => {
    console.log(`Attempting to load component from: ${componentPath}`);
    return React.lazy(() =>
        import(`${componentPath}`).catch((error) => {
            console.error(`Failed to load component at ${componentPath}:`, error);
            return import('../pages/ErrorPage');
        })
    );
};

const Content = ({ tabs, activeTab, onTabClick, onTabClose }) => {
    const { translations } = useTranslations();

    return (
        <main className="content">
            {/* 탭 UI */}
            <div className="tabs">
                {tabs.map(tab => (
                    <div
                        key={tab.path}
                        className={`tab ${activeTab === tab.path ? 'active' : ''}`}
                        onClick={() => onTabClick(tab.path)}
                    >
                        {translations[tab.title] || tab.title}
                        <button
                            className="close-tab"
                            onClick={(e) => {
                                e.stopPropagation();
                                onTabClose(tab.path);
                            }}
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>

            {/* Routes 설정 */}
            <ErrorHandling>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {tabs.map(tab => {
                            const Component = loadComponent(tab.componentPath); // 동적으로 컴포넌트를 로드
                            return (
                                <Route
                                    key={tab.path}
                                    path={tab.path}
                                    element={<Component />}
                                />
                            );
                        })}
                        <Route path="/" element={<h2>메인 페이지</h2>} />
                    </Routes>
                </Suspense>
            </ErrorHandling>
        </main>
    );
};

export default Content;
