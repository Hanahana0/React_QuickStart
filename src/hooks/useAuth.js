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
