# Authentication System - Frontend

A modern React-based authentication system with login, registration, and dashboard functionality.

## Features

- ✅ **User Registration** - Create new accounts with form validation
- ✅ **User Login** - Secure login with JWT tokens
- ✅ **Dashboard** - Protected dashboard for authenticated users
- ✅ **Form Validation** - Client-side validation with error messages
- ✅ **Responsive Design** - Mobile-friendly UI
- ✅ **Modern UI** - Beautiful gradient design with animations
- ✅ **API Integration** - Ready to connect with backend APIs
- ✅ **Session Management** - Token-based authentication
- ✅ **Route Protection** - Protected routes for authenticated users

## Installation

1. Navigate to the Client directory:
   ```bash
   cd Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Registration Flow
1. Navigate to `/register` or click "Sign up" from the login page
2. Fill in the registration form with validation
3. Click "Create Account"
4. Upon successful registration, you'll be redirected to the login page

### Login Flow
1. Navigate to `/login` (default route)
2. Enter your email and password
3. Click "Sign In"
4. Upon successful login, you'll be redirected to the dashboard

## API Integration

The frontend is ready to connect with your backend API. Update the `API_BASE_URL` in `src/services/api.js`

## Database Schema

Refer to the `DATABASE_SCHEMA.md` file in the root directory for complete database structure and API endpoints.
