import React from 'react';

import ReactDOM from 'react-dom/client';

import './index.css';
import QueryProvider from './provider/query-provider.tsx';
import LayoutConfigProvider from './provider/theme-config-provider.tsx';
import Routes from './routes/index.tsx';
import { ToasterConfig } from '@/components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LayoutConfigProvider>
      <QueryProvider>
        <ToasterConfig />
        <Routes />
      </QueryProvider>
    </LayoutConfigProvider>
  </React.StrictMode>,
);
