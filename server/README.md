# Newsletter server (local)

This folder contains a minimal Node.js server (Express + SQLite) to store newsletter signups locally.

How to run locally:

1. Open a terminal in this folder (`server`).
2. Install dependencies:

   npm install

3. Start the server:

   npm start

4. The server will listen by default on `http://localhost:3000`.

Endpoints:

- `POST /subscribe` — Accepts JSON { "email": "you@example.com" } and stores it.
- `GET /subscribers` — Returns last 1000 subscribers (development helper).

Notes:
- This is a local development helper. For production you should add authentication, input sanitization, HTTPS, backups and GDPR handling for personal data.
