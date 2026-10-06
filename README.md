# 📸 LensCraft Studios — Photographer Booking & Lead Generation Platform

> A **full-stack MERN** photography website with complete **lead management**, **portfolio gallery**, **WhatsApp integration**, and an **admin panel** — production-ready.

---

## 🏗️ Project Structure

```
photography_web/
├── frontend/     → React + Vite + Tailwind CSS (Customer Website + Admin Panel)
└── backend/      → Node.js + Express + MongoDB (REST API)
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js v18+
- MongoDB running locally (`mongod`) OR MongoDB Atlas URI

### 1. Backend Setup

```bash
cd backend
cp .env.example .env        # Fill in MONGODB_URI and JWT_SECRET
npm install
npm run dev                 # Runs on http://localhost:5001
```

**Default Admin Credentials (seeded automatically):**
- Email: `admin@lenscraft.com`
- Password: `admin123`

> ⚠️ Change the admin password immediately after first login in production!

### 2. Frontend Setup

```bash
cd frontend
cp .env.example .env        # Set VITE_API_BASE_URL if deploying to production
npm install
npm run dev                 # Runs on http://localhost:5173
```

---

## 🌐 Production Deployment

### Backend → Render / Railway

1. Push `backend/` to a GitHub repository
2. Create a new Web Service on [Render.com](https://render.com)
3. Set environment variables:
   - `MONGODB_URI` → Your MongoDB Atlas connection string
   - `JWT_SECRET` → Strong random 64-character secret
   - `NODE_ENV=production`
4. Build Command: `npm install`
5. Start Command: `npm start`

### Frontend → Vercel

1. Push `frontend/` to a GitHub repository
2. Import project on [Vercel.com](https://vercel.com)
3. Set environment variable:
   - `VITE_API_BASE_URL` → Your Render backend URL (e.g. `https://your-backend.onrender.com/api`)
4. Deploy

### Database → MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create DB user & whitelist IPs
3. Copy connection string → paste into backend `MONGODB_URI`

---

## 📄 API Endpoints

### Public (No Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/leads` | Submit customer enquiry |
| `GET` | `/api/portfolio` | Get published portfolio images |
| `GET` | `/api/services` | Get active services |
| `GET` | `/api/packages` | Get active packages |
| `GET` | `/api/testimonials` | Get published testimonials |
| `GET` | `/api/settings` | Get public website settings |

### Admin (JWT Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Admin login |
| `GET` | `/api/leads` | Get all leads with filters |
| `PUT` | `/api/leads/:id/status` | Update lead status |
| `POST` | `/api/leads/:id/notes` | Add internal note to lead |
| `POST/PUT/DELETE` | `/api/portfolio` | CRUD portfolio images |
| `POST/PUT/DELETE` | `/api/services` | CRUD services |
| `POST/PUT/DELETE` | `/api/packages` | CRUD packages |
| `POST/PUT/DELETE` | `/api/testimonials` | CRUD testimonials |
| `PUT` | `/api/settings` | Update website settings |

---

## 🗂️ Features Checklist

### ✅ Customer Website
- [x] Hero Section with CTAs & WhatsApp Button
- [x] About Photographer Page
- [x] Portfolio Gallery with Category Filtering & Lightbox
- [x] Services Detail Page with Enquire Now CTAs
- [x] Pricing Packages Page
- [x] Testimonials Page
- [x] Full Enquiry / Booking Form
- [x] Contact Page
- [x] Floating WhatsApp Button (always visible)
- [x] Privacy Policy + Terms pages

### ✅ Lead Generation
- [x] Inline Home Page Enquiry Form
- [x] Service-specific Enquiry Modal
- [x] WhatsApp CTA integration with pre-filled messages
- [x] All leads stored in MongoDB with status tracking

### ✅ Admin Panel
- [x] Secure JWT Login
- [x] Dashboard with KPI stats (Total Leads, New, Confirmed)
- [x] Full Lead Management (View, Status Update, Notes, WhatsApp/Call)
- [x] Portfolio Management (CRUD with image URLs)
- [x] Services Management
- [x] Packages Management with price visibility controls
- [x] Testimonials Management
- [x] Website Settings (WhatsApp number, SEO, social links, bio)

---

## 🔐 Security Notes

- JWT tokens with 7-day expiry
- Admin password hashed with bcrypt
- Public API routes are protected from write operations
- Admin APIs require Bearer token in header
- Input validation on all form submissions

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS v4 |
| State | React Context API |
| HTTP | Axios |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Icons | Lucide React |
| Images | Unsplash (demo) / Cloudinary (production) |

---

## 📱 WhatsApp Lead Flow

1. Visitor lands on website
2. Clicks any CTA (floating button, hero, service, package)
3. WhatsApp opens with pre-filled enquiry message
4. Photographer receives direct message on WhatsApp
5. Admin also receives form submissions via the enquiry form

---

## ☁️ Image Storage (Production)

For production, replace Unsplash image URLs with **Cloudinary** hosted images:

1. Create free [Cloudinary](https://cloudinary.com) account
2. Upload portfolio images
3. Use the Cloudinary image URLs when adding portfolio items in Admin Panel

---

*Built for photographers who want a premium online presence and smart lead management.*
