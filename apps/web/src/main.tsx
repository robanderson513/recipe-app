import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@robanderson513/design-system/common';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
