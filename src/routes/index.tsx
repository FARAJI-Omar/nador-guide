import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import VisitorLayout from '../components/layout/VisitorLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Visitor Pages
import HomePage from '../pages/visitor/HomePage';
import PlacesListPage from '../pages/visitor/PlacesListPage';
import PlaceDetailsPage from '../pages/visitor/PlaceDetailsPage';

// Admin Pages
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminPlacesList from '../pages/admin/AdminPlacesList';
import AdminPlaceCreate from '../pages/admin/AdminPlaceCreate';
// import AdminPlacesList from '../pages/admin/AdminPlacesList';
// import AdminPlaceCreate from '../pages/admin/AdminPlaceCreate';
// import AdminPlaceEdit from '../pages/admin/AdminPlaceEdit';

// Protected Route Component
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  // PUBLIC ROUTES (Visitor Space)
  {
    path: '/',
    element: <VisitorLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'places',
        element: <PlacesListPage />,
      },
      {
        path: 'places/:id',
        element: <PlaceDetailsPage />,
      },
    ],
  },

  // ADMIN ROUTES (Protected)
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'places',
        element: <AdminPlacesList />,
      },
      {
        path: 'places/create',
        element: <AdminPlaceCreate />,
      },
      {
        path: 'places/edit/:id',
        // element: <AdminPlaceEdit />,
        element: <AdminPlaceCreate />, // Placeholder
      },
    ],
  },
  // 404 Not Found
  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },

]);
