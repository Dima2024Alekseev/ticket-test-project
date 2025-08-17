import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./style.css";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/register', { email, password });
            window.location.href = '/login';
        } catch (err) {
            setError('Ошибка регистрации. Попробуйте снова.');
        }
    };

    return (
        <div className="container">
            <h2 className="text-2xl font-bold mb-4 text-center">Регистрация</h2>
            {error && <p className="text-danger-color mb-4">{error}</p>}
            <form onSubmit={handleRegister} className="max-w-md mx-auto">
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button type="submit" className="btn primary w-full">
                    Зарегистрироваться
                </button>
            </form>
            <p className="mt-4 text-center">
                Уже есть аккаунт? <Link to="/login" className="text-primary-color">Войдите</Link>
            </p>
        </div>
    );
};

export default Register;