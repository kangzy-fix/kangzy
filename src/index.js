import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './css/main.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <>
    <App />

    <ToastContainer />
  </>
);

reportWebVitals();
