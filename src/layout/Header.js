// src/layout/Header.js
import React from 'react';
import useTranslations from '../hooks/useTranslations';

const Header = () => {
    const { getTranslation, changeLanguage } = useTranslations();

    const handleLanguageChange = (event) => {
        changeLanguage(event.target.value);
    };

    return (
        <header className="header-container">
            <div className="header-left">
                <span className="header-logo">QLinx</span>
            </div>

            <div className="header-right">
                <select onChange={handleLanguageChange} className="language-selector">
                    <option value="ko">Ko</option>
                    <option value="en">En</option>
                </select>
            </div>
        </header>
    );
};

export default Header;
