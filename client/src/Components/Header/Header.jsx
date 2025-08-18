import { Link } from 'react-router-dom';
import "./style.css";

const Header = ({ isAuthenticated, handleLogout }) => {
    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">Ticket System</Link>
                <div className="nav-links">
                    {isAuthenticated ? (
                        <>
                            <Link to="/tickets" className="nav-link">Заявки</Link>
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
    );
};

export default Header;