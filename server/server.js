const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const TICKETS_FILE = './tickets.json';
const USERS_FILE = './users.json';
const SECRET_KEY = 'your-secret-key'; // Замени на безопасный ключ в продакшене

// Инициализация файлов
async function initFiles() {
  try {
    await fs.access(TICKETS_FILE);
  } catch {
    await fs.writeFile(TICKETS_FILE, JSON.stringify([]));
  }
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, JSON.stringify([]));
  }
}

// Middleware для проверки JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Токен отсутствует' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Недействительный токен' });
    req.user = user;
    next();
  });
};

// Регистрация
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await fs.readFile(USERS_FILE);
    const users = JSON.parse(data);
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ error: 'Пользователь уже существует' });
    }
    users.push({ email, password }); // В реальном проекте хешируй пароль!
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    res.json({ message: 'Регистрация успешна' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка регистрации' });
  }
});

// Вход
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await fs.readFile(USERS_FILE);
    const users = JSON.parse(data);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: 'Неверные данные' });
    }
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка входа' });
  }
});

// Получение всех тикетов
app.get('/tickets', authenticateToken, async (req, res) => {
  try {
    const data = await fs.readFile(TICKETS_FILE);
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения тикетов' });
  }
});

// Создание нового тикета
app.post('/tickets', authenticateToken, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const data = await fs.readFile(TICKETS_FILE);
    const tickets = JSON.parse(data);
    const newTicket = {
      id: tickets.length ? tickets[tickets.length - 1].id + 1 : 1,
      title,
      description,
      status,
      userEmail: req.user.email,
    };
    tickets.push(newTicket);
    await fs.writeFile(TICKETS_FILE, JSON.stringify(tickets, null, 2));
    res.json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка создания тикета' });
  }
});

// Обновление статуса тикета
app.put('/tickets/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await fs.readFile(TICKETS_FILE);
    let tickets = JSON.parse(data);
    const ticket = tickets.find(t => t.id === parseInt(id) && t.userEmail === req.user.email);
    if (!ticket) {
      return res.status(403).json({ error: 'Доступ запрещён или тикет не найден' });
    }
    tickets = tickets.map(ticket =>
      ticket.id === parseInt(id) ? { ...ticket, status } : ticket
    );
    await fs.writeFile(TICKETS_FILE, JSON.stringify(tickets, null, 2));
    res.json({ message: 'Тикет обновлён' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления тикета' });
  }
});

app.listen(port, async () => {
  await initFiles();
  console.log(`Сервер запущен на http://localhost:${port}`);
});

//main server ticket system