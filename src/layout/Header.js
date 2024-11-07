// src/layout/Header.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTranslations } from '../state/translationSlice';
import { updateTabTitles } from '../state/tabsSlice';

const Header = () => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.translation.language);
    const translations = useSelector((state) => state.translation.translations);

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        if (selectedLanguage !== language) {
            // 언어를 변경하고 새로운 번역 데이터를 가져온 후 탭 제목을 업데이트
            dispatch(fetchTranslations(selectedLanguage)).then(() => {
                dispatch(updateTabTitles({ translations }));
            });
        }
    };

    return (
        <header className="header-container">
            <div className="header-left">
                <span className="header-logo">QLinx</span>
            </div>

            <div className="header-right">
                <select value={language} onChange={handleLanguageChange} className="language-selector">
                    <option value="ko">Ko</option>
                    <option value="en">En</option>
                </select>
            </div>
        </header>
    );
};

export default Header;
