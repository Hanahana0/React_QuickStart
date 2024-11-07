import { useDispatch, useSelector } from 'react-redux';
import { fetchTranslations, setLanguage } from '../state/translationSlice';
import { useEffect } from 'react';

const useTranslations = () => {
    const dispatch = useDispatch();
    const translations = useSelector((state) => state.translation.translations);
    const language = useSelector((state) => state.translation.language);

    useEffect(() => {
        if (!translations[language]) { // 해당 언어 데이터가 없을 때만 요청
            dispatch(fetchTranslations(language));
        }
    }, [language, dispatch, translations]);

    const getTranslation = (key) => {
        return translations[language]?.[key] || key;
    };

    const changeLanguage = (lang) => {
        if (lang !== language) {
            dispatch(setLanguage(lang));
            dispatch(fetchTranslations(lang));
        }
    };

    return { getTranslation, changeLanguage, language };
};

export default useTranslations;
