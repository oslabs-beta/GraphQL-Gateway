import React from 'react';
import settings from '../public/settings.png';
import intime from '../public/intime.png';
import data from '../public/data.png';
import barchart from '../public/barchart.png';
import snippet from '../public/code-snippet.png';
import '../public/styles.css';

export default function HomePage() {
    return (
        <div>
            <div className="container">
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
                        <h1>GraphQLGate</h1>
                        <h2>
                            An Open Source GraphQL rate-limiter with query complexity analysis for
                            Node.js and Express
                        </h2>
                        <p>
                            Estimate the upper bound of the response size before resolving the query
                            and optionally log query data to our Gateway Developer Portal to monitor
                            and tune rate limiting settings.
                        </p>
                    </div>
                </section>
                <section id="demoCard">
                    <div id="demoCardWrapper">
                        <img src={snippet} alt="settings" />
                    </div>
                </section>
                <section style={{ height: '555px' }} id="pageTwo" />
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
