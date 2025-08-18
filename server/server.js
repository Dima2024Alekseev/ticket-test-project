const express = require('express');
const cors = require('cors');
const { initFiles } = require('./utils/fileUtils');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/tickets', ticketRoutes);
app.use('/api', userRoutes);

app.listen(port, async () => {
  await initFiles();
  console.log(`Сервер запущен на http://localhost:${port}`);
});