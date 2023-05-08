import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//importar fuente roboto
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
//importamos estilos
import { CssBaseline } from '@mui/material'
//usamos el proveedor de notiStack
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline/>
    <SnackbarProvider>
    <App />
    </SnackbarProvider>
  </React.StrictMode>,
);
