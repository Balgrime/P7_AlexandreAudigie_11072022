import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style/index.css';
import Home from './pages/Home';
import Forum from './pages/Forum';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Home />
    </Router>
  </React.StrictMode>
);
