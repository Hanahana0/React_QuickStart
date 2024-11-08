import api from '../../../api/axiosClient';

// 모든 유저를 조회하는 API 호출
const UserSelect = (con) => api.post("/api/users/getAll",{...con});
const UserSelectById = (params) => api.post("/api/users/getById", params);

// 유저를 저장하는 API 호출
const UserSave = (userData) => api.post("/api/users/create", userData);

// 유저를 업데이트하는 API 호출
const UserUpdate = (userData) => api.post("/api/users/update", userData);

// 유저를 삭제하는 API 호출
const UserDelete = (userId) => api.post("/api/users/delete", {id: userId});

export {UserSelect, UserSelectById, UserSave, UserUpdate, UserDelete};
