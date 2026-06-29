# Thinkboard

A full-stack Notes app built with the MERN stack, featuring Upstash Redis rate limiting. Built while following [@codesistency](https://www.youtube.com/@codesistency)'s MERN crash course on freeCodeCamp.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js (Vite) |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Rate Limiting | Upstash Redis, @upstash/ratelimit |
| Runtime | Node.js v20 (ESM) |

---

## Features

- Create, read, update, and delete notes
- REST API with Express
- MongoDB persistence via Mongoose
- API rate limiting with Upstash Redis (sliding window, 10 req / 10s)
- Responsive React frontend

---

## Getting Started

See [SETUP.md](./SETUP.md) for full setup instructions.

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev
```

---

## Environment Variables

```env
PORT=5000
MONGO_URI=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## Course Reference

Based on the [MERN Stack Crash Course](https://www.youtube.com/watch?v=F9gB5b4jgOI) by @codesistency on freeCodeCamp.

Original repo: [burakorkmez/mern-thinkboard](https://github.com/burakorkmez/mern-thinkboard)