import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/crazyToasts.css'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <App />
  </BrowserRouter>
)
