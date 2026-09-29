# 🏭 GMF Training Center — Welder Certification Platform

> A modern welder qualification certificate verification and management system. Built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Laravel 12** with real-time certificate data integration.

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/React-19.2-61dafb?logo=react&logoColor=white" alt="React" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Vite-8.2-646cff?logo=vite&logoColor=white" alt="Vite" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Tailwind-4.3-06b6d4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Laravel-12-ff2d20?logo=laravel&logoColor=white" alt="Laravel" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Sanctum-auth-00a86b?logo=laravel&logoColor=white" alt="Sanctum" /></a>
</p>

<p align="center">
  <img src="public/preview-smooth.gif" alt="GMF Platform Preview" width="720" />
</p>

<!-- <p align="center">
  <img src="public/preview.png" alt="GMF Dashboard & Certificate View" width="720" />
</p> -->

---

## 🚀 Features

| Feature                           | Details                                                  |
| --------------------------------- | -------------------------------------------------------- |
| 🌓 **Dark / Light Mode**          | `next-themes` + Tailwind v4 with persistent theme choice |
| 📋 **Certificate Verification**   | Public search by certificate number or welder ID         |
| 🔐 **Secure Certificate Details** | Full WQT records (owner/admin only with authentication)  |
| 🔑 **User Authentication**        | Laravel Sanctum personal access tokens                   |
| 👤 **User Profile Management**    | Update profile fields, change password                   |
| 📊 **Admin Dashboard**            | CRUD management for products, services, pricing plans    |
| 🔄 **Mock/API Data Switching**    | Dual deployment modes with automatic fallback            |
| 📱 **Fully Responsive**           | Mobile, tablet, and desktop optimized                    |
| 🎯 **Compact WQT Display**        | Modern table layout with side-by-side test sections      |
| ⚡ **Preview Mock Data**          | View full certificate details without authentication     |

---

## 📖 What is This?

**GMF Training Center** is a welder qualification certificate verification platform that allows:

1. **Public Users**: Search and preview welder certificates by certificate number or welder ID
2. **Authenticated Users**: View full certificate details including WQT (Welder Qualification Test) records
3. **Admins**: Manage all certificates and user access
4. **Staff**: Dashboard access for managing training materials and certification data

The platform integrates with **Laravel 12 backend** for real certificate data storage and authentication, with **mock data fallback** for demo/development modes.

---

## 🏗️ Architecture

This project consists of **two independent repositories**:

| Repository    | Purpose               | Tech Stack                    |
| ------------- | --------------------- | ----------------------------- |
| `gmf-web`     | React + Vite frontend | React 19, Vite 8, Tailwind v4 |
| `gmf-backend` | Laravel REST API      | Laravel 12, PHP 8.2+, MySQL   |

### Deployment Modes

| Mode               | Env Var                 | Data Source              | Requires Backend? |
| ------------------ | ----------------------- | ------------------------ | ----------------- |
| **A — Mock/Demo**  | `VITE_DATA_SOURCE=mock` | Local JS mock data       | No                |
| **B — Production** | `VITE_DATA_SOURCE=api`  | Laravel REST API + MySQL | Yes               |

### Mock Data Fallback

All pages use **mock data as fallback** when:

- API requests fail (network error)
- Backend is unavailable
- User is not authenticated (for public features)

Pages remain fully accessible during development without authentication.

---

## 🔐 Authentication & Authorization

Current implementation:

