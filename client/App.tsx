import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button, AppBar, Box, Toolbar, IconButton, Grid, Typography } from '@mui/material';
import '../public/styles.css';

const settings = require('../public/settings.png');
const intime = require('../public/intime.png');
const data = require('../public/data.png');
const barchart = require('../public/barchart.png');

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
                <section id="pageOne">
                    <div id="pageOneTextBox">
                        <h1>Graph QL Rate Limiter</h1>
                        <h2>Gateway visualisation tool</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </p>
                    </div>
                </section>
                <section id="demoCard" />
                <section id="pageTwo" />
                <section id="pageThree">
                    <div>
                        <div id="pageThreeLeft" />
                        <div id="pageThreeRight">
                            <div className="icon">
                                <img src={settings} alt="settings-icon" />
                            </div>
                            <div className="icon">
                                <img src={barchart} alt="barchart-icon" />
                            </div>
                            <div className="icon">
                                <img src={intime} alt="intime-icon" />
                            </div>
                            <div className="icon">
                                <img src={data} alt="data-icon" />
                            </div>
                        </div>
                    </div>
                </section>
                <div id="footer">
                    <div>
                        <h4>Copyright © Team Cat-Snake 2022</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
