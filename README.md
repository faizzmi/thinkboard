# ThinkBoard

A full-stack notes app built with the MERN stack. Notes carry structure, not just plain text, type, priority, deadline, location, and checklists all built in, with a dashboard that surfaces what matters automatically.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 (Vite), Tailwind CSS, daisyUI |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt, client-side SHA-256 pre-hashing |
| Email | Resend |
| Rate Limiting | Upstash Redis, @upstash/ratelimit |
| Logging | Winston, Morgan |
| Error Tracking | Sentry (frontend + backend) |
| Testing | Mocha, Chai, Supertest, Sinon (backend) · Vitest, React Testing Library, MSW (frontend) |
| PDF Export | PDFKit |
| Runtime | Node.js v20 (ESM) |

---

## Features

### Notes with structure
- Type each note as a **note**, **task**, or **event**
- Set **priority**: low, medium, high
- Attach a **deadline** with overdue detection
- Attach a **location**
- Break work down with an inline **checklist**, progress tracked automatically

### Dashboard
- Overdue and upcoming (next 7 days) items surfaced automatically
- Checklist completion progress at a glance
- Note counts by type
- Mini calendar with marked deadline dates, filter notes by day

### Sharing & export
- Toggle a **read-only share link** for any note
- **Export any note as a PDF**

### Split view
- Open two notes side by side on larger screens for comparing or cross-referencing

### Auth & account
- Signup/login with hashed passwords
- Email verification flow
- Forgot / reset password flow
- Change password and update profile from settings
- Rate-limited auth endpoints against brute force

### Appearance
- 12+ built-in themes via daisyUI, switchable from settings, persisted per-account

### Keyboard shortcuts
- `Cmd/Ctrl + K` — command palette
- `Shift + N` — new note
- `G` then `H` — go to notes
- `G` then `P` — go to settings
- `Cmd/Ctrl + Enter` — save note
- `Shift + ?` — show shortcuts reference
- `Esc` — close modal/dialog

### Reliability
- Centralized structured logging (Winston + Morgan)
- Sentry error tracking on both frontend and backend
- Global error boundary with automatic crash reporting
- IP-based and auth-specific rate limiting

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

**Backend**
```env
PORT=5001
MONGODB_URI=
JWT_SECRET=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
RESEND_API_KEY=
EMAIL_FROM=
FRONTEND_URL=
SENTRY_DSN_BACKEND=
```

**Frontend**
```env
VITE_SENTRY_DSN=
```

---

## Testing

```bash
npm run test
```

Runs backend (Mocha) and frontend (Vitest) suites, including auth, notes API, rate limiting, and component tests.

---

## Project Structure

```
thinkboard/
├── backend/    # Express API, MongoDB models, auth, notes, PDF export
└── frontend/   # React app, Vite, Tailwind + daisyUI
```

---

## Author

Built by [Faiz](https://faizazmi.vercel.app)