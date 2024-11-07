import React, { useRef, useEffect, Suspense } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ComponentMap from './ComponentMap';
import ErrorPage from '../pages/ErrorPage';
import { useSelector, useDispatch } from 'react-redux';
import { closeTab, setActiveTab, setTabs } from '../state/tabsSlice';
import LoadingIndicator from '../components/LoadingIndicator';
import useTranslations from '../hooks/useTranslations';

const ItemTypes = {
    TAB: 'tab',
};

const DraggableTab = ({ tab, index, moveTab, activeTab, onTabClick, onTabClose }) => {
    const { getTranslation } = useTranslations();
    const translatedTitle = getTranslation(tab.title);

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

    // 마우스 휠 버튼으로 탭을 닫기 위한 이벤트 핸들러
    const handleAuxClick = (e) => {
        if (e.button === 1) { // 마우스 휠 버튼 클릭 (중간 버튼)
            e.preventDefault();
            onTabClose(tab.path);
        }
    };

    return (
        <div
            ref={(node) => drag(drop(node))}
            className={`tab ${activeTab === tab.path ? 'active' : ''}`}
            onClick={() => onTabClick(tab.path)}
            onAuxClick={handleAuxClick} // 마우스 휠 클릭 핸들러 추가
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {translatedTitle}
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

const Content = () => {
    const dispatch = useDispatch();
    const tabs = useSelector((state) => state.tabs.tabs);
    const activeTab = useSelector((state) => state.tabs.activeTab);
    const tabsRef = useRef(null);

    const moveTab = (fromIndex, toIndex) => {
        const updatedTabs = [...tabs];
        const [movedTab] = updatedTabs.splice(fromIndex, 1);
        updatedTabs.splice(toIndex, 0, movedTab);
        dispatch(setTabs(updatedTabs));
    };

    useEffect(() => {
        const activeTabElement = tabsRef.current?.querySelector(`.tab.active`);
        if (activeTabElement) {
            activeTabElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    }, [activeTab, tabs]);

    const handleTabClick = (path) => {
        dispatch(setActiveTab(path));
    };

    const handleTabClose = (path) => {
        dispatch(closeTab(path));
    };

    useEffect(() => {
        const tabsElement = tabsRef.current;
        if (tabsElement) {
            tabsElement.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => {
            if (tabsElement) {
                tabsElement.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    const handleWheel = (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            tabsRef.current.scrollLeft += e.deltaY;
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <main className="content">
                <div className="tabs" ref={tabsRef}>
                    {tabs.map((tab, index) => (
                        <DraggableTab
                            key={tab.path}
                            tab={tab}
                            index={index}
                            moveTab={moveTab}
                            activeTab={activeTab}
                            onTabClick={handleTabClick}
                            onTabClose={handleTabClose}
                        />
                    ))}
                </div>

                <div className="tab-content">
                    {tabs.map((tab) => {
                        const Component = ComponentMap[tab.path] || ErrorPage;
                        return (
                            <div
                                key={tab.path}
                                style={{ display: activeTab === tab.path ? 'block' : 'none', height: '100%' }}
                            >
                                <Suspense fallback={<LoadingIndicator />}>
                                    <Component />
                                </Suspense>
                            </div>
                        );
                    })}
                </div>
            </main>
        </DndProvider>
    );
};

export default Content;
