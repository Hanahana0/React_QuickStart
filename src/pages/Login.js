// src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(username, password);

        if (result.success) {
            navigate('/'); // 로그인 성공 시
        } else {
            setError(result.message); // 로그인 실패 시 에러 메시지 설정
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>QLinx</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>아이디</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>} {/* 에러 메시지 표시 */}
                    <button type="submit" className="login-button">로그인</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
