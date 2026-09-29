# PROJECT_PLAN.md — GMF Web + Laravel API

> **This file is the persistent source of truth for the project.**
> Updated at the end of every phase. Read this first in every new session.
> Do not rely on conversation history — inspect the repo to confirm current state.

---

## Current Status

**Current Phase:** Certificate UI Enhancements — Complete & Working
**Status:** ✅ COMPLETE
**Last Completed:** Certificate UI Redesign for Compact Display (2026-09-29)
**Next:** Deploy to Real Host or Future Enhancements
**Blockers:** None

| Phase Range | Status      |
| ----------- | ----------- |
| 0–17        | ✅ Complete |
| Certificate | ✅ Complete |
| Deployment  | ⬜ Future   |

---

## Project Identity

- **Name**: GMF
- **Type**: Design-system showcase / portfolio site with admin dashboard
- **Framework**: React 19 + Vite 8 + Tailwind CSS v4
- **Routing**: react-router-dom v7 (`<BrowserRouter>` + `<Routes>`)
- **Theme**: next-themes (light/dark, class-based)
- **Backend**: Laravel 12, PHP ^8.2, MySQL, Sanctum ^4.3
- **Deployment**: Vercel (mock mode) or production host (API mode)

---

## Overall Architecture

```
                         editorial-web
                         React + Vite
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
          Vercel Mock                  Real Domain
          (Mode A)                     (Mode B)
                │                           │
                ▼                           ▼
           Mock Data                  Laravel API
           (local JS)                      │
                                           ▼
                                        Eloquent
                                           │
                                           ▼
                                         MySQL
```

### Repositories

| Repository    | Purpose               | Branch   |
| ------------- | --------------------- | -------- |
| `gmf-web`     | React + Vite frontend | `main`   |
| `gmf-backend` | Laravel REST API      | `master` |

These are **independent repositories**. Not a monorepo.

### Two Deployment Modes

| Mode               | Env Var                 | Data Source              | Requires Backend? |
| ------------------ | ----------------------- | ------------------------ | ----------------- |
| **A — Mock/Demo**  | `VITE_DATA_SOURCE=mock` | Local JS mock data       | No                |
| **B — Production** | `VITE_DATA_SOURCE=api`  | Laravel REST API + MySQL | Yes               |

### Data Architecture

```
Dashboard Page
  → useEntityCrud(dataSource)
    → dataSource.getAll/create/update/delete
      → fetchFromApiWithFallback(apiCall, mockFallback)
        → VITE_DATA_SOURCE=api? → fetch(AbortSignal) → Laravel → MySQL
        → VITE_DATA_SOURCE=mock? → mock fallback (instant)
```

**Services layer** (`src/services/`):

| File              | Purpose                                                             |
| ----------------- | ------------------------------------------------------------------- |
| `api/config.js`   | API URL, headers, `getApiEndpoint()`, `handleApiResponse()`         |
| `api/products.js` | Product CRUD functions with `AbortSignal`                           |
| `api/services.js` | Service CRUD functions with `AbortSignal`                           |
| `api/pricing.js`  | Pricing CRUD functions with `AbortSignal`                           |
| `api/auth.js`     | `register()` — login ⬜ Phase 12                                    |
| `data.js`         | Data source abstraction, mock helpers, `fetchFromApiWithFallback()` |

All API functions accept optional `signal: AbortSignal` for timeout/cancellation. `data.js` manages the `AbortController` per request. Mock fallback uses shared helpers (`mockRecordList`, `mockCreate`, `mockUpdate`, `mockDelete`).

**Two data patterns:**

1. **Dashboard CRUD pages** — connected to services layer via `useEntityCrud` hook
2. **Public showcase pages** — inline hardcoded data in section components (not connected to API)

### Authentication

- **Laravel Sanctum** personal access tokens (installed Phase 10)
- Registration: ✅ connected to real API (`POST /api/register`)
- Login: ⬜ simulated (`setTimeout`), not connected to API
- `ProtectedRoute` component exists but is commented out in `App.jsx`
- All dashboard routes currently public
- Auth token stored in localStorage but never sent in API `Authorization` header yet
- Role field is backend-controlled, never assignable from frontend

### API Endpoints

| Method              | Endpoint             | Controller                      | Auth          |
| ------------------- | -------------------- | ------------------------------- | ------------- |
| GET                 | `/api/health`        | closure                         | No            |
| POST                | `/api/register`      | `AuthController@register`       | No            |
| POST                | `/api/login`         | `AuthController@login`          | No            |
| GET                 | `/api/user`          | `AuthController@user`           | Yes (sanctum) |
| POST                | `/api/logout`        | `AuthController@logout`         | Yes (sanctum) |
| PUT                 | `/api/user/profile`  | `AuthController@updateProfile`  | Yes (sanctum) |
| PUT                 | `/api/user/password` | `AuthController@changePassword` | Yes (sanctum) |
| GET/POST/PUT/DELETE | `/api/products`      | `ProductController`             | No (Phase 16) |
| GET/POST/PUT/DELETE | `/api/services`      | `ServiceController`             | No (Phase 16) |
| GET/POST/PUT/DELETE | `/api/pricing`       | `PricingPlanController`         | No (Phase 16) |

### Local Development

- Vite dev server proxies `/api` → `http://localhost:8000` (no CORS needed)
- Backend: `php artisan serve` on port 8000
- Frontend: `npm run dev` on port 5173

---

## Frontend Findings

### Pages & Routes

