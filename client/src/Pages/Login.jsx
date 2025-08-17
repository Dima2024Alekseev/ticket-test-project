import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      window.location.href = '/tickets';
    } catch (err) {
      setError('Ошибка входа. Проверьте данные.');
    }
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4 text-center">Вход</h2>
      {error && <p className="text-danger-color mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="max-w-md mx-auto">
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
          Войти
        </button>
      </form>
      <p className="mt-4 text-center">
        Нет аккаунта? <Link to="/register" className="text-primary-color">Зарегистрируйтесь</Link>
      </p>
    </div>
  );
};

export default Login;