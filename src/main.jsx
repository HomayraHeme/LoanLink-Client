import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router/dom';
import { router } from './Routes/Router.jsx';
import { ThemeProvider } from './Theme/ThemeContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1️⃣ Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
