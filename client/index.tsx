import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
// import App from './App';
import Signup from './components/Signup';
import Login from './components/Login';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<HomePage />} />
                <Route path="/team" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<NavBar />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
