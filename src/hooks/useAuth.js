// import React, { createContext, useContext, useState } from 'react';
//
// // AuthContext 생성
// const AuthContext = createContext();
//
// // AuthProvider 컴포넌트
// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//
//     // 로그인 핸들러
//     const handleLogin = () => {
//         setIsLoggedIn(true);
//     };
//
//     // 로그아웃 핸들러
//     const handleLogout = () => {
//         setIsLoggedIn(false);
//     };
//
//     return (
//         <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
//
// // useAuth 훅
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

import {useSelector, useDispatch} from "react-redux";
import {setDOMAINKEY, setLANG_CD, setGV_TIMEZONE} from "../state/authSlice";

const useAuth = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth);

    // 개별 상태를 업데이트하는 함수들
    const updateDOMAINKEY = (domainKey) => dispatch(setDOMAINKEY(domainKey));
    const updateLANG_CD = (langCd) => dispatch(setLANG_CD(langCd));
    const updateTIMEZONE = (timezone) => dispatch(setGV_TIMEZONE(timezone));

    // 필요한 값과 함수들을 반환
    return {
        // ...userInfo,
        userInfo,
        updateDOMAINKEY,
        updateLANG_CD,
        updateTIMEZONE
    };
}

export default useAuth;