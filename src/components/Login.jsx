import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Login({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email: username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setToken(token);          // 👈 обновляем состояние в App
            navigate('/resources');
        } catch (err) {
            setError(err.response?.data?.error || 'Ошибка входа');
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Войти</button>
            </form>
            <p>Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
        </div>
    );
}

export default Login;