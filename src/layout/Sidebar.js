// Sidebar.js
import React, {useEffect, useState} from 'react';
import axiosClient from '../api/axiosClient';
import {useTranslations} from '../context/TranslationContext';
import './layout.css';

const Sidebar = ({className}) => {

    const {translations} = useTranslations();
    const [menus, setMenus] = useState([]);
    const [openMenus, setOpenMenus] = useState({});

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axiosClient.get('/api/menus');
                setMenus(response.data);
            } catch (error) {
                console.error("메뉴 데이터를 가져오는 중 오류가 발생했습니다:", error);
            }
        };

        fetchMenus();
    }, []);

    const toggleMenu = (menuId) => {
        setOpenMenus((prev) => ({
            ...prev,
            [menuId]: !prev[menuId],
        }));
    };

    const renderMenus = (menuItems, parentId = null) => {
        return menuItems
            .filter(menu => menu.parentId === parentId)
            .map(menu => (
                <div key={menu.id} className="menu-item">
                    <div
                        className={`menu-title ${!parentId ? 'root-menu' : ''}`}
                        onClick={() => toggleMenu(menu.id)}
                    >
                        {translations[menu.title] || menu.title}
                        {menuItems.some(subMenu => subMenu.parentId === menu.id) && (
                            <span className={`arrow ${openMenus[menu.id] ? 'open' : ''}`}>
                                {openMenus[menu.id] ? '▼' : '▶'}
                            </span>
                        )}
                    </div>
                    <div className={`submenu ${openMenus[menu.id] ? 'open' : ''}`}>
                        {renderMenus(menuItems, menu.id)}
                    </div>
                </div>
            ));
    };

    return (
        <div className={`sidebar ${className}`}>
            <div className="sidebar-menu-wrapper">
                <div className="menu-items">
                    {renderMenus(menus)}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
