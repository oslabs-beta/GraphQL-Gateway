import React, { useState, useEffect } from 'react';
import settings from '../public/settings.png';
import intime from '../public/intime.png';
import data from '../public/data.png';
import barchart from '../public/barchart.png';
import snippet from '../public/code-snippet.png';
import logo from '../public/logo.png';
import project from '../public/demogif3.gif';
import '../public/styles.css';

export default function HomePage() {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const toRotate = ['Developer Portal'];
    const [isCopied, setIsCopied] = useState(false);

    const tick = () => {
        const i = loopNum % toRotate.length;
        const fullText = toRotate[i];
        const updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
        }
    };

    useEffect(() => {
        const ticker = setInterval(() => {
            tick();
        }, 400);

        return () => {
            clearInterval(ticker);
        };
    }, [text]);

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
                    <div id="pageOneTextBox">
                        <h1>GraphQLGate</h1>
                        <h2>
                            <span
                                className="txt-rotate"
                                data-rotate='["Developer Tool", "Rate Limiter", "Logger"]'
                            >
                                <span className="wrap">{text}</span>
                            </span>
                        </h2>
                        <p>
                            An Open Source GraphQL rate-limiter with query complexity analysis for
                            Node.js and Express. Estimate the upper bound of the response size
                            before resolving the query and optionally log query data to our Gateway
                            Developer Portal to monitor and tune rate limiting settings.
                        </p>
                        <button
                            className="learnMoreBtn"
                            style={{ border: '1px solid #2785d7ca' }}
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href =
                                    'https://medium.com/@evanmcneely/graphqlgate-rate-limiting-with-query-complexity-for-node-js-bd85195b0c0f';
                            }}
                        >
                            Learn more →
                        </button>
                    </div>
                    <div>
                        <img src={logo} alt={logo} />
                    </div>
                </section>
                <section id="pageTwo">
                    <div id="demoCardBox">
                        <h3>
                            Code Snippet
                            <button type="submit" onClick={() => copy(code)}>
                                📋{isCopied && <small>Copied</small>}
                            </button>
                        </h3>
                        <img src={snippet} alt="settings" />
                    </div>
                    <img className="gif" src={project} alt="./project.gif" />
                </section>
                <div className="centeredSentence">
                    <h1>Core Capabilities</h1>
                </div>
                <section id="pageThree">
                    <span className="iconCover" />
                    <div id="pageThreeWrapper">
                        <div id="pageThreeLeft">
                            <div className="icon">
                                <img className="iconImg" src={settings} alt="settings-icon" />
                                <p>
                                    Customize your rate-limiting logic with popular algorithms like
                                    token-bucket, fixed-window, sliding-window-counter and
                                    sliding-window-log, and assign custom type weights to your
                                    fields to tailor the solution to your needs.
                                </p>
                            </div>
                            <div className="icon">
                                <img className="iconImg" src={barchart} alt="barchart-icon" />
                                <p>
                                    Analyses query request data such as complexity, depth and tokens
                                    with different rate limiting settings applied to see “what would
                                    have happened” to tune your API rate-limits and better protect
                                    your application.
                                </p>
                            </div>
                        </div>
                        <div id="pageThreeRight">
                            <div className="icon">
                                <img className="iconImg" src={intime} alt="intime-icon" />
                                <p>
                                    Accurately measure the complexity of a GraphQL query before
                                    executing it to throttle queries by complexity and depth before
                                    they reach your GraphQL API.
                                </p>
                            </div>
                            <div className="icon">
                                <img className="iconImg" src={data} alt="data-icon" />
                                <p>
                                    Gain insight to your GraphQL API with the Gateway Developer
                                    Portal which allows you to visualize query data to identify
                                    trends over the long term.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
