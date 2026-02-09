# Nador Guide 🏖️

A modern web application for discovering and exploring places in Nador, Morocco. Built with React, TypeScript, and Redux Toolkit.

## 📋 Overview

Nador Guide is a full-featured tourism platform featuring:

- **Visitor Space**: Browse and discover places in Nador with detailed information
- **Admin Dashboard**: Manage places, categories, and content
- **Category Filtering**: Find places by type (beaches, restaurants, historical sites, etc.)
- **Authentication**: Secure admin access with JWT-based authentication

## 🚀 Tech Stack

- **Frontend**: React 19 + TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form + Yup validation
- **HTTP Client**: Axios
- **Backend**: JSON Server (mock API)
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/                # Redux store configuration
├── features/           # Redux slices (auth, places, categories)
├── pages/              # Page components
│   ├── visitor/       # Public pages (Home, Places List, Details)
│   └── admin/         # Protected pages (Dashboard, Management)
├── components/         # Reusable components
│   ├── common/        # Shared UI components
│   ├── layout/        # Layout wrappers
│   └── ui/            # Basic UI elements
├── routes/            # Route configuration & protection
├── services/          # API clients & service layer
├── types/             # TypeScript type definitions
├── utils/             # Helper functions
└── hooks/             # Custom React hooks
```

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nador-guide
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Start the JSON Server (in a separate terminal)**
   ```bash
   npm run server
   ```

The app will be available at `http://localhost:5173`  
The API server runs on `http://localhost:3001`

## 📜 Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start JSON Server (mock backend)
- `npm run lint` - Run ESLint

## 🔑 Admin Access

To access the admin dashboard, you'll need to log in at `/admin/login`.

The application uses DummyJSON API for authentication. You can use any valid credentials from [DummyJSON users](https://dummyjson.com/users).

Example credentials:

- **Username**: `emilys`
- **Password**: `emilyspass`

## 🎯 Features

### Visitor Features

- ✅ Browse all active places
- ✅ Filter places by category
- ✅ View detailed place information
- ✅ Responsive design for mobile and desktop
- ✅ Image galleries
- ✅ Opening hours and pricing information

### Admin Features

- ✅ Secure authentication
- ✅ Dashboard with statistics
- ✅ Create, edit, and delete places
- ✅ Activate/deactivate places
- ✅ Category management
- ✅ Image upload support
- ✅ Form validation

## 🎨 Design System

The project uses Tailwind CSS with a custom configuration optimized for the tourism/guide theme. Components are built with responsiveness and accessibility in mind.

## 🔄 State Management

Redux Toolkit is used for global state management with the following slices:

- **authSlice**: Authentication state and user info
- **placesSlice**: Places data and CRUD operations
- **categoriesSlice**: Categories data

## 🌐 API Endpoints

The JSON Server provides the following endpoints:

- `GET /places` - Get all places
- `GET /places/:id` - Get place by ID
- `POST /places` - Create a new place
- `PUT /places/:id` - Update a place
- `DELETE /places/:id` - Delete a place
- `GET /categories` - Get all categories


---

Built with ❤️ for Nador, Morocco
