import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import settings from '../public/settings.png';
import intime from '../public/intime.png';
import data from '../public/data.png';
import barchart from '../public/barchart.png';
import gear from '../public/gear.png';
import '../public/styles.css';

export default function HomePage() {
    // todo: query to check auth status

    // FIXME: navbar show only on scroll up, not down
    // const [show, setShow] = useState('block');
    // const controlNavbar = () => {
    //     if (window.scrollY > 100) {
    //         setShow('none');
    //     } else {
    //         setShow('block');
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener('scroll', controlNavbar);
    //     return () => {
    //         window.removeEventListener('scroll', controlNavbar);
    //     };
    // }, []);

    return (
        <div>
            {/* <div id="navbar" style={{ display: show }}>
                <Link to="/" type="submit" className="linkBtn">
                    Home
                </Link>
                <Link to="/demo" type="submit" className="linkBtn">
                    Demo
                </Link>
                <Link to="/about" type="submit" className="linkBtn">
                    About
                </Link>
            </div>
            <div id="side-navbar" style={{ display: show }}>
                <Link to="/login" type="submit" className="linkBtn">
                    Login
                </Link>
                <Link to="/signup" type="submit" className="linkBtn">
                    Signup
                </Link>
            </div> */}
            {/* FIXME: "container" class was breaking the display in Chrome */}
            <div className="">
                <section id="pageOne">
                    <div className="blue-filter" />
                    <div className="video_wrapper">
                        <iframe
                            title="unique-title-1"
                            className="modest-vid-embed__item"
                            style={{ width: '100%', height: '130%' }}
                            src="https://www.youtube.com/embed/BQ0mxQXmLsk?mute=1&autoplay=1&modestbranding=1&loop=1&rel=0&amp;controls=0&amp;showinfo=0&playlist=rwlzvGfGXn4"
                            frameBorder="0"
                            allowFullScreen
                        />
                    </div>
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
                <div className="centeredSentence">
                    <h1>What makes us different?</h1>
                </div>
                <section id="pageThree">
                    <div id="pageThreeWrapper">
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
            </div>
        </div>
    );
}
