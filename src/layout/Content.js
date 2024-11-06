import React, { Suspense, useRef, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ComponentMap from './ComponentMap';
import ErrorPage from '../pages/ErrorPage';
import { useTabs } from '../context/TabsContext';
import { useTranslations } from '../context/TranslationContext';

const ItemTypes = {
    TAB: 'tab',
};

const DraggableTab = ({ tab, index, moveTab, activeTab, onTabClick, onTabClose }) => {
    const { getTranslation } = useTranslations();
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TAB,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemTypes.TAB,
        hover: (item) => {
            if (item.index !== index) {
                moveTab(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            className={`tab ${activeTab === tab.path ? 'active' : ''}`}
            onClick={() => onTabClick(tab.path)}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {getTranslation(tab.title)}
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
    );
};

const Content = ({ tabs, activeTab, onTabClick, onTabClose, setTabs }) => {
    const { getTabState, saveTabState } = useTabs();
    const tabsRef = useRef(null);

    const moveTab = (fromIndex, toIndex) => {
        const updatedTabs = [...tabs];
        const [movedTab] = updatedTabs.splice(fromIndex, 1);
        updatedTabs.splice(toIndex, 0, movedTab);
        setTabs(updatedTabs);
    };

    useEffect(() => {
        const activeTabElement = tabsRef.current.querySelector(`.tab.active`);
        if (activeTabElement) {
            activeTabElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    }, [activeTab]);

    // 가로 스크롤 이벤트 추가
    const handleWheel = (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            tabsRef.current.scrollLeft += e.deltaY;
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <main className="content">
                {/* 탭 UI */}
                <div className="tabs" ref={tabsRef} onWheel={handleWheel}>
                    {tabs.map((tab, index) => (
                        <DraggableTab
                            key={tab.path}
                            tab={tab}
                            index={index}
                            moveTab={moveTab}
                            activeTab={activeTab}
                            onTabClick={onTabClick}
                            onTabClose={onTabClose}
                        />
                    ))}
                </div>

                {/*<Suspense fallback={<div>Loading...</div>}>*/}
                    <div className="tab-content">
                        {tabs.map((tab) => {
                            const Component = ComponentMap[tab.path] || ErrorPage;
                            return (
                                <div
                                    className="tab-content-wrapper"
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
                {/*</Suspense>*/}
            </main>
        </DndProvider>
    );
};

export default Content;
