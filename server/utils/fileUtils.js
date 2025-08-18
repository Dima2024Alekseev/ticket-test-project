const fs = require('fs').promises;

const TICKETS_FILE = './tickets.json';
const USERS_FILE = './users.json';

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

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Ошибка чтения файла ${filePath}: ${error.message}`);
  }
}

async function writeFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(`Ошибка записи в файл ${filePath}: ${error.message}`);
  }
}

module.exports = {
  TICKETS_FILE,
  USERS_FILE,
  initFiles,
  readFile,
  writeFile,
};