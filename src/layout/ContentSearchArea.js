import React from 'react';
import useTranslations from "../hooks/useTranslations";
import axiosClient from '../api/axiosClient';

import './contentSearchArea.css';

const ContentSearchArea = ({tab, searchFields, searchConditions, setSearchConditions}) => {

    const {getTranslation} = useTranslations();

    // Uncomment the following code to fetch search fields dynamically
    // useEffect(() => {
    //     const fetchSearchFields = async () => {
    //         try {
    //             const response = await axiosClient.get(`/api/search-fields?tabId=${nowtab.id}`);
    //             setSearchFields(response.data);
    //         } catch (error) {
    //             console.error("조회 조건 데이터를 가져오는 중 오류 발생:", error);
    //         }
    //     };

    //     if (nowtab) {
    //         fetchSearchFields();
    //     }
    // }, [nowtab]);
    // 입력 변경 시 `UserManagement`의 상태를 업데이트
    const handleInputChange = (e, field) => {
        const {value} = e.target;
        setSearchConditions(prevConditions => ({
            ...prevConditions,
            [field.name]: value
        }));
    };
    return (
        <div className="content-search-area">
            <h2>Search Conditions for: {getTranslation(tab.title)}</h2>
            <div className="search-fields-container">
                {searchFields.map((field) => (
                    <div key={field.id} className="search-field">
                        <label>{getTranslation(field.label)}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={searchConditions[field.name] || ''} // 기본값은 빈 문자열로 설정
                            onChange={(e) => handleInputChange(e, field)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentSearchArea;
