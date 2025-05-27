import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StockProvider } from "./context/StockContext";
import App from './App.jsx'
import GlobalStyles from './Styles/GlobalStyles.js';
import { ToastContainer } from 'react-toastify';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StockProvider>
      <App />
    </StockProvider>
    <GlobalStyles />
    <ToastContainer autoClose={2000} theme='colored'/>
  </StrictMode>,
)
