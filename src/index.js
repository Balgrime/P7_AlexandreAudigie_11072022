import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, } from 'react-router-dom';
import './style/index.scss';
import Home from './pages/Home';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </React.StrictMode>
);
