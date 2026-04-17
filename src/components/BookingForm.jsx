import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function BookingForm() {
    const { id } = useParams(); // id ресурса из URL
    const [resource, setResource] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [purpose, setPurpose] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const response = await api.get(`/resources/${id}`);
                setResource(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchResource();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/bookings', {
                resource_id: id,
                start_time: startTime,
                end_time: endTime,
                purpose,
            });
            navigate('/my-bookings');
        } catch (err) {
            setError(err.response?.data?.error || 'Ошибка бронирования');
        }
    };

    if (!resource) return <div>Загрузка...</div>;

    return (
        <div>
            <h2>Бронирование: {resource.name}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Начало:</label>
                <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                <label>Конец:</label>
                <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                <label>Цель:</label>
                <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                <button type="submit">Забронировать</button>
            </form>
        </div>
    );
}

export default BookingForm;