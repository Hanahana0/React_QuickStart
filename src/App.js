import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import {TranslationProvider} from './context/TranslationContext';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('user_session')) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('user_session');
        setIsLoggedIn(false);
    };

    return (
        <TranslationProvider>
            <Router>
                <nav>
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard">대시보드</Link>
                            <button onClick={handleLogout}>로그아웃</button>
                        </>
                    ) : (
                        <Link to="/login">로그인</Link>
                    )}
                </nav>
                <Routes>
                    <Route path="/login"
                           element={isLoggedIn ? <Navigate to="/dashboard"/> : <Login onLogin={handleLogin}/>}/>
                    <Route path="/dashboard" element={isLoggedIn ? <Dashboard/> : <Navigate to="/login"/>}/>
                </Routes>
            </Router>
        </TranslationProvider>
    );
};

export default App;
