import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './styles/index.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Tickets from './Pages/Tickets';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="logo">Ticket System</Link>
            <div className="nav-links">
              {isAuthenticated ? (
                <>
                  <Link to="/tickets" className="nav-link">Tickets</Link>
                  <button onClick={handleLogout} className="nav-link">
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Вход</Link>
                  <Link to="/register" className="nav-link">Регистрация</Link>
                </>
              )}
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="hero">
                <div className="container">
                  <h1>Welcome to Ticket Support System</h1>
                  <p>Efficient way to manage and resolve customer issues</p>
                  <div className="cta-buttons">
                    <Link to="/login" className="btn primary">Get Started</Link>
                    <Link to="/register" className="btn secondary">Learn More</Link>
                  </div>
                </div>
              </div>
            } />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/tickets"
              element={isAuthenticated ? <Tickets /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container">
            <p>© {new Date().getFullYear()} Ticket System. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;