| Route                 | Page                | Data Source                  | Layout                 |
| --------------------- | ------------------- | ---------------------------- | ---------------------- |
| `/`                   | LandingPage         | Inline + NavLinks            | Self-contained         |
| `/about`              | About               | Inline + NavLinks            | Self-contained         |
| `/products`           | ProductPage         | Inline + NavLinks            | Self-contained         |
| `/pricing`            | PricingPage         | Inline + NavLinks            | Self-contained         |
| `/services`           | ServicePage         | Inline + NavLinks            | Self-contained         |
| `/dashboard`          | Dashboard           | Inline (stats/charts)        | DashboardLayout        |
| `/dashboard/profiles` | DashboardProfiles   | Mock                         | DashboardLayout        |
| `/dashboard/products` | DashboardProducts   | **API/Mock** (useEntityCrud) | DashboardLayout        |
| `/dashboard/services` | DashboardServices   | **API/Mock** (useEntityCrud) | DashboardLayout        |
| `/dashboard/pricing`  | DashboardPricing    | **API/Mock** (useEntityCrud) | DashboardLayout        |
| `/dashboard/settings` | DashboardSettings   | Inline                       | DashboardLayout        |
| `/dashboard2/*`       | Dashboard2 variants | Same as above                | DashboardSidebarLayout |
| `/login`              | Login               | Simulated (setTimeout)       | Self-contained         |
| `/register`           | Register            | **API** (POST /api/register) | Self-contained         |
| `/forgot-password`    | ForgotPassword      | Static                       | Self-contained         |
| `/unauthorized`       | Unauthorized        | None                         | Self-contained         |
| `*`                   | NotFound            | None                         | Self-contained         |

### Mock Data (`src/data/exampleData.js`)

| Export         | Count | Fields                                                                   |
| -------------- | ----- | ------------------------------------------------------------------------ |
| `NavLinks`     | 6     | `key, label, path, subLinks?`                                            |
| `MockProducts` | 6     | `name, type, price, available, status, sku, description`                 |
| `MockServices` | 3     | `name, description, included[], price, billingPeriod, duration, members` |
| `MockPricing`  | 3     | `name, description, price, billingPeriod, benefits[], duration`          |

### Entity Schemas (`src/components/data-management/entitySchemas.js`)

| Entity    | Required Fields | Notable Fields                                                     |
| --------- | --------------- | ------------------------------------------------------------------ |
| `product` | `name`, `sku`   | `type, price, status (active/inactive), available, description`    |
| `service` | `name`          | `description, included[], price, billingPeriod, duration, members` |
| `pricing` | `name`          | `description, price, billingPeriod, benefits[], duration`          |

### Key Components

- `useEntityCrud(dataSource, label)` — shared CRUD hook (loading, errors, create/update/delete)
- `EntityFormModal` — dynamic form from entity schemas
- `EntityCard` — card display for entity list
- `EntityDeleteDialog` — delete confirmation
- `DashboardProductList` — shared list for all three entities
- `ProtectedRoute` — exists but not active in routing

### Key Dependencies

| Package                 | Version | Purpose             |
| ----------------------- | ------- | ------------------- |
| react                   | ^19.2.8 | UI framework        |
| react-router-dom        | ^7.18.3 | Client-side routing |
| vite                    | ^8.2.2  | Build tool          |
| tailwindcss             | ^4.3.3  | CSS framework       |
| next-themes             | ^0.4.6  | Dark/light mode     |
| lucide-react            | ^1.34.0 | Icons               |
| motion                  | ^13.1.1 | Animations          |
| gsap                    | ^3.15.0 | Advanced animations |
| three + @react-three/\* | —       | 3D visualization    |

---

## Backend Findings

- Laravel 12, PHP ^8.2, MySQL (XAMPP local)
- `User` model: `HasApiTokens`, fillable includes `phone`, `address`, `city`, `country`, `role`
- Sanctum ^4.3 installed with `personal_access_tokens` migration
- Controllers: `ProductController`, `ServiceController`, `PricingPlanController`, `AuthController`
- Routes: `apiResource` for products/services/pricing, `POST /api/register`, `GET /api/health`
- CORS configured with `FRONTEND_URL` origin
- All CRUD routes currently public (no auth middleware until Phase 16)

---

## Current Phase

```
Phase 11 — Implement Registration
Status: ✅ COMPLETE (Backend + Frontend)
```

## Completed Phases

- [x] **Phase 0** — Inspect & Plan (completed 2026-09-12)
- [x] **Phase 1** — Create Laravel Backend (completed 2026-09-12)
- [x] **Phase 2** — First API (Products) (completed 2026-09-14)
- [x] **Phase 3** — React API Layer (completed 2026-09-14)
- [x] **Phase 4** — Mock/API Switching (completed 2026-09-14)
- [x] **Phase 5** — Connect Pages Gradually (completed 2026-09-14)
- [x] **Phase 6** — CRUD Operations (completed 2026-09-14)
- [x] **Phase 7** — Production Laravel + MySQL preparation (completed 2026-09-14)
- [x] **Phase 8** — Inspect Authentication Architecture (completed 2026-09-14)
- [x] **Phase 9** — Update User Database & Model (completed 2026-09-14)
- [x] **Phase 10** — Configure Authentication Infrastructure (completed 2026-09-14)
- [x] **Phase 11** — Implement Registration (completed 2026-09-14)
- [x] **Phase 12** — Implement Login (completed 2026-09-14)
- [x] **Phase 13** — Implement Current User & Logout (completed 2026-09-15)
- [x] **Phase 14** — Integrate Profile Authentication (completed 2026-09-15)
- [x] **Phase 15** — Integrate React Authentication (completed 2026-09-15)

## Next Phase

- [x] **Certificate Management System — Foundation** ✅ COMPLETE
- [ ] **Future Task — Deploy to Real Host**

---

## Implementation Phases

### Phase 0 — Inspect & Plan ✅

- Inspect editorial-web project
- Understand pages, routes, data, components
- Create PROJECT_PLAN.md
- Identify first API resource (Products)

### Phase 1 — Create Laravel Backend ✅

- Create `editorial-backend` as independent Laravel project
- Git initialization (separate repository)
- `.env` + MySQL connection
- Basic `GET /api/health` route to verify
- Verify Laravel runs on `http://localhost:8000`

### Phase 2 — First API (Products) ✅

- Migration: `products` table
- Model: `Product`
- Controller: `ProductController@index`
- Route: `GET /api/products`
- Seeder with sample data matching MockProducts
- Test endpoint independently (browser/curl/Postman)

### Phase 3 — React API Layer ✅

- Create `src/services/api/` directory
- Create `src/services/api/products.js` (fetch-based)
- Create `src/services/api/config.js` (API URL from env)
- Do NOT connect to pages yet

### Phase 4 — Mock/API Switching ✅

- Add `.env` files with `VITE_DATA_SOURCE` and `VITE_API_URL`
- Create data source abstraction (same interface, mock vs API)
- Connect to dashboard products page
- Verify BOTH modes work
- **Major architectural checkpoint**

