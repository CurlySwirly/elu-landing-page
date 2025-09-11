import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Initialize toast container outside of React component tree
export const initializeToasts = () => {
  const toastRoot = document.getElementById('toast-root');
  if (toastRoot) {
    const root = createRoot(toastRoot);
    root.render(
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        toastStyle={{
          fontFamily: 'Open Sans, sans-serif',
          minWidth: '400px',
          maxWidth: '600px',
          fontSize: '14px',
        }}
      />
    );
  }
};
