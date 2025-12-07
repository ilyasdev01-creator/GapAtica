import type { ToastOptions } from 'react-toastify';

export const toastConfig = {
  success: {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: 'rgba(7, 20, 38, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1.5px solid #00D0A6',
      borderRadius: '12px',
      color: '#e6f7ff',
      fontFamily: '"Jaro", sans-serif',
      boxShadow: '0 8px 32px rgba(0, 208, 166, 0.25)',
      padding: '16px 20px',
    },
    progressStyle: {
      background: 'linear-gradient(90deg, #00D0A6 0%, #009d80 100%)',
      borderRadius: '4px',
      height: '3px',
    },
  } as ToastOptions,
  
  error: {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: 'rgba(7, 20, 38, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1.5px solid #ff6b6b',
      borderRadius: '12px',
      color: '#ffe0e0',
      fontFamily: '"Jaro", sans-serif',
      boxShadow: '0 8px 32px rgba(255, 107, 107, 0.25)',
      padding: '16px 20px',
    },
    progressStyle: {
      background: 'linear-gradient(90deg, #ff6b6b 0%, #ff5252 100%)',
      borderRadius: '4px',
      height: '3px',
    },
  } as ToastOptions,

  info: {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: 'rgba(7, 20, 38, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1.5px solid #5B8CFF',
      borderRadius: '12px',
      color: '#e6f7ff',
      fontFamily: '"Jaro", sans-serif',
      boxShadow: '0 8px 32px rgba(91, 140, 255, 0.25)',
      padding: '16px 20px',
    },
    progressStyle: {
      background: 'linear-gradient(90deg, #5B8CFF 0%, #4b77e6 100%)',
      borderRadius: '4px',
      height: '3px',
    },
  } as ToastOptions,

  warning: {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: 'rgba(7, 20, 38, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1.5px solid #ffa500',
      borderRadius: '12px',
      color: '#fff5e6',
      fontFamily: '"Jaro", sans-serif',
      boxShadow: '0 8px 32px rgba(255, 165, 0, 0.25)',
      padding: '16px 20px',
    },
    progressStyle: {
      background: 'linear-gradient(90deg, #ffa500 0%, #ff9100 100%)',
      borderRadius: '4px',
      height: '3px',
    },
  } as ToastOptions,
};