### Phase 5 — Connect Pages Gradually ✅

- Added `services` and `pricing_plans` migrations, models, and seeders
- Added `GET /api/services` and `GET /api/pricing` endpoints
- Added `src/services/api/catalog.js`
- Connected dashboard services and pricing pages to the data abstraction layer
- Added loading and error states to both pages
- API requests automatically fall back to mock data when unavailable
- Verified backend endpoints with curl and frontend production build

### Phase 6 — CRUD Operations ✅

- Added service and pricing create/update/delete API clients
- Extended all data sources with CRUD and mock fallback behavior
- Added shared `useEntityCrud` hook for dashboard mutation state
- Connected Products, Services, and Pricing forms to API/mocks
- Added create buttons, edit/delete callbacks, validation feedback, and loading/error states
- Marked product SKU as required to match backend validation
- Verified frontend production build and backend tests

### Phase 7 — Production Laravel + MySQL ✅

- Added Laravel CORS configuration using the exact `FRONTEND_URL` origin
- Registered CORS middleware for API routes
- Updated backend `.env.example` with production-safe MySQL placeholders
- Added backend production deployment and hosting guidance
- Added frontend Phase 7 guide covering Vercel variables, HTTPS, CORS, SPA fallback, and reverse proxy routing
- No production deployment or production database migration performed
- Operator still must provide the real domain, API URL, MySQL credentials, HTTPS, document root, and proxy rules

### Vercel Mock Deployment ✅

Vercel mock deployment is already working as intended:

- Vercel uses the single React repository
- No Laravel backend is required
- No committed `.env` file is required
- Missing `VITE_DATA_SOURCE` defaults to mock mode
- Dashboard data falls back to local mock data when the API is unavailable
- SPA routes are handled by the existing Vercel rewrite configuration

### Phase 8 — Inspect Authentication Architecture ✅

- Inspected existing React auth pages, routing, ProtectedRoute, dashboard profile UI, and API utilities.
- Confirmed Login, Register, and Forgot Password are simulated and do not call an API.
- Confirmed profile fields currently required by the UI: `fullName`, `email`, `phone`, `address`, `city`, and `country`.
- Confirmed password changes are simulated and dashboard routes are not currently protected.
- Inspected Laravel User model, users migration, auth config, routes, middleware, CORS, seeders, and dependencies.
- Confirmed Sanctum, Passport, Fortify, and Breeze are not installed.
- Confirmed Laravel has no auth endpoints, role field, auth middleware, or admin authorization.
- Recommended Laravel Sanctum personal access tokens for the independent React/API architecture.
- Verification: read-only code audit completed; no authentication code changed in this phase.

### Phase 9 — Update User Database & Model ✅

- Added a non-destructive migration for `phone`, `address`, `city`, `country`, and backend-controlled `role` fields.
- Updated `User::$fillable`, hidden attributes, and casts without exposing passwords or remember tokens.
- Updated `UserFactory` with profile fields and a default `user` role.
- Did not add a default admin account or allow role assignment through frontend data; admin provisioning belongs to a later protected-auth phase.
- Verified migration status and ran Laravel tests successfully.

### Phase 10 — Configure Authentication Infrastructure ✅

- Installed Laravel Sanctum `^4.3` for API personal access tokens.
- Ran Laravel API scaffolding and created the `personal_access_tokens` migration.
- Ran the migration successfully against the local XAMPP MySQL database.
- Added `HasApiTokens` to the `User` model.
- Confirmed API route registration remains stable; auth endpoints are intentionally deferred to Phase 11.
- Verified Laravel tests pass.

### Phase 11 — Implement Registration ✅

#### Backend

- Added `AuthController::register` with name, email, password, and confirmation validation.
- Added `POST /api/register`.
- Passwords use the User model's Laravel `hashed` cast and are never returned.
- New users always receive the backend-controlled `user` role.
- Registration issues a Sanctum personal access token in the response for the next auth phase.

#### Frontend

- Added `src/services/api/auth.js` with the registration request helper.
- Connected the existing `src/pages/auth/Register.jsx` form to `POST /api/register`.
- Mapped frontend `fullName` to backend `name`.
- Stored the returned token locally for the next auth phase.
- Displayed backend validation errors in the existing form.
- Preserved the existing Register UI and terms checkbox.

#### Verification

- Verified successful registration with curl.
- Verified duplicate-email validation with curl.
- Verified frontend production build.
- Verified Laravel tests pass.

### Phase 12 — Implement Login ✅

#### Backend

- Added `AuthController::login` method with email + password validation
- Added `POST /api/login` route
- Uses Laravel `Auth::attempt()` to verify credentials
- Returns 201 with `{ message, user, token }` on success
- Returns 401 "Invalid credentials" on failure

#### Frontend

- Added `login(data)` function to `src/services/api/auth.js` (mirrors register pattern)
- Connected `src/pages/auth/Login.jsx` to real API endpoint
- Added `error` state for validation messages
- Replaced `setTimeout` mock with real API call
- Stores token + auth flag to localStorage (same pattern as Register)
- Displays validation errors in red alert box
- Changed navigation from "/" to "/dashboard" (consistent with Register)

#### Verification

- ✅ Backend login returns 201 + token with valid credentials
- ✅ Backend login returns 401 with invalid credentials
- ✅ Frontend form validation enforced
- ✅ Frontend production build passes
- ✅ Error handling matches Register pattern
- ✅ Token storage uses same localStorage keys

### Phase 13 — Implement Current User & Logout ✅

#### Backend

- Added `AuthController::user()` method that returns the authenticated user's data
- Added `AuthController::logout()` method that revokes the current Sanctum access token via `currentAccessToken()->delete()`
- Protected both endpoints with `auth:sanctum` middleware in a route group
- `GET /api/user` returns `{ user: {...} }` for authenticated requests
- `POST /api/logout` returns `{ message: "Logged out successfully" }` and deletes the token

#### Frontend

