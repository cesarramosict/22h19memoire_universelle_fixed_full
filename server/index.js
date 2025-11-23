const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sqlite3 = require('sqlite3').verbose();
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic security and parsing
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Basic rate limiter to prevent abuse
const limiter = rateLimit({ windowMs: 60 * 1000, max: 30 });
app.use(limiter);

// SQLite DB (file stored in server folder)
const DB_PATH = path.join(__dirname, 'subscribers.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) console.error('Could not open DB', err);
  else console.log('SQLite DB opened at', DB_PATH);
});

// Create table if not exists
db.run(
  `CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    created_at TEXT NOT NULL,
    ip TEXT,
    user_agent TEXT
  )`
);

function validEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.get('/', (req, res) => {
  res.json({ ok: true, msg: 'Newsletter subscriber endpoint' });
});

app.post('/subscribe', (req, res) => {
  const email = (req.body && req.body.email) ? req.body.email.trim() : '';
  if (!validEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email' });
  }

  const created_at = new Date().toISOString();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const user_agent = req.get('User-Agent') || '';

  const stmt = db.prepare('INSERT INTO subscribers (email, created_at, ip, user_agent) VALUES (?, ?, ?, ?)');
  stmt.run(email, created_at, ip, user_agent, function(err) {
    if (err) {
      console.error('DB insert error', err);
      return res.status(500).json({ ok: false, error: 'DB error' });
    }
    res.json({ ok: true, id: this.lastID });
  });
  stmt.finalize();
});

// simple endpoint to list subscribers (DEV only - no auth)
app.get('/subscribers', (req, res) => {
  db.all('SELECT id, email, created_at, ip, user_agent FROM subscribers ORDER BY id DESC LIMIT 1000', (err, rows) => {
    if (err) return res.status(500).json({ ok: false, error: 'DB error' });
    res.json({ ok: true, rows });
  });
});

app.listen(PORT, () => {
  console.log(`Newsletter server listening on http://localhost:${PORT}`);
});
