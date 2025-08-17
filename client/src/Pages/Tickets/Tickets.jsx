import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css";

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tickets', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setTickets(response.data);
            } catch (err) {
                setError('Ошибка загрузки тикетов');
            }
        };
        fetchTickets();
    }, []);

    const handleCreateTicket = async () => {
        if (!title || !description) {
            setError('Заполните все поля!');
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:5000/tickets',
                { title, description, status: 'open' },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setTickets([...tickets, response.data]);
            setTitle('');
            setDescription('');
            setError('');
        } catch (err) {
            setError('Ошибка создания тикета');
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await axios.put(
                `http://localhost:5000/tickets/${id}`,
                { status },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setTickets(tickets.map(ticket =>
                ticket.id === id ? { ...ticket, status } : ticket
            ));
        } catch (err) {
            setError('Ошибка обновления тикета');
        }
    };

    return (
        <div className="container">
            <h2 className="text-2xl font-bold mb-4 text-center">Система тикетов</h2>
            {error && <p className="text-danger-color mb-4">{error}</p>}

            <div className="mb-6 p-4 bg-light-color rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Создать тикет</h3>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                />
                <button
                    onClick={handleCreateTicket}
                    className="btn primary w-full"
                >
                    Создать
                </button>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-2">Тикеты</h3>
                {tickets.length === 0 ? (
                    <p className="text-gray-500">Тикетов пока нет.</p>
                ) : (
                    tickets.map(ticket => (
                        <div key={ticket.id} className="p-4 mb-2 bg-white rounded-lg shadow">
                            <h4 className="text-lg font-semibold">{ticket.title}</h4>
                            <p className="text-gray-600">{ticket.description}</p>
                            <p className="text-sm text-gray-500">Статус: {ticket.status}</p>
                            {ticket.status === 'open' && (
                                <button
                                    onClick={() => handleUpdateStatus(ticket.id, 'closed')}
                                    className="btn primary mt-2"
                                >
                                    Отметить как решённый
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Tickets;