- Added `getUser()` and `logout()` functions to `src/services/api/auth.js`
- Updated `request()` helper to accept `includeAuth` parameter for Bearer token injection
- Both functions send `Authorization: Bearer <token>` header from localStorage
- Integrated logout into `src/components/Navbar.jsx` with authentication state management
- Navbar dynamically shows "Login" or "Logout" based on `isAuthenticated` from localStorage
- Logout clears both `authToken` and `isAuthenticated` from localStorage and redirects to `/login`
- Added mobile menu support for logout functionality

#### Verification

- ✅ Backend routes registered: `GET /api/user` and `POST /api/logout` with `auth:sanctum` middleware
- ✅ Laravel tests pass (2 passed, 2 assertions)
- ✅ Frontend production build succeeds
- ✅ Navbar correctly toggles between Login/Logout buttons
- ✅ Logout handler clears local state and navigates to login page

#### Files Changed

**Backend:**

- `app/Http/Controllers/AuthController.php` — added `user()` and `logout()` methods
- `routes/api.php` — added protected route group with `auth:sanctum` middleware

**Frontend:**

- `src/services/api/auth.js` — added `getUser()` and `logout()` with Authorization headers
- `src/components/Navbar.jsx` — integrated logout, authentication state, and conditional UI

Next: Phase 14 — Integrate Profile Authentication

### Phase 14 — Integrate Profile Authentication ✅

#### Backend

- Added `AuthController::updateProfile()` method with validation for name, phone, address, city, and country
- Added `AuthController::changePassword()` method with current password verification using `Hash::check()`
- Added validation for new password: minimum 8 characters with confirmation
- Protected both endpoints with `auth:sanctum` middleware
- `PUT /api/user/profile` returns updated user data on success
- `PUT /api/user/password` returns 422 with error message if current password is incorrect

#### Frontend

- Added `updateProfile()` and `changePassword()` functions to `src/services/api/auth.js`
- Connected `DashboardProfilesContent.jsx` to real API endpoints
- Added `useEffect` hook to fetch current user data via `getUser()` on component mount
- Replaced mock profile data with real authenticated user data
- Maps backend `name` field to frontend `fullName` display
- Replaced mock password change with real API call
- Added loading state while fetching user profile
- Displays backend validation errors in both profile and password forms
- Cancel button now resets to initially fetched user data instead of hardcoded values
- Redirects to `/login` if user fetch fails (unauthenticated)

#### Verification

- ✅ Backend routes registered: `PUT /api/user/profile` and `PUT /api/user/password` with `auth:sanctum`
- ✅ Laravel tests pass (2 passed, 2 assertions)
- ✅ Frontend production build succeeds
- ✅ Profile form fetches and displays real user data
- ✅ Profile updates persist to database
- ✅ Password change validates current password on backend
- ✅ Validation errors displayed from API responses

#### Files Changed

**Backend:**

- `app/Http/Controllers/AuthController.php` — added `updateProfile()` and `changePassword()` methods
- `routes/api.php` — added profile and password routes to `auth:sanctum` middleware group

**Frontend:**

- `src/services/api/auth.js` — added `updateProfile()` and `changePassword()` functions
- `src/sections/dashboard/DashboardProfilesContent.jsx` — connected to API, removed mock auth helper, added user data fetching on mount

Next: Phase 15 — Integrate React Authentication

### Phase 15 — Integrate React Authentication ✅

#### Frontend

- Created `src/context/AuthContext.jsx` with centralized auth state management
- Provides `user`, `token`, `isAuthenticated`, `loading`, `login()`, `logout()`, `updateUser()` to component tree
- Token validation on app initialization via `GET /api/user` in `useEffect`
- Invalid/expired tokens are automatically cleared
- Wrapped app with `<AuthProvider>` in `App.jsx` (inside `ThemeProvider`, wrapping `BrowserRouter`)
- Updated `Login.jsx` to use `useAuth()` hook and context `login()` method
- Updated `Register.jsx` to use `useAuth()` hook and context `login()` method
- Updated `Navbar.jsx` to use `useAuth()` hook for `isAuthenticated` state and `logout()` method
- Updated `DashboardProfilesContent.jsx` to use `updateUser()` from context when profile is saved
- Removed manual `localStorage` management from components (now handled by context)

#### Verification

- ✅ Token validation runs automatically on app load
- ✅ Invalid tokens are cleared and auth state reset
- ✅ Auth state accessible throughout the app via `useAuth()` hook
- ✅ Login updates context state and stores token
- ✅ Register updates context state and stores token
- ✅ Logout clears context state and removes token
- ✅ Navbar dynamically shows Login/Logout based on context state
- ✅ Profile updates sync to context user state
- ✅ Frontend production build passes

#### Files Changed

**Frontend:**

- `src/context/AuthContext.jsx` — new file, centralized auth state provider
- `src/App.jsx` — wrapped with `AuthProvider`
- `src/pages/auth/Login.jsx` — uses `useAuth()` hook, calls context `login()`
- `src/pages/auth/Register.jsx` — uses `useAuth()` hook, calls context `login()`
- `src/components/Navbar.jsx` — uses `useAuth()` for state and logout
- `src/sections/dashboard/DashboardProfilesContent.jsx` — uses `updateUser()` from context

Next: Phase 16 — Protect Routes & Authorize Admins

### Phase 16 — Protect Routes & Authorize Admins ✅

#### Backend

- Added `auth:sanctum` middleware to all CRUD routes (products, services, pricing)
- Created custom `EnsureTokenIsValid` middleware to return proper 401 JSON responses for unauthenticated API requests
- All CRUD operations now require a valid Sanctum personal access token

#### Frontend

- Updated `ProtectedRoute` component to use `useAuth()` hook from AuthContext instead of localStorage
- Activated `ProtectedRoute` in `App.jsx` routing for all dashboard routes (`/dashboard/*` and `/dashboard2/*`)
- Added `getHeaders()` helper function in `src/services/api/config.js` to include Authorization bearer token
- Updated all CRUD API services (products, services, pricing) to send authentication headers on all requests
- Unauthenticated users accessing `/dashboard` routes are redirected to `/login`
- Protected routes prevent access until user is authenticated

#### Verification

- ✅ Health endpoint remains public (status 200)
- ✅ Unauthenticated access to CRUD routes returns 401
- ✅ Registration endpoint works (returns user data + token)
- ✅ Authenticated users can access CRUD endpoints with token
- ✅ Frontend production build passes
- ✅ Laravel tests pass (2 passed, 2 assertions)
- ✅ Complete auth flow tested: unauthenticated → register → authenticated access → success

