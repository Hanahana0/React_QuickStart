/**
 * 공통으로 사용할 api 모음!
 */
import axiosClient from '../api/axiosClient';
import ApiRequest from "../api/ApiRequest";

// 전체 메뉴 조회
const getMenus = async () => {
    try {
        const request = new ApiRequest('MENU', {});
        const response = await axiosClient.post('/api/menus', request);

        if (response.RTN_CD !== null) {
            throw new Error(response.RTN_MSG || 'Error fetching menus');
        }

        return response;
    } catch (error) {
        console.error("Error in getMenus:", error);
        throw error;
    }
};

// 전체 언어 조회
const getTranslationAll = async () => {
    try {
        const request = new ApiRequest('TRANSLATION', {});
        const response = await axiosClient.post('/api/translation', request);

        if (response.RTN_CD !== null) {
            throw new Error(response.RTN_MSG || 'Error fetching menus');
        }

        return response;
    } catch (error) {
        console.error("Error in getTranslationAll:", error);
        throw error;
    }
};

// 특정 언어 조회
const getTranslationByLang = async (lang) => {
    try {
        const request = new ApiRequest('TRANSLATION_LANG', {lang: lang});
        const response = await axiosClient.post(`/api/translation`, request);

        if (response.RTN_CD !== null) {
            throw new Error(response.RTN_MSG || 'Error fetching menus');
        }

        return response;
    } catch (error) {
        console.error("Error in getTranslationByLang:", error);
        throw error;
    }
};

export default {getMenus, getTranslationAll, getTranslationByLang};
