import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';
import QueryProvider from './provider/query-provider.tsx';
import { ThemeProvider } from './provider/theme-config-provider.tsx';
import { ToasterConfig } from '@/components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryProvider>
        <ToasterConfig />
        <App />
      </QueryProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
