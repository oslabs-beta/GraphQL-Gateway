import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import settings from '../public/settings.png';
import intime from '../public/intime.png';
import data from '../public/data.png';
import barchart from '../public/barchart.png';
import gear from '../public/gear.png';
import '../public/styles.css';

export default function HomePage() {
    // FIXME: navbar show only on scroll up, not down
    const [show, setShow] = useState('block');
    const controlNavbar = () => {
        if (window.scrollY > 100) {
            setShow('none');
        } else {
            setShow('block');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, []);

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
            <div id="navbar" style={{ display: show }}>
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
            <div id="side-navbar" style={{ display: show }}>
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
                <section id="demoCard">
                    <div id="demoCardWrapper">
                        <div className="algorithmCard">
                            <h3>Alghorhitm</h3>
                            <h1>Token Bucket</h1>
                            <img src={gear} alt="settings" />
                        </div>
                        <div className="algorithmCard">
                            <h3>Alghorhitm</h3>
                            <h1>Sliding Window</h1>
                            <img src={gear} alt="settings" />
                        </div>
                        <div className="algorithmCard">
                            <h3>Alghorhitm</h3>
                            <h1>Leacky Bucket</h1>
                            <img src={gear} alt="settings" />
                        </div>
                        <div className="demoCardImg" />
                    </div>
                </section>
                <section id="pageTwo" />
                <section id="pageThree">
                    <div id="pageThreeWrapper">
                        <div className="centeredSentence">
                            <h1>What makes us different?</h1>
                        </div>
                        <div id="pageThreeLeft">
                            <div className="icon">
                                <img className="iconImg" src={settings} alt="settings-icon" />
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                            <div className="icon">
                                <img className="iconImg" src={barchart} alt="barchart-icon" />
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                        <div id="pageThreeRight">
                            <div className="icon">
                                <img className="iconImg" src={intime} alt="intime-icon" />
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                            <div className="icon">
                                <img className="iconImg" src={data} alt="data-icon" />
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
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
