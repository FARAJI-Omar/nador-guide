import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './App.css';

/**
 * Main App Component
 * 
 * Phase 0.3: Router configuration with public and protected routes
 * - Public routes: Home, Places List, Place Details
 * - Protected routes: Admin Dashboard, Places Management
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
