import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import App from './App';
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './palette';
axios.defaults.baseURL = window.location.origin + "/api/";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
