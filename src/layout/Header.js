import React, {useContext} from 'react';
import {useTranslations} from '../context/TranslationContext';


const Header = () => {
    const {changeLanguage} = useTranslations();

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
                    <option value="en">En</option>
                    <option value="ko">Ko</option>
                </select>
            </div>
        </header>
    );
};
export default Header;