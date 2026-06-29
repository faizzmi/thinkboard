# Thinkboard — Setup Guide

## Prerequisites

- Node.js v20+
- npm
- MongoDB Atlas account
- Upstash account (for Redis)

---

## Project Structure

```
thinkboard/
├── backend/
└── frontend/
```

---

## Backend Setup

### 1. Initialize the project

```bash
mkdir backend && cd backend
npm init -y
```

### 2. Install dependencies

```bash
npm install express mongoose dotenv @upstash/ratelimit @upstash/redis
npm install --save-dev nodemon
```

### 3. Update `package.json`

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  }
}
```

### 4. Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### 5. Run the backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd ../frontend
npm create vite@latest . -- --template react
npm install
npm run dev
```

---

## Common Errors

| Error | Fix |
|-------|-----|
| `Missing script: "dev"` | Add `"dev": "nodemon src/server.js"` to `scripts` in `package.json` |
| `does not provide an export named 'Ratelimit'` | Use `import ratelimit from` (default export, not named) |
| dotenv tip logs in terminal | Downgrade to `dotenv@16.4.5` |