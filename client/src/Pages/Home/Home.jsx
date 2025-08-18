import { Link } from 'react-router-dom';
import { FiList, FiUsers, FiSettings } from 'react-icons/fi'; // Заменили FiTicket на FiList
import './style.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="container">
          <h1>Добро пожаловать в систему поддержки</h1>
          <p className="subtitle">Эффективное управление и решение задач вашей команды</p>
          
          <div className="cta-buttons">
            <Link to="/login" className="btn primary">
              Начать работу
            </Link>
            <Link to="/register" className="btn secondary">
              Узнать больше
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2>Наши возможности</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FiList /> {/* Заменили FiTicket на FiList */}
              </div>
              <h3>Управление заявками</h3>
              <p>Создавайте, отслеживайте и решайте задачи в одном месте</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FiUsers />
              </div>
              <h3>Командная работа</h3>
              <p>Назначайте задачи коллегам и отслеживайте прогресс</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FiSettings />
              </div>
              <h3>Гибкие настройки</h3>
              <p>Адаптируйте систему под ваши бизнес-процессы</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;