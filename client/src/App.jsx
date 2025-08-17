import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../src/styles/index.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="logo">Ticket System</Link>
            <div className="nav-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
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