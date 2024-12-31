import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer, Zoom } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Minimalist, Elegant ve Glassmorphism Stili
const contextClass = {
  success: "border-teal-500 border-2 shadow-xl shadow-teal-900/20",
  error: "border-gray-500 border-2  shadow-xl shadow-red-900/20",
  info: "border-cyan-500 border-2 r shadow-xl shadow-cyan-900/20",
  warning: "border-yellow-500 border-2  shadow-xl shadow-yellow-900/20",
  default: "border-gray-300 border-2  shadow-xl shadow-gray-900/30",
  dark: "border-gray-700 border-2 shadow-xl shadow-neutral-800/30",
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer
      toastClassName={(context) =>
        contextClass[context?.type || "default"] +
        " relative flex p-4 mb-4 min-h-12 lg:rounded-t-sm lg:rounded-b-xl  justify-between overflow-hidden cursor-pointer bg-transparent border-none md:border-2 " +
        " backdrop-blur-md bg-transparent border "
      }
      bodyClassName={() => "text-sm text-gray-300 font-semibold block p-3"}
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}  
      pauseOnFocusLoss={false}
      pauseOnHover={true}
      transition={Zoom}
    />
  </StrictMode>,
);
