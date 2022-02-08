import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import App from './App';
import axios from 'axios';
axios.defaults.baseURL = window.location.origin + "/api/";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
