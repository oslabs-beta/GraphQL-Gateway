/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import settings from '../public/settings.png';
import intime from '../public/intime.png';
import data from '../public/data.png';
import barchart from '../public/barchart.png';
// import gear from '../public/gear.png';
import '../public/styles.css';

export default function HomePage() {
    const [isCopied, setIsCopied] = useState(false);
    const code = `
    // import package
    import gateLogger from 'gate-logger';
    import expressGraphQLRateLimiter from 'graphqlgate';
    /**
     * Import other dependencies
     * */
    //Add the logger middleware into your GraphQL middleware chain
    app.use('gql', gateLogger(/*PROJECT ID*/, /*API KEY*/));
    //Add the rate limiting middleware
    app.use(
        'gql',
        expressGraphQLRateLimiter(schemaObject, {
            rateLimiter: {
                type: 'TOKEN_BUCKET',
                refillRate: 10,
                capacity: 100,
            },
        }) /** add GraphQL server here*/
    )
    `;

    function copy(someText: string) {
        navigator.clipboard.writeText(someText);
        setIsCopied(true);
    }
    useEffect(() => {
        setTimeout(() => {
            if (isCopied) setIsCopied(false);
        }, 2000);
    });

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
                {/* <button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href =
                            'https://medium.com/@evanmcneely/graphqlgate-rate-limiting-with-query-complexity-for-node-js-bd85195b0c0f';
                    }}
                >
                    Learn more
                </button> */}
                <section id="demoCard">
                    <div id="demoCardWrapper">
                        {/* <div className="algorithmCard">
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
                        <div className="algorithmCard">
                            <h3>Alghorhitm</h3>
                            <h1>Leacky Bucket</h1>
                            <img src={gear} alt="settings" />
                        </div> */}

                        <h3>
                            Code Snippet
                            <button type="submit" onClick={() => copy(code)}>
                                📋{isCopied && <small>Copied</small>}
                            </button>
                        </h3>
                        <img
                            id="codesnippet"
                            src="code-snippet.png"
                            alt="code snippet for use in application"
                        />
                    </div>
                    {/* <div className="demoCardImg" /> */}
                </section>
                <section id="pageTwo" />
                <div className="centeredSentence">
                    <h1>Core Capabilities</h1>
                </div>
                <section id="pageThree">
                    <div id="pageThreeWrapper">
                        <div id="pageThreeLeft">
                            <div className="icon">
                                <img className="iconImg" src={settings} alt="settings-icon" />
                                <p>
                                    Gain insight to your GraphQL API with the Gateway Developer
                                    Portal which allows you to visualize query data to identify
                                    trends over the long term.
                                </p>
                            </div>
                            <div className="icon">
                                <img className="iconImg" src={barchart} alt="barchart-icon" />
                                <p>
                                    Accurately measure the complexity of a GraphQL query before
                                    executing it to throttle queries by complexity and depth before
                                    they reach your GraphQL API
                                </p>
                            </div>
                        </div>
                        <div id="pageThreeRight">
                            <div className="icon">
                                <img className="iconImg" src={intime} alt="intime-icon" />
                                <p>
                                    Analyses query request data such as complexity, depth and tokens
                                    with different rate limiting settings applied to see “what would
                                    have happened” to tune your API rate-limits and better protect
                                    your application.
                                </p>
                            </div>
                            <div className="icon">
                                <img className="iconImg" src={data} alt="data-icon" />
                                <p>
                                    Customize your rate-limiting logic with popular algorithms like
                                    token-bucket, fixed-window, sliding-window-counter and
                                    sliding-window-log, and assign custom type weights to your
                                    fields to tailor the solution to your needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
