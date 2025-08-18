import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import "./style.css";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      window.location.href = '/tickets';
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка входа. Проверьте данные.');
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="login-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="login-header">
          <h2>Добро пожаловать</h2>
          <p>Войдите в свой аккаунт</p>
        </div>

        {error && (
          <motion.div
            className="login-error"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div
            className={`input-group ${email ? 'filled' : ''}`}
            onClick={() => emailRef.current.focus()}
          >
            <div className="input-icon">
              <FiMail />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div
            className={`input-group ${password ? 'filled' : ''}`}
            onClick={() => passwordRef.current.focus()}
          >
            <div className="input-icon">
              <FiLock />
            </div>
            <div className="input-field">
              <label htmlFor="password">Пароль</label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-options">
            <Link to="/forgot-password" className="forgot-password">
              Забыли пароль?
            </Link>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              <>
                Войти <FiArrowRight className="arrow-icon" />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <span>Нет аккаунта?</span>
          <Link to="/register" className="register-link">
            Создать аккаунт
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;