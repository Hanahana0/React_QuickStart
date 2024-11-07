// // src/context/TabsContext.js
// import React, { createContext, useContext, useState, useCallback } from 'react';
//
// const TabsContext = createContext();
//
// export const TabsProvider = ({ children }) => {
//     const [tabs, setTabs] = useState([]);
//     const [activeTab, setActiveTab] = useState(null);
//     const [tabStates, setTabStates] = useState({});
//
//     const openTab = useCallback((tab) => {
//         const existingTab = tabs.find(t => t.path === tab.path);
//         if (!existingTab) {
//             setTabs(prevTabs => [...prevTabs, tab]);
//         }
//         setActiveTab(tab.path);
//     }, [tabs]); // tabs 배열이 변경될 때만 이 함수가 갱신됩니다.
//
//     const closeTab = useCallback((path) => {
//         setTabs(prevTabs => prevTabs.filter(tab => tab.path !== path));
//         if (activeTab === path) {
//             const remainingTabs = tabs.filter(tab => tab.path !== path);
//             setActiveTab(remainingTabs.length > 0 ? remainingTabs[0].path : null);
//         }
//         setTabStates(prevTabStates => {
//             const newTabStates = { ...prevTabStates };
//             delete newTabStates[path];
//             return newTabStates;
//         });
//     }, [activeTab, tabs]);
//
//     const saveTabState = useCallback((path, state) => {
//         setTabStates(prev => ({
//             ...prev,
//             [path]: state
//         }));
//     }, []);
//
//     const getTabState = useCallback((path) => {
//         return tabStates[path] || null;
//     }, [tabStates]);
//
//     return (
//         <TabsContext.Provider value={{
//             tabs,
//             activeTab,
//             openTab,
//             closeTab,
//             saveTabState,
//             getTabState,
//             setActiveTab
//         }}>
//             {children}
//         </TabsContext.Provider>
//     );
// };
//
// export const useTabs = () => useContext(TabsContext);