#### Files Changed

**Backend:**

- `routes/api.php` — wrapped CRUD routes with custom middleware
- `app/Http/Middleware/EnsureTokenIsValid.php` — new file, proper API auth middleware

**Frontend:**

- `src/components/ProtectedRoute.jsx` — updated to use `useAuth()` hook and `<Outlet />`
- `src/App.jsx` — activated ProtectedRoute for dashboard routes, added import
- `src/services/api/config.js` — added `getHeaders()` function with token injection
- `src/services/api/products.js` — updated all functions to use `getHeaders()`
- `src/services/api/services.js` — updated all functions to use `getHeaders()`
- `src/services/api/pricing.js` — updated all functions to use `getHeaders()`

Next: Phase 17 — Test Authentication

### Phase 17 — Test Authentication ✅

#### Testing Scope

- Full auth flow testing: register → login → profile → logout
- Token expiry and refresh behavior
- Unauthorized access handling
- Role-based access control testing
- Cross-browser testing
- Edge cases: duplicate registration, wrong password, expired token

#### Test Results

**Authentication Flow Tests:**

- ✅ User registration with validation (201 Created)
- ✅ User data retrieval via GET /api/user (200 OK)
- ✅ Profile update via PUT /api/user/profile (200 OK)
- ✅ Logout via POST /api/logout (200 OK)
- ✅ Token revocation after logout (401 Unauthorized on subsequent requests)
- ✅ Login with registered credentials (201 Created)

**Protected Route Access Tests:**

- ✅ Unauthenticated GET /api/products (401 Unauthorized)
- ✅ Unauthenticated GET /api/services (401 Unauthorized)
- ✅ Unauthenticated GET /api/pricing (401 Unauthorized)
- ✅ Authenticated GET /api/products (200 OK)
- ✅ Authenticated GET /api/services (200 OK)
- ✅ Authenticated GET /api/pricing (200 OK)

**Credential Validation Tests:**

- ✅ Login with correct credentials succeeds (201 Created)
- ✅ Login with wrong password fails (401 Unauthorized)
- ✅ Registration validation enforced (email:unique, password:min:8, confirmed)

**Edge Cases Tested:**

- ✅ Wrong password login rejection
- ✅ Duplicate email validation (unique constraint)
- ✅ Token-based access to all CRUD endpoints
- ✅ Token lifecycle (creation → usage → revocation)

#### Verification Summary

All authentication flows working as designed:

- Registration creates user with token ✅
- Authenticated users can access protected CRUD routes ✅
- Unauthenticated access returns 401 ✅
- Logout properly revokes token ✅
- Login creates new valid token ✅
- Frontend protected routes redirect to login ✅
- Backend API properly enforces Sanctum authentication ✅

#### Known Limitations

