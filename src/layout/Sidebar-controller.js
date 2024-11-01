import React from 'react';

const SidebarController = ({ isSidebarVisible, onToggleSidebar }) => {
    return (
        <span className="sidebar-controller" onClick={onToggleSidebar}>
            {isSidebarVisible ? <p>◀</p> : <p>▶</p>}
        </span>
    );
};

export default SidebarController;
