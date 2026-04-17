import { useEffect, useState } from 'react';
import api from '../api';

function BookingsList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/bookings/me');
            setBookings(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancel = async (id) => {
        if (window.confirm('Отменить бронирование?')) {
            try {
                await api.delete(`/bookings/${id}`);
                fetchBookings(); // обновить список
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (loading) return <div>Загрузка...</div>;

    return (
        <div>
            <h2>Мои бронирования</h2>
            {bookings.length === 0 && <p>Нет бронирований</p>}
            <ul>
                {bookings.map(b => (
                    <li key={b.id}>
                        {b.resource_name} — с {new Date(b.start_time).toLocaleString()} по {new Date(b.end_time).toLocaleString()} — {b.purpose || 'без цели'}
                        <button onClick={() => handleCancel(b.id)}>Отменить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookingsList;