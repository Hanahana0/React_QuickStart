import {useDispatch, useSelector} from 'react-redux';
import {fetchTranslations} from '../state/translationSlice';
import {useEffect} from 'react';

const useTranslations = () => {
    const dispatch = useDispatch();
    const translations = useSelector((state) => state.translation.translations);
    const language = useSelector((state) => state.translation.language);

    // 언어가 변경될 때마다 번역을 불러오도록 설정
    useEffect(() => {
        if (language) {
            dispatch(fetchTranslations(language));
        }
    }, [language, dispatch]);

    // 안전하게 번역 키를 반환하는 함수
    const getTranslation = (key) => {
        return translations && translations[key] ? translations[key] : key;
    };

    const changeLanguage = (lang) => {
        if (lang !== language) {
            dispatch(fetchTranslations(lang));
        }
    };

    return {getTranslation, changeLanguage, language};
};

export default useTranslations;
