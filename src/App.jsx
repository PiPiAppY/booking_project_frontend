import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ResourcesList from './components/ResourcesList';
import BookingForm from './components/BookingForm';
import BookingsList from './components/BookingsList';
import Navbar from './components/Navbar';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Если токен изменится в другой вкладке (или в этом же приложении через setToken)
    useEffect(() => {
        const handleStorage = () => setToken(localStorage.getItem('token'));
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return (
        <BrowserRouter>
            <Navbar token={token} setToken={setToken} />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/resources" />} />
                    <Route path="/register" element={!token ? <Register setToken={setToken} /> : <Navigate to="/resources" />} />
                    <Route path="/resources" element={token ? <ResourcesList /> : <Navigate to="/login" />} />
                    <Route path="/book/:id" element={token ? <BookingForm /> : <Navigate to="/login" />} />
                    <Route path="/my-bookings" element={token ? <BookingsList /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/resources" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;