- ✅ **User Registration** — `POST /api/register`
- ✅ **User Login** — `POST /api/login`
- ✅ **Get Current User** — `GET /api/user` (protected)
- ✅ **Logout** — `POST /api/logout` (protected)
- ✅ **Update Profile** — `PUT /api/user/profile` (protected)
- ✅ **Change Password** — `PUT /api/user/password` (protected)
- ✅ **Certificate Verification** — Public preview + authenticated details view
- ✅ **Role-Based Access** — Owner/Admin authorization on sensitive data

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/register`      | Register new user | No            |
| POST   | `/api/login`         | Login user        | No            |
| GET    | `/api/user`          | Get current user  | Yes           |
| POST   | `/api/logout`        | Logout user       | Yes           |
| PUT    | `/api/user/profile`  | Update profile    | Yes           |
| PUT    | `/api/user/password` | Change password   | Yes           |

### Certificate Management

| Method | Endpoint                                                 | Description                            | Auth Required |
| ------ | -------------------------------------------------------- | -------------------------------------- | ------------- |
| GET    | `/api/certificates/preview/{certificateNo}`              | Public certificate preview             | No            |
| GET    | `/api/certificates/search?welder_identification_no={id}` | Search by welder ID                    | No            |
| GET    | `/api/certificates/{certificateNo}/detail`               | Full certificate details (owner/admin) | Yes           |
| GET    | `/api/certificates/{certificateNo}/pdf`                  | Download certificate PDF               | Yes           |
| GET    | `/api/user/certificates`                                 | List user's certificates               | Yes           |
| POST   | `/api/admin/certificates/{id}/link-user`                 | Link certificate to user (admin)       | Yes           |

### Dashboard CRUD

| Method | Endpoint             | Description         | Auth Required |
| ------ | -------------------- | ------------------- | ------------- |
| GET    | `/api/products`      | List products       | Yes           |
| POST   | `/api/products`      | Create product      | Yes           |
| PUT    | `/api/products/{id}` | Update product      | Yes           |
| DELETE | `/api/products/{id}` | Delete product      | Yes           |
| GET    | `/api/services`      | List services       | Yes           |
| POST   | `/api/services`      | Create service      | Yes           |
| PUT    | `/api/services/{id}` | Update service      | Yes           |
| DELETE | `/api/services/{id}` | Delete service      | Yes           |
| GET    | `/api/pricing`       | List pricing plans  | Yes           |
| POST   | `/api/pricing`       | Create pricing plan | Yes           |
| PUT    | `/api/pricing/{id}`  | Update pricing plan | Yes           |
| DELETE | `/api/pricing/{id}`  | Delete pricing plan | Yes           |

### Health & Status

| Method | Endpoint      | Description  | Auth Required |
| ------ | ------------- | ------------ | ------------- |
| GET    | `/api/health` | Health check | No            |

---

## ⚡ Quick Start

### Frontend Only (Mock Mode)

```bash
# Install dependencies
npm install

# Start dev server (uses mock data)
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

### Full Stack (API Mode)

**Prerequisites:**

- PHP 8.2+, Composer, MySQL
- Laravel backend repository: `gmf-backend`

**Backend Setup:**

```bash
# Navigate to backend directory
cd gmf-backend

# Install dependencies
composer install

# Setup environment
cp .env.example .env
php artisan key:generate

# Configure database in .env
# DB_DATABASE=gmf
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Run migrations
php artisan migrate

# Seed sample data (optional)
php artisan db:seed

# Start Laravel server
php artisan serve
# Runs on http://localhost:8000
```

**Frontend Setup:**

```bash
# Navigate to frontend directory
cd gmf-web

# Install dependencies
npm install

# Create .env file
echo "VITE_DATA_SOURCE=api" > .env
echo "VITE_API_URL=/api" >> .env
echo "VITE_API_TIMEOUT=2000" >> .env

# Start Vite dev server
npm run dev
# Runs on http://localhost:5173
# Proxies /api requests to backend automatically
```

---

## 🌍 Environment Variables

### Frontend (.env)

```env
# Data source mode
VITE_DATA_SOURCE=mock          # Use mock data (no backend required)
VITE_DATA_SOURCE=api           # Use Laravel API

# API configuration (only needed in API mode)
VITE_API_URL=/api              # Local dev (proxied to localhost:8000)
VITE_API_URL=https://api.example.com/api  # Production backend
VITE_API_TIMEOUT=2000          # Request timeout in milliseconds
```

**Note:** Vite dev server automatically proxies `/api` requests to `http://localhost:8000` for local development.

---

## 📁 Project Structure

```
src/
  components/     — reusable UI components
    ui/           — generic UI (Button, Card, Badge, Input)
    navigation/   — Navbar, Sidebar, Tabs, Breadcrumb
    feedback/     — Modal, Toast, Loading, EmptyState
  pages/          — complete pages
    landing/      — landing page
    auth/         — login, register, forgot password
    dashboard/    — dashboard pages
    certificate/  — certificate verification page
    error/        — 404, unauthorized pages
  layouts/        — reusable page layouts
  services/       — API integration layer
    api/          — auth.js, products.js, services.js, pricing.js, certificates.js, config.js
    data.js       — data source abstraction with mock fallback
  context/        — React context (AuthContext for auth state)
  hooks/          — custom React hooks
  lib/            — utilities and helper functions
  data/           — static/mock data (exampleData.js)
```

---

## 🛠 Tech Stack

### Frontend

| Layer      | Technology          |
| ---------- | ------------------- |
| Framework  | React 19            |
| Build Tool | Vite 8              |
| Styling    | Tailwind CSS v4     |
| Routing    | react-router-dom v7 |
| Icons      | Lucide React        |
| Theme      | next-themes         |
| State      | React Context API   |

### Backend

| Layer          | Technology           |
| -------------- | -------------------- |
| Framework      | Laravel 12           |
| Language       | PHP 8.2+             |
| Database       | MySQL                |
| Authentication | Laravel Sanctum ^4.3 |
| API            | RESTful JSON API     |

---

## 🚀 Deployment

### Vercel (Mock Mode Demo)

Deploy frontend-only to Vercel without backend:

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy
```

**Environment Setup on Vercel:**

- Leave `VITE_DATA_SOURCE` unset (defaults to mock)
- No API configuration needed
- Dashboard automatically uses mock data

Perfect for demos and portfolio showcases.

### Production (API Mode)

For full-stack deployment with Laravel backend:

1. **Deploy Backend**: Follow deployment guide in `gmf-backend` repository
2. **Configure Frontend Environment**:
   ```env
   VITE_DATA_SOURCE=api
   VITE_API_URL=https://api.yourdomain.com/api
   VITE_API_TIMEOUT=5000
   ```
3. **Configure CORS**: Set `FRONTEND_URL` in backend `.env` to match frontend domain
4. **Deploy Frontend**: Build and deploy to hosting provider

See `PROJECT_PLAN.md` → "Deployment" section for detailed instructions.

---

## 📖 Usage Examples

### Search for Certificate

1. Navigate to `/certificate`
2. Enter certificate number (e.g., `GMF/WQT/AWS/0612`) or welder ID (e.g., `GMF-533`)
3. View preview information (public, no auth required)
4. Click "Preview Mock Data" or "Log In" to see full details

### Full Certificate Details (Authenticated)

1. Log in with credentials
2. Search for certificate
3. Click "View Full Details"
4. See complete WQT record including:
   - Certificate Information
   - Qualification parameters
   - Visual Examination results
   - Guide Bend Test results
   - Mechanical Test data
   - Ultrasonic Test results
   - Welding Supervision info
   - Organization signatures

### Admin Dashboard

1. Log in as admin
2. Navigate to `/dashboard`
3. Access CRUD sections:
   - Products
   - Services
   - Pricing Plans
4. Create, read, update, delete items
5. Changes sync to database via API

---

## 📊 Development Status

### Completed Phases (0-19)

- ✅ Phase 0-7: Project setup, Laravel API, React integration, CRUD operations
- ✅ Phase 8-17: Full authentication system, protected routes, token management
- ✅ Phase 18: Certificate Management System with WQT records
- ✅ Phase 19: Certificate UI enhancements with compact display

See `PROJECT_PLAN.md` for detailed phase-by-phase progress.

---

## 🔗 Related Documentation

- **PROJECT_PLAN.md** — Detailed project roadmap, phase implementation notes, architectural decisions
- **gmf-backend** — Separate repository for Laravel REST API

---

## 🧪 Testing

### Verify Current State

```bash
# Frontend
cd gmf-web
npm run dev
# Visit http://localhost:5173
# Check: Landing page loads, certificate search works
# Check: Dashboard accessible (authenticated)
# Check: Dark mode toggle works

# Backend
cd gmf-backend
php artisan test
curl http://localhost:8000/api/health
curl http://localhost:8000/api/certificates/search?welder_identification_no=GMF-533
```

### Test Certificate Search

**Mock Mode:**

- Certificate No: `GMF/WQT/AWS/0612`
- Welder ID: `GMF-533`

**Database:**

- Requires backend running with `php artisan migrate` and `php artisan db:seed`

---

## 📄 License

Private project — built for welder certification and training management.

---

**Built with ❤️ using React 19, Vite 8, Tailwind CSS v4, Laravel 12, and Sanctum**
