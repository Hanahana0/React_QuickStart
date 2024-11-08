// src/pages/Login.js
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../state/authSlice';
import {useNavigate} from 'react-router-dom';
import './login.css';
import {notify} from "../components/toast";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const domainKey = "test";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(login(domainKey, username, password));
        if (result.success) {
            // navigate('/'); // 로그인 성공 시
            setError('');
            // notify("로그인성공!" );
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
                            lang="en" // 기본 언어를 영어로 설정
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus={true}
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
