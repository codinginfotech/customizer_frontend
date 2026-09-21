import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* Toasts match the app chrome: ink surface, hairline, tight type. */}
      <Toaster
        position="bottom-right"
        gutter={8}
        toastOptions={{
          duration: 3500,
          className: '',
          style: {
            background: '#1a1816',
            color: '#f4f2ef',
            fontSize: '13px',
            lineHeight: '1.4',
            fontWeight: 500,
            letterSpacing: '-0.006em',
            padding: '10px 14px',
            borderRadius: '10px',
            maxWidth: '360px',
            boxShadow: '0 0 0 1px rgba(255,255,255,.08), 0 12px 32px -8px rgba(15,14,13,.5)',
          },
          success: { iconTheme: { primary: '#34d399', secondary: '#1a1816' } },
          error: { iconTheme: { primary: '#f87171', secondary: '#1a1816' } },
          loading: { iconTheme: { primary: '#cd6435', secondary: '#1a1816' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
);
