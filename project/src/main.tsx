import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NhostProvider } from '@nhost/react';
import { nhost } from './lib/nhost';
import { validateEnv } from './config/env';
import App from './App';
import './index.css';

// Validate environment variables before starting the app
validateEnv();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NhostProvider nhost={nhost}>
      <App />
    </NhostProvider>
  </StrictMode>
);