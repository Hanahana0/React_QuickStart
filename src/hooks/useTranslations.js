// src/hooks/useTranslations.js
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage, fetchTranslations } from '../state/translationSlice';
import { useEffect } from 'react';

const useTranslations = () => {
    const dispatch = useDispatch();
    const { translations, language } = useSelector((state) => state.translation);

    useEffect(() => {
        dispatch(fetchTranslations(language)); // language가 변경될 때마다 번역 데이터를 가져옴
    }, [language, dispatch]);

    const getTranslation = (key) => {
        return translations[key] || key;
    };

    const changeLanguageHandler = (lang) => {
        if (language !== lang) {
            dispatch(changeLanguage(lang)); // 언어 변경
            dispatch(fetchTranslations(lang)); // 언어 변경 후 번역 데이터 새로고침
        }
    };

    return { getTranslation, changeLanguage: changeLanguageHandler };
};

export default useTranslations;
