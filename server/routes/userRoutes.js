const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { USERS_FILE, readFile, writeFile } = require('../utils/fileUtils');

const SECRET_KEY = 'your-secret-key';

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await readFile(USERS_FILE);
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ error: 'Пользователь уже существует' });
    }
    users.push({ email, password });
    await writeFile(USERS_FILE, users);
    res.json({ message: 'Регистрация успешна' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка регистрации' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await readFile(USERS_FILE);
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

module.exports = router;