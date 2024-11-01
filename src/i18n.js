// src/config/i18n.js
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {}, // 초기에는 빈 리소스, 서버에서 데이터를 받아오면 업데이트
        lng: 'en', // 기본 언어
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React에서는 XSS 공격을 방지하기 때문에 이 설정이 필요하지 않음
        },
    });

export default i18n;
 