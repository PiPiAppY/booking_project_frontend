import { Link, useNavigate } from 'react-router-dom';

function Navbar({ token, setToken }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    };

    return (
        <nav>
            {token ? (
                <>
                    <Link to="/resources">Ресурсы</Link>
                    <Link to="/my-bookings">Мои бронирования</Link>
                    <button onClick={handleLogout}>Выйти</button>
                </>
            ) : (
                <>
                    <Link to="/login">Вход</Link>
                    <Link to="/register">Регистрация</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;