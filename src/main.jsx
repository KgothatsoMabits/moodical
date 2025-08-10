import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './styles/themes.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);