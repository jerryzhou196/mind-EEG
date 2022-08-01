import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'
import Join from './pages/join'
import Call from './pages/call'
import { BrowserRouter, Routes, Route } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Join />}></Route>
      <Route path="/callpage" element={<Call />}></Route>

    </Routes>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

