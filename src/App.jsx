import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginSignup from './pages/LoginSignup';
import Dashboard from './pages/Dashboard';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const handleStorage = () => setToken(localStorage.getItem('token'));
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return (
        <HashRouter>
            <Routes>
                {/* √лавна€ страница Ч вход/регистраци€, если нет токена */}
                <Route
                    path="/"
                    element={!token ? <LoginSignup setToken={setToken} /> : <Navigate to="/dashboard" />}
                />
                {/* ƒашборд Ч только дл€ авторизованных */}
                <Route
                    path="/dashboard"
                    element={token ? <Dashboard /> : <Navigate to="/" />}
                />
                {/* ѕеренаправл€ем старые ссылки, чтобы не ломать закладки */}
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/register" element={<Navigate to="/" />} />
                <Route path="/resources" element={<Navigate to="/dashboard" />} />
                <Route path="/my-bookings" element={<Navigate to="/dashboard" />} />
                <Route path="/book/:id" element={<Navigate to="/dashboard" />} />
            </Routes>
        </HashRouter>
    );
}

export default App;