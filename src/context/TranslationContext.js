import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
    const [translations, setTranslations] = useState({});
    const [language, setLanguage] = useState('ko'); // 기본 언어 설정

    const fetchTranslations = async (lang) => {
        try {
            const response = await axiosClient.get(`/api/translation?lang=${lang}`);
            const data = response.data.reduce((acc, item) => {
                acc[item.msg] = item.translationText;
                return acc;
            }, {});

            setTranslations(data);
        } catch (error) {
            console.error("다국어 데이터를 가져오는 중 오류가 발생했습니다:", error);
        }
    };

    useEffect(() => {
        fetchTranslations(language);
    }, [language]);

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    // 특정 키의 번역을 가져오며, 키가 없으면 키 자체를 반환
    const getTranslation = (key) => {
        // translations 객체가 비어있을 때 key 반환
        return translations ? translations[key] || key : key;
    };
    return (
        <TranslationContext.Provider value={{ getTranslation, changeLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslations = () => useContext(TranslationContext);
