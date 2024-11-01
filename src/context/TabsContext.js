// src/context/TabsContext.js
import React, {createContext, useContext, useState} from 'react';

const TabsContext = createContext();

export const TabsProvider = ({children}) => {
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [tabStates, setTabStates] = useState({});

    const openTab = (tab) => {
        const existingTab = tabs.find(t => t.path === tab.path);
        if (!existingTab) {
            setTabs([...tabs, tab]);
        }
        setActiveTab(tab.path);
    };

    const closeTab = (path) => {
        const updatedTabs = tabs.filter(tab => tab.path !== path);
        setTabs(updatedTabs);
        if (activeTab === path) {
            setActiveTab(updatedTabs.length > 0 ? updatedTabs[0].path : null);
        }
        const newTabStates = {...tabStates};
        delete newTabStates[path];
        setTabStates(newTabStates);
    };

    const saveTabState = (path, state) => {
        setTabStates(prev => ({
            ...prev,
            [path]: state
        }));
    };

    const getTabState = (path) => {
        return tabStates[path];
    };

    return (
        <TabsContext.Provider value={{tabs, activeTab, openTab, closeTab, saveTabState, getTabState, setActiveTab}}>
            {children}
        </TabsContext.Provider>
    );
};

export const useTabs = () => useContext(TabsContext);