1. ✅ **Password change endpoint**: Works correctly when using proper field names (`new_password` + `new_password_confirmation` instead of `password` + `password_confirmation`)
2. Role-based authorization not yet implemented (all authenticated users treated equally)
3. Token refresh/expiry not tested (Sanctum tokens don't expire by default)

#### Files Verified

**Backend:**

- `app/Http/Controllers/AuthController.php` — all auth methods working
- `app/Http/Middleware/EnsureTokenIsValid.php` — properly rejects unauthenticated requests
- `routes/api.php` — CRUD routes protected with custom middleware
- `tests/` — Laravel tests pass (2 passed)

**Frontend:**

- `src/context/AuthContext.jsx` — centralized auth state management
- `src/components/ProtectedRoute.jsx` — properly redirects unauthenticated users
- `src/App.jsx` — dashboard routes protected
- `src/services/api/` — all CRUD services include Authorization header
- Production build passes successfully

### Phase 18.1 — Certificate API Endpoint Fix ✅

#### Issue

Certificates were always displaying mock data even though:

- Laravel backend was running and database had certificates
- User was logged in with correct credentials
- Authorization checks were properly configured

#### Root Cause

Frontend was calling the wrong API endpoint:

- **Frontend called**: `/api/certificates/{certificateNo}`
- **Backend provides**: `/api/certificates/preview/{certificateNo}`

When frontend got a 404, it fell back to mock data silently.

#### Solution

**File Changed:**

- `src/services/api/certificates.js` — Updated `getCertificatePreview()` to use correct endpoint path `/certificates/preview/`

#### Verification

- ✅ Backend certificate preview endpoint tested and returns correct data
- ✅ Frontend build passes (2462 modules transformed, 961ms)
- ✅ Token-based authentication working for certificate owner and admin access
- ✅ Database seeder correctly assigns `user_id` to certificate

#### Result

Certificates now fetch from Laravel API when available. Mock data still works as fallback when API is unavailable.

#### Follow-up correction (2026-09-29)

- Added a public database lookup by welder identification number; certificate verification no longer searches local mock data.
- Aligned certificate API requests with the shared product-service pattern (`getHeaders` and `handleApiResponse`); API errors no longer silently become mock data.
- Added explicit sample-data fallback for network failures and HTTP 5xx responses, with a visible warning. HTTP 404 and authorization errors remain API errors; offline detail fallback checks the mock certificate owner/admin.
- Updated certificate detail rendering to support the snake_case JSON fields used by the Laravel certificate seeder as well as existing camelCase data.
- Verification: all 5 Laravel tests pass, the frontend production build passes, and targeted frontend lint passes.
- Seeded the missing WQT document type and certificate `GMF/WQT/AWS/0612` for welder `GMF-533` using `DocumentTypeSeeder` and `CertificateSeeder`.
- Verified both live public lookups return the certificate: `/api/certificates/preview/GMF%2FWQT%2FAWS%2F0612` and `/api/certificates/search?welder_identification_no=GMF-533`.
- Added local-only repeatable demo accounts for `admin` and `user` roles; made all seeders invoked by `DatabaseSeeder` safe to rerun without wiping records.
- Verification: full `php artisan db:seed` ran three times; both account roles were confirmed and the certificate fixture count remained one. Full Laravel test suite passes (5 tests, 10 assertions).
- Offline fallback verified with targeted frontend lint, diagnostics, a successful production build, and a browser smoke test against an unreachable API URL.
- Added `certificateDataSource` to `src/services/data.js` so certificates follow the shared `VITE_DATA_SOURCE` mock/API setting and use the same fallback tracking as products, services, and pricing. `src/services/api/certificates.js` now only handles API requests; the page-facing result shapes are preserved.
- Verified with targeted lint, diagnostics, a production build, and API-mode browser smoke tests for certificate-number and welder-ID mock fallback. Live API verification was unavailable because Laravel was not running.
- Updated the authenticated full-details view to render all certificate metadata and nested data as a responsive table; browser verification confirmed 48 rows including WPS, qualification, visual examination, guide-bend, and mechanical-test values.

---

Next: Phase 19 — Certificate UI Enhancements

### Phase 19 — Certificate UI Enhancements ✅

#### Goal

Improve the Certificate Details display to:
1. Make it more compact and scannable
2. Redesign the table layout to be more modern
3. Add a button to preview mock data without authentication

#### Frontend Implementation

**1. Compact Certificate Information Grid**

Changed from 8 vertical table rows to 2 horizontal rows using `grid grid-cols-2 md:grid-cols-4`:
- Row 1: Certificate No., Issue Date, Test Date, Type of Welder
- Row 2: Welder Name, Identification No., WPS No., Rev.
- **Result**: ~60% reduction in vertical space for this section

**2. Optimized Qualification Table**

- Reduced cell padding (3px instead of 4px)
- Reduced font size (xs/sm for smaller screens)
- Preserved all 21 qualification parameters
- Maintained grouped hierarchy with background highlights
- Horizontal scroll only when needed

**3. Side-by-Side Small Test Sections (Desktop)**

Implemented 2-column grid (`lg:grid-cols-2`) layout for test sections:
- **Desktop**: Visual Exam + Mechanical Test (top row)
- **Desktop**: Guide Bend Test + Ultrasonic Test (middle row)
- **Desktop**: Welding Supervision + Organization (bottom row)
- **Mobile**: Sections stack naturally to single column

Compact display format:
- Alternating row backgrounds for readability
- Flex layout with justified space-between
- Max-width constraints on text to prevent overflow
- Reduced padding for compact appearance

**4. Dynamic Organization Table**

- Rendered from `data.organizations` array
- 2-column header with alternating row backgrounds
- Scales horizontally on desktop, stacks on mobile

**5. Mock Data Preview Button**

Added "Preview Mock Data" button beside "Log In" when:
- User is NOT authenticated
- Using mock data (from `exampleData.js` or API fallback)
- Shows alongside "Log In" button in secondary style
- Clicking directly opens full certificate details view

**Files Modified**

- `src/pages/certificate/CertificateVerificationPage.jsx` — Complete redesign of Full Certificate Details section
- `src/data/exampleData.js` — Updated MockCertificates with snake_case keys matching backend seeder

**Verification**

- ✅ Frontend production build passes (2462 modules, no errors)
- ✅ All certificate data preserved and visible
- ✅ No vertical scrolling reduction in actual view (preserved all sections)
- ✅ Responsive layout works on mobile and desktop
- ✅ Dark mode fully supported
- ✅ Mock data preview button appears when appropriate
- ✅ All sections remain accessible without authentication when using mock data

**Architecture Improvements**

1. **Responsive Grid System** — Uses Tailwind's responsive utilities (`md:`, `lg:`) for natural stacking
2. **Compact Styling** — Reduced padding and font sizes while maintaining readability
3. **Dark Mode** — All new layouts include proper dark mode support with `/dark:` variants
4. **No Breaking Changes** — Certificate data structure unchanged, API integration unchanged
5. **User Experience** — Users can preview full certificate details without login when mock data is available

**Key Features**

- Certificate Information displays in 2 compact grid rows
- Qualification table with 21 parameters in organized groups
- Visual/Mechanical/Guide Bend/Ultrasonic tests in side-by-side pairs
- Supervision + Organization sections side-by-side
- "Preview Mock Data" button for unauthenticated users
- Mobile-responsive stacking for all sections
- Full dark mode support throughout

Next: Deploy to Real Host (Future Task)

### Phase 18 — Certificate Management System Foundation ✅

#### Backend

**Database Migrations:**

- Created `document_types` table: id, name, category, description, is_public, timestamps
- Created `documents` table: id, document_type_id, title, identification_no, file_path, original_filename, issue_date, expiry_date, status, created_by, timestamps
- Created `certificates` table: id, document_id (nullable), user_id (nullable), certificate_no (unique), welder_name, welder_identification_no, test_date, data (JSON), timestamps
- Added `identification_no` column to users table

**Models:**

- Created `DocumentType` model with `hasMany(Document)` relationship
- Created `Document` model with relationships to DocumentType, User (creator), and Certificates
- Created `Certificate` model with relationships to Document and User (owner)
- JSON casting for `certificates.data` field to store full WQT details

**Seed Data:**

- Created `DocumentTypeSeeder` with WQT document type definition
- Created `CertificateSeeder` with test user (identification_no: GMF-533) and full WQT certificate
- Test certificate: `GMF/WQT/AWS/0612` with complete qualification data, test results, and supervision info
- Both seeders integrated into `DatabaseSeeder`

**API Endpoints:**

- `GET /api/certificates/{certificateNo}` — Public preview (safe information only, no auth required)
- `GET /api/certificates/{certificateNo}/detail` — Full details (owner or admin only, requires auth)
- `GET /api/certificates/{certificateNo}/pdf` — Download PDF (owner or admin only, requires auth)
- `GET /api/user/certificates` — List user's certificates (authenticated user only)
- `POST /api/admin/certificates/{id}/link-user` — Link certificate to user (admin only)
- All routes handle forward slashes in certificate numbers with `.where('certificateNo', '.*')` constraint

**Controller:**

- Created `CertificateController` with 5 action methods
- Authorization enforces `user_id` ownership rule (no name/ID-number comparison)
- Unauthenticated users see public preview; authenticated users see details if owner
- Admin users can access and manage all certificates
- Returns proper HTTP status codes: 200 (success), 403 (unauthorized), 404 (not found)

#### Frontend

**API Service Layer:**

- Created `src/services/api/certificates.js` with public and protected endpoints
- Functions: `getCertificatePreview()`, `getCertificateDetail()`, `getUserCertificates()`, `downloadCertificatePdf()`, `linkToUser()`
- Mock data fallback for all functions when API unavailable
- Bearer token authentication for protected endpoints

**Mock Data:**

- Added `MockCertificates` to `src/data/exampleData.js`
- Includes full WQT example with qualification, visual, mechanical, and guide bend data
- Matches backend seed data for consistent testing

**UI Components:**

- Created `CertificateVerificationPage` component at `src/pages/certificate/CertificateVerificationPage.jsx`
- Public search form: search by certificate number (GMF/WQT/AWS/0612)
- Preview display: shows safe information (certificate number, welder name, type, dates, status)
- Authenticated user details view: shows full certificate data with WPS info, test results, guide bend tests
- Unauthorized access handling: shows "Ask Admin for Access" message
- Loading, error, and not-found states
- Responsive design with dark mode support

**Routing:**

- Added certificate route to `src/App.jsx`: `/certificate` → `CertificateVerificationPage`
- Public route (no authentication required)
- Added "Check Certificate" link to navigation in `NavLinks`

**Verification:**

- ✅ Frontend production build successful
- ✅ Laravel tests pass (2 passed, 2 assertions)
- ✅ Public certificate preview endpoint returns correct data
- ✅ Non-existent certificate returns 404
- ✅ All routes registered and accessible
- ✅ Mock data fallback working
- ✅ Dark mode styling applied consistently

#### Files Changed

**Backend:**

- `database/migrations/2026_09_29_000001_create_document_types_table.php` — NEW
- `database/migrations/2026_09_29_000002_create_documents_table.php` — NEW
- `database/migrations/2026_09_29_000003_create_certificates_table.php` — NEW
- `database/migrations/2026_09_29_000004_add_identification_no_to_users_table.php` — NEW
- `app/Models/DocumentType.php` — NEW
- `app/Models/Document.php` — NEW
- `app/Models/Certificate.php` — NEW
- `app/Http/Controllers/CertificateController.php` — NEW
- `routes/api.php` — Added CertificateController import and 5 new routes
- `database/seeders/DocumentTypeSeeder.php` — NEW
- `database/seeders/CertificateSeeder.php` — NEW
- `database/seeders/DatabaseSeeder.php` — Updated to call new seeders

**Frontend:**

- `src/services/api/certificates.js` — NEW
- `src/pages/certificate/CertificateVerificationPage.jsx` — NEW
- `src/data/exampleData.js` — Added `MockCertificates` export
- `src/App.jsx` — Added certificate route and import

#### Architecture Summary

**Authorization Model:**

- Uses `certificate.user_id` as the single source of truth for ownership
- Welder name and identification number are retained as informational fields only
- Admin role can access all certificates
- Public preview shows minimal safe information
- Detailed access restricted by user_id match

**Data Storage:**

- Certificate metadata in database columns: certificate_no, user_id, welder_name, test_date, etc.
- Detailed WQT information stored in JSON `data` field (qualification, tests, supervision, etc.)
- PDF files stored in private storage (not in database or public directory)

**Fallback Pattern:**

- API unavailable or unauthenticated: mock data returned to frontend
- Certificate not found: 404 returned
- Access denied: 403 returned with error message
- Frontend gracefully handles all scenarios

#### Known Limitations

1. PDF download endpoint returns placeholder; actual file streaming not implemented
2. Admin linking UI not yet implemented (backend-ready for future frontend)
3. File upload validation (5 MB max) prepared in specifications but not implemented
4. Certificate issuance workflow not implemented (certificates seeded manually)

#### Future Enhancements

1. Implement file upload with 5 MB validation on both frontend and backend
2. Create admin certificate digitization workflow (upload, link to user)
3. Implement actual PDF file download with proper authorization
4. Add certificate expiry checking and renewal workflow
5. Create certificate history and archival system
6. Add certificate search/filtering by multiple criteria
7. Implement certificate revocation workflow

Next: Deploy to Real Host (Future Task)

#### Backend deployment

1. Provision PHP 8.2+, Composer, MySQL, HTTPS, and a web server.
2. Create a production database and a dedicated database user. Do not use MySQL `root`.
3. Clone the `editorial-backend` repository to the server.
4. Point the web-server document root to Laravel's `public/` directory.
5. Create the private backend `.env` from `.env.example`.
6. Set `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL`, `FRONTEND_URL`, and production MySQL credentials.
7. Generate the application key on the server:

   ```bash
   php artisan key:generate
   ```

8. Install production dependencies and run safe migrations:

   ```bash
   composer install --no-dev --optimize-autoloader
   php artisan migrate --force
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   php artisan storage:link
   ```

9. Verify the backend:

   ```bash
   curl https://api.example.com/api/health
   ```

#### Frontend deployment

1. Keep `.env` files out of Git; they are already ignored.
2. In the real host or Vercel project settings, set:

   ```env
   VITE_DATA_SOURCE=api
   VITE_API_URL=https://api.example.com/api
   VITE_API_TIMEOUT=5000
   ```

3. Build the existing `editorial-web` repository:

   ```bash
   npm ci
   npm run build
   ```

4. Configure SPA fallback so `/dashboard`, `/products`, and other React routes load `index.html`.
5. If using same-domain routing, configure the reverse proxy so `/api/*` reaches Laravel and all other frontend routes reach React.
6. Confirm CORS allows the exact frontend origin through Laravel's `FRONTEND_URL` value.
7. Test health, GET, POST, PUT, and DELETE requests from the deployed frontend.

#### Required production decisions

Before starting this separate task, provide or decide:

- Real frontend domain
- Real API domain or same-domain proxy arrangement
- Hosting provider and web-server type
- PHP version and document root
- MySQL host, database, username, and password
- HTTPS certificate setup
- Backup and rollback procedure

Never run `migrate:fresh`, destructive seeders, or force pushes against a production system.

---

## Important Architectural Decisions

1. **Two independent repos** — `editorial-web` (React) and `editorial-backend` (Laravel), not a monorepo
2. **Mock data is NEVER deleted** — always available as fallback
3. **Fallback mock data on fetch failure** — all dashboard pages must use mock data as fallback when API requests fail (not authenticated, API unavailable, network error). Pages remain accessible without authentication.
4. **Data source switching via env var** — `VITE_DATA_SOURCE=mock|api`
5. **Native fetch()** — no Axios, no React Query; all API functions accept `AbortSignal`
6. **Dashboard CRUD pages first** — connected to services layer; public pages use inline data
7. **Sanctum personal access tokens** — for auth, not Passport or Breeze
8. **Role is backend-controlled** — never assignable from frontend data
9. **Products was first API resource** — simplest schema, now fully connected
10. **Auth is phase-by-phase** — Phases 8–17, one at a time, never combined

---

## Known Issues

- **API fallback on mutations**: `fetchFromApiWithFallback` silently falls back to mock data on create/update/delete failures. A failed backend mutation appears successful to the user (mock array is modified, database is not).
- **Authorization header only on auth endpoints**: Auth token is sent with `getUser()` and `logout()` requests, but not yet with CRUD API requests (products/services/pricing). Will be resolved in Phase 16.
- **Dashboard routes unprotected**: All dashboard routes are public until Phase 16.
- **ProtectedRoute inactive**: Component exists but is commented out in `App.jsx` routing.
- **Console logging in production**: `data.js` logs data source info to console on every page load.
- **`apiConfig.timeout` unused**: Defined in `config.js` but timeout logic lives separately in `data.js`.

### Mock Data Warning Headers

Added visual warning banners to dashboard pages when mock data fallback is active:

**Files Added:**

- `src/components/feedback/MockDataWarning.jsx` — reusable amber warning banner component

**Files Modified:**

- `src/services/data.js` — added `lastCallUsedFallback` tracker and `lastCallUsedMockFallback()` export
- `src/hooks/useEntityCrud.js` — added `usingMockData` state tracking and export
- `src/sections/dashboard/DashboardProductsContent.jsx` — displays warning when mock data loaded
- `src/sections/dashboard/DashboardServicesContent.jsx` — displays warning when mock data loaded
- `src/sections/dashboard/DashboardPricingContent.jsx` — displays warning when mock data loaded
- `src/sections/dashboard/DashboardProfilesContent.jsx` — displays warning when mock data loaded

**Behavior:**

- Warning appears when `VITE_DATA_SOURCE=mock` or when API requests fail/timeout
- Clear amber banner with alert icon explaining mock data usage
- Informs users that changes will not be saved to the database
- Applied consistently across all dashboard CRUD pages

---

## Environment Variables

### Local `.env` (gitignored, API-first development)

```env
VITE_DATA_SOURCE=api
VITE_API_URL=/api
VITE_API_TIMEOUT=2000
```

Local Vite proxies `/api` to `http://localhost:8000`, so local development does not require CORS.

### Vercel environment

Leave `VITE_DATA_SOURCE` unset for the public mock/demo deployment. The application defaults to mock data and does not require Laravel.

### Real host or production API environment

Configure these in the host's environment settings, never in Git:

```env
VITE_DATA_SOURCE=api
VITE_API_URL=https://api.example.com/api
VITE_API_TIMEOUT=5000
```

**Remember:** `VITE_` prefix = public. Never put secrets here.

---

## Testing Instructions

### Verify current state

```bash
# Frontend
cd editorial-web
npm run dev
# Visit http://localhost:5173
# Check: Landing page loads, products/pricing/services pages work
# Check: Dashboard pages show data (API or mock depending on VITE_DATA_SOURCE)
# Check: Dark mode toggle works

# Backend
cd editorial-backend
php artisan test
curl http://localhost:8000/api/health
curl http://localhost:8000/api/products
```

---

## Rollback / Checkpoint Information

Each phase may modify both repositories. Restore the frontend and backend to the matching checkpoint when rolling back a phase. Do not reset a repository with uncommitted work without reviewing it first.

| Phase                                         | Frontend checkpoint  | Backend checkpoint   | Description                                                |
| --------------------------------------------- | -------------------- | -------------------- | ---------------------------------------------------------- |
| Pre-Phase 0                                   | `7cc7ab3`            | —                    | Original frontend state before API work                    |
| Phase 1 — Create Laravel Backend              | —                    | `262ef25`            | Initial Laravel installation                               |
| Phase 2 — First API (Products)                | —                    | `ce2b095`            | Products API with full CRUD endpoints                      |
| Phase 3 — React API Layer                     | `cd1ccc3`            | `ce2b095`            | Fetch-based React API service layer                        |
| Phase 4 — Mock/API Switching                  | `42b2837`            | `ce2b095`            | Unified API/mock data abstraction                          |
| Phase 5 — Connect Pages Gradually             | `5dafbf8`            | `b1ebb1e`            | Services and pricing APIs connected to dashboard pages     |
| Phase 6 — CRUD Operations                     | `b5028da`            | `d2acd0e`            | Dashboard CRUD integration and catalog CRUD controllers    |
| Phase 7 — Production Preparation              | `49f16c0`            | `0c5d1ff`            | CORS, production templates, and deployment documentation   |
| Phase 8 — Inspect Authentication Architecture | `8387b62`            | `8387b62`            | Auth/profile requirements audit and Sanctum recommendation |
| Phase 9 — Update User Database & Model        | `60582ec`            | `44fe3e0`            | User profile fields and backend role field                 |
| Phase 10 — Configure Auth Infrastructure      | `0e23526`            | `ca55595`, `77a95e9` | Sanctum package, token migration, and User trait           |
| Phase 11 — Implement Registration             | `93b535b`, `f40326e` | `4ef2ae9`            | Registration API and React Register integration            |

### Rollback guidance

- Frontend commits are on `editorial-web` branch `main`.
- Backend commits are on `editorial-backend` branch `master`.
- Phase 11 requires both the frontend and backend checkpoints to work together.
- The backend `personal_access_tokens` and user-profile migrations are database changes; do not roll them back on a production database without a reviewed migration plan.
- For local rollback, use the repository-specific checkpoint commit and then run the relevant dependency/migration checks.
- The frontend must never receive Composer or Laravel files; Sanctum dependencies belong only to `editorial-backend`.
