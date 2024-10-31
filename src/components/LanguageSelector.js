// src/components/LanguageSelector.js
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTranslations, setCurrentLang} from '../state/store';

const LanguageSelector = () => {
    const dispatch = useDispatch();
    const currentLang = useSelector((state) => state.language.currentLang);

    const handleChange = (e) => {
        const selectedLang = e.target.value;
        dispatch(setCurrentLang(selectedLang));
        dispatch(fetchTranslations(selectedLang));
    };

    return (
        <select value={currentLang} onChange={handleChange}>
            <option value="en">English</option>
            <option value="ko">Korean</option>
        </select>
    );
};

export default LanguageSelector;
