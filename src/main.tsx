import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import App from './App.tsx';

/**
 * Application Entry Point
 * 
 * Phase 0: Foundation setup with routing
 * Phase 5: Redux Provider configured ✅
 * TODO Phase 6: Add ToastContainer for notifications
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
