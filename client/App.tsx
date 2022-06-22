import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button, AppBar, Box, Toolbar, IconButton, Grid, Typography } from '@mui/material';
import '../public/styles.css';

export default function HomePage() {
    const navigate = useNavigate();

    const handleLogin = (): void => {
        navigate('/login');
    };
    const handleSignup = (): void => {
        navigate('/signup');
    };
    const handleHome = (): void => {
        navigate('/');
    };
    const handleDemo = (): void => {
        navigate('/demo');
    };
    const handleAbout = (): void => {
        navigate('/about');
    };

    return (
        <div>
            <div id="navbar">
                {/* <img src="logo.png" alt="logo" /> */}

                <button type="submit" onClick={handleHome} className="linkBtn">
                    Home
                </button>
                <button type="submit" onClick={handleDemo} className="linkBtn">
                    Demo
                </button>
                <button type="submit" onClick={handleAbout} className="linkBtn">
                    About
                </button>
            </div>
            <div id="side-navbar">
                <button type="submit" onClick={handleLogin} className="linkBtn">
                    Login
                </button>
                <button type="submit" onClick={handleSignup} className="linkBtn">
                    Signup
                </button>
            </div>
            <div className="container">
                <section id="pageOne" />
                <section id="pageTwo" />
                <section id="pageThree" />
                <div id="footer">
                    <div>
                        <h4>Copyright © Team Cat-Snake 2022</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
