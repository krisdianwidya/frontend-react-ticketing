import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PrimeReactProvider } from 'primereact/api';

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <PrimeReactProvider>
    <App />
  </PrimeReactProvider>
  // </React.StrictMode>,
)
