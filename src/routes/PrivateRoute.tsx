import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';

interface PrivateRouteProps {
  children: ReactNode;
}

/**
 * Phase 3.2 - PrivateRoute component - Protects admin routes
 * 
 * Rules:
 * - If not authenticated → redirect to /admin/login
 * - After login → redirect back to intended page
 */
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    // Redirect to login with return URL
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
