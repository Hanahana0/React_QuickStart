import api from '../../../api/axiosClient';
import ApiRequest from "../../../api/ApiRequest";

// 모든 유저를 조회하는 API 호출
const UserSelect = async (con) => {
    const request = new ApiRequest('USER_SELECT', { ...con });
    const response = await api.post("/api/users/getAll", request);
    return response.RTN_DATA;
};

// 유저를 ID로 조회하는 API 호출
const UserSelectById = async (userId) => {
    const request = new ApiRequest('USER_SELECT_BY_ID', { id: userId });
    const response = await api.post("/api/users/getById", request);
    return response.RTN_DATA;
};

// 유저를 저장하는 API 호출
const UserSave = async (userData) => {
    const request = new ApiRequest('USER_SAVE', { ...userData });
    const response = await api.post("/api/users/create", request);
    return response.RTN_DATA;
};

// 유저를 업데이트하는 API 호출
const UserUpdate = async (userData) => {
    const request = new ApiRequest('USER_UPDATE', { ...userData });
    const response = await api.post("/api/users/update", request);
    return response.RTN_DATA;
};

// 유저를 삭제하는 API 호출
const UserDelete = async (userId) => {
    const request = new ApiRequest('USER_DELETE', { id: userId });
    const response = await api.post("/api/users/delete", request);
    return response.RTN_DATA;
};

export { UserSelect, UserSelectById, UserSave, UserUpdate, UserDelete };
