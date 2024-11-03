import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ComponentMap from './ComponentMap';
import ErrorPage from '../pages/ErrorPage';
import { useTabs } from '../context/TabsContext';

const Content = ({ tabs, activeTab, onTabClick, onTabClose }) => {
    const { getTabState, saveTabState } = useTabs();

    return (
        <main className="content">
            {/* 탭 UI */}
            <div className="tabs">
                {tabs.map(tab => (
                    <div
                        key={tab.path}
                        className={`tab ${activeTab === tab.path ? 'active' : ''}`}
                        onClick={() => {
                            if (activeTab !== tab.path) {
                                onTabClick(tab.path);
                            }
                        }}
                    >
                        {tab.title}
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

            <Suspense fallback={<div>Loading...</div>}>
                <div className="tab-content">
                    {tabs.map(tab => {
                        const Component = ComponentMap[tab.path] || ErrorPage;
                        return (
                            <div
                                key={tab.path}
                                style={{ display: activeTab === tab.path ? 'block' : 'none' }}
                            >
                                <Component
                                    savedState={getTabState(tab.path)}
                                    onSaveState={(state) => saveTabState(tab.path, state)}
                                />
                            </div>
                        );
                    })}
                </div>
            </Suspense>
        </main>
    );
};

export default Content;
