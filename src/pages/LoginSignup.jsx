import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginSignup() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('login');

    // Логин
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    // Регистрация — убираем full_name, оставляем только email/password
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirm, setSignupConfirm] = useState('');
    const [signupError, setSignupError] = useState('');
    const [signupLoading, setSignupLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setLoginLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, password: loginPassword }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Login failed');
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); // user: { id, email, is_admin }
            navigate('/dashboard');
        } catch (err) {
            setLoginError(err.message);
        } finally {
            setLoginLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setSignupError('');
        if (signupPassword !== signupConfirm) {
            setSignupError('Passwords do not match');
            return;
        }
        setSignupLoading(true);
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: signupEmail, password: signupPassword }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Registration failed');
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        } catch (err) {
            setSignupError(err.message);
        } finally {
            setSignupLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="auth-card">
                <h1 className="logo">ResourceHub</h1>
                <div className="tabs">
                    <button className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => { setActiveTab('login'); setLoginError(''); setSignupError(''); }}>Login</button>
                    <button className={`tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => { setActiveTab('signup'); setLoginError(''); setSignupError(''); }}>Sign Up</button>
                </div>

                {activeTab === 'login' && (
                    <form onSubmit={handleLogin} className="auth-form">
                        <div className="field">
                            <label>Email</label>
                            <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                        </div>
                        {loginError && <div className="error-message">{loginError}</div>}
                        <button type="submit" className="submit-btn" disabled={loginLoading}>{loginLoading ? 'Signing In...' : 'Sign In'}</button>
                    </form>
                )}

                {activeTab === 'signup' && (
                    <form onSubmit={handleSignup} className="auth-form">
                        <div className="field">
                            <label>Email</label>
                            <input type="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} required />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type="password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required />
                        </div>
                        <div className="field">
                            <label>Confirm Password</label>
                            <input type="password" value={signupConfirm} onChange={e => setSignupConfirm(e.target.value)} required />
                        </div>
                        {signupError && <div className="error-message">{signupError}</div>}
                        <button type="submit" className="submit-btn" disabled={signupLoading}>{signupLoading ? 'Creating Account...' : 'Create Account'}</button>
                    </form>
                )}
            </div>
            <div className="illustration" aria-hidden="true">...</div>
        </div>
    );
}

export default LoginSignup;