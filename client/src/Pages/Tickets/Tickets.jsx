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
        <div className="tickets-container">
            <div className="tickets-header">
                <h2>Система тикетов</h2>
            </div>

            {error && <div className="tickets-error">{error}</div>}

            <div className="create-ticket-card">
                <h3>Создать тикет</h3>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="ticket-input"
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="ticket-input ticket-textarea"
                />
                <button
                    onClick={handleCreateTicket}
                    className="create-ticket-btn"
                >
                    Создать
                </button>
            </div>

            <div className="tickets-list">
                <h3>Тикеты</h3>
                {tickets.length === 0 ? (
                    <div className="no-tickets">Тикетов пока нет.</div>
                ) : (
                    tickets.map(ticket => (
                        <div key={ticket.id} className="ticket-card">
                            <h4 className="ticket-title">{ticket.title}</h4>
                            <p className="ticket-description">{ticket.description}</p>
                            <span className={`ticket-status ${ticket.status}`}>
                                {ticket.status === 'open' ? 'Открыт' : 'Закрыт'}
                            </span>
                            {ticket.status === 'open' && (
                                <button
                                    onClick={() => handleUpdateStatus(ticket.id, 'closed')}
                                    className="resolve-btn"
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