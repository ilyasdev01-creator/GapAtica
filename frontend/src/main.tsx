import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

const client = import.meta.env.VITE_CLENT_ID;

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={client}>
      <ToastContainer position="top-right" autoClose={3000} />
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
);
