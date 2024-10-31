import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import {useTranslations} from '../context/TranslationContext';

const Login = ({onLogin}) => {
    const {translations, changeLanguage} = useTranslations();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post('/auth/authenticate', {username, password});
            const token = response.data;
            sessionStorage.setItem('user_session', token);
            setError(null);
            onLogin();
            alert(translations['LOGIN_SUCCESS']);
            navigate('/dashboard');
        } catch (err) {
            setError(translations['LOGIN_FAILURE']);
        }
    };

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        changeLanguage(selectedLanguage);
    };

    return (
        <div>
            <h2>{translations['login']}</h2>
            <label>
                {translations['language']}:
                <select value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="ko">한국어</option>
                </select>
            </label>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder={translations['username']}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder={translations['password']}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{translations['loginButton']}</button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
};

export default Login;
