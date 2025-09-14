# Authentication Setup Guide

## Google OAuth Setup

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized origins:
   - `http://localhost:5173` (for development)
   - Your production domain
7. Copy the Client ID

### 2. Environment Variables

Create a `.env` file in the frontend root directory with:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

Create a `.env` file in the backend directory with:

```env
GOOGLE_CLIENT_ID=your-google-client-id-here
JWT_SECRET=your-jwt-secret-here
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-admin-password
```

### 3. Features Implemented

✅ **Google OAuth Authentication**

- One-click Google login
- Automatic user creation for new Google users
- Profile picture integration

✅ **Toast Notifications**

- Success messages for login/signup
- Error messages for failed attempts
- Professional toast styling

✅ **Protected Routes**

- Events page requires authentication
- Blogs page requires authentication
- Calendar page requires authentication
- Automatic redirect to login if not authenticated

✅ **Authentication Context**

- Global authentication state management
- Automatic token validation
- User profile management

✅ **Updated UI**

- Login/logout buttons in navbar
- User state persistence
- Loading states during authentication

### 4. How to Use

1. **For Users:**

   - Click "Login" in the navbar
   - Use email/password or Google OAuth
   - Access protected pages after login

2. **For Admins:**
   - Use the admin panel with admin credentials
   - All admin functionality remains unchanged

### 5. Security Features

- JWT token-based authentication
- Protected API endpoints
- Automatic token validation
- Secure Google OAuth integration
- Password hashing for regular users
