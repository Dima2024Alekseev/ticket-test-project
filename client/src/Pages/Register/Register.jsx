import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
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
            setError(err.response?.data?.message || 'Ошибка регистрации. Попробуйте снова.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h2>Создайте аккаунт</h2>
                    <p>Зарегистрируйтесь, чтобы начать работу</p>
                </div>

                {error && (
                    <div className="register-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="register-form">
                    <div className={`input-group ${email ? 'filled' : ''}`}>
                        <div className="input-icon">
                            <FiMail />
                        </div>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className={`input-group ${password ? 'filled' : ''}`}>
                        <div className="input-icon">
                            <FiLock />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Пароль</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="register-button">
                        Зарегистрироваться <FiArrowRight className="arrow-icon" />
                    </button>
                </form>

                <div className="register-footer">
                    <span>Уже есть аккаунт?</span>
                    <Link to="/login" className="login-link">
                        Войти
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;