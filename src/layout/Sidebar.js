import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useTranslations } from '../context/TranslationContext';
import './layout.css';

const Sidebar = ({ className, onMenuClick }) => {
    const { translations } = useTranslations();
    const [menus, setMenus] = useState([]);
    const [openMenus, setOpenMenus] = useState({});
    const navigate = useNavigate();

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

    // 메뉴 클릭 시 경로 이동을 위한 함수
    const handleMenuClick = (menu) => {
        if (menu.path) {
            onMenuClick(menu); // App.js로 메뉴 정보를 전달하여 탭 추가
            navigate(menu.path); // 메뉴 경로로 이동
        }
        setOpenMenus((prev) => ({
            ...prev,
            [menu.id]: !prev[menu.id],
        }));
    };

    // 재귀적으로 메뉴를 렌더링하는 함수
    const renderMenus = (menuItems, parentId = null) => {
        return menuItems
            .filter(menu => menu.parentId === parentId)
            .map(menu => (
                <div key={menu.id} className="menu-item">
                    <div
                        className={`menu-title ${!parentId ? 'root-menu' : ''}`}
                        onClick={() => handleMenuClick(menu)}
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
