// src/components/TranslatedText.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import i18n from '../i18n';

const TranslatedText = ({ msg }) => {
  const translations = useSelector((state) => state.language.translations);
  const currentLang = useSelector((state) => state.language.currentLang);

  useEffect(() => {
    if (translations && Object.keys(translations).length) {
      i18n.addResources(currentLang, 'translation', translations);
    }
  }, [translations, currentLang]);

  return <p>{i18n.t(`translation.${msg}`)}</p>;
};

export default TranslatedText;
