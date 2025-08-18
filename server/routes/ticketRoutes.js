const express = require('express');
const router = express.Router();
const { TICKETS_FILE, readFile, writeFile } = require('../utils/fileUtils');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const tickets = await readFile(TICKETS_FILE);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения тикетов' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const tickets = await readFile(TICKETS_FILE);
    const newTicket = {
      id: tickets.length ? tickets[tickets.length - 1].id + 1 : 1,
      title,
      description,
      status,
      userEmail: req.user.email,
    };
    tickets.push(newTicket);
    await writeFile(TICKETS_FILE, tickets);
    res.json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка создания тикета' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const tickets = await readFile(TICKETS_FILE);
    const ticket = tickets.find(t => t.id === parseInt(id) && t.userEmail === req.user.email);
    if (!ticket) {
      return res.status(403).json({ error: 'Доступ запрещён или тикет не найден' });
    }
    const updatedTickets = tickets.map(ticket =>
      ticket.id === parseInt(id) ? { ...ticket, status } : ticket
    );
    await writeFile(TICKETS_FILE, updatedTickets);
    res.json({ message: 'Тикет обновлён' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления тикета' });
  }
});

module.exports = router;