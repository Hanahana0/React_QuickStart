// src/pages/Login.js
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../state/authSlice';
import {useNavigate} from 'react-router-dom';
import './login.css';
import useTranslations from '../hooks/useTranslations';
import {notify} from "../components/toast";
import axiosClient from "../api/axiosClient";
import ApiRequest from "../api/ApiRequest";
import useAuth from "../hooks/useAuth";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {language, changeLanguage} = useTranslations(); // 언어 관련 훅
    const [userid, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('EN'); // 선택된 언어 상태 추가

    const {userInfo, updateTIMEZONE, updateLANG_CD} = useAuth();
    const [isLogin, setIsLogin] = useState(false);
    const domainKey = "GUS";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(login(domainKey, userid, password, selectedLanguage));
        if (result.success) {
            // navigate('/'); // 로그인 성공 시
            setError('');
            setIsLogin(true);
            // notify("로그인성공!" );
        } else {

            setIsLogin(false);
            setError(result.message); // 로그인 실패 시 에러 메시지 설정
        }
    };

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        updateLANG_CD(newLanguage);
        setSelectedLanguage(newLanguage); // 선택된 언어 상태 업데이트
        // changeLanguage(newLanguage); // 언어 변경 훅 호출
    };

    const test = async () => {
        // return;
        try {
            const request = new ApiRequest('loginInfo');
            const response = await axiosClient.post("/Login.do", request);
            console.log("response >>> ", response);
        } catch (e) {
            console.log(e);
        }
    }
    const test2 = async () => {
        // return;
        try {
            const request = new ApiRequest('gsdgdf');
            const response = await axiosClient.post("/Login.do", request);
            console.log("response >>> ", response);
        } catch (e) {
            console.log(e);
        }
    }
    const test3 = async () => {
        console.log("userInfo >>> ", userInfo)

    }
    const test4 = () => {
        console.log("timezone set!!!");
        updateTIMEZONE("+00:00");
    }

    const test5 = () => {
        console.log("timezone del!!!");
        updateTIMEZONE(null);
    }
    

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
                            value={userid}
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

                    {/* 언어 선택기와 로그인 버튼을 같은 행에 배치 */}
                    <div className="action-group">
                        <select value={selectedLanguage} onChange={handleLanguageChange} className="language-selector">
                            <option value="KO">Ko</option>
                            <option value="EN">En</option>
                        </select>
                        <button type="submit" className="login-button">로그인</button>
                    </div>
                </form>
                <button onClick={test}> 테스트</button>
                <button onClick={test2}> 테스트2</button>
                <button onClick={test3}> 유저정보확인 콘솔창</button>
                <button onClick={test4}> 타임존세팅</button>
                <button onClick={test5}> 타임존지우기</button>
            </div>
        </div>
    );
};

export default Login;
