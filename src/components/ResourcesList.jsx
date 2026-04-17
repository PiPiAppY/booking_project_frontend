import { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

function ResourcesList() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await api.get('/resources');
                setResources(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    if (loading) return <div>Загрузка...</div>;

    return (
        <div>
            <h2>Ресурсы</h2>
            <ul>
                {resources.map(res => (
                    <li key={res.id}>
                        <strong>{res.name}</strong> — {res.type} (вместимость: {res.capacity || '—'})
                        <Link to={`/book/${res.id}`}>Забронировать</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResourcesList;