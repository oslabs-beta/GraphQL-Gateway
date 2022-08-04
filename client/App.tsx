import React, { useEffect, useState } from 'react';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import settings from '../public/settings.png';
import intime from '../public/intime.png';
import data from '../public/data.png';
import barchart from '../public/barchart.png';
import gear from '../public/gear.png';
import '../public/styles.css';

export default function HomePage() {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = ['GraphQL Gate Developer Tool', 'Rate Limiter', 'Logger'];
    const period = 500;
    const [isCopied, setIsCopied] = useState(false);

    const tick = () => {
        const i = loopNum % toRotate.length;
        const fullText = toRotate[i];
        const updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta((prevDelta) => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex((prevIndex) => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex((prevIndex) => prevIndex + 1);
        }
    };
    useEffect(() => {
        const ticker = setInterval(() => {
            tick();
        }, delta);

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
        <div className="container">
            <section id="pageOne">
                <div id="pageOneTextBox">
                    <h1>GraphQL Gate</h1>
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
                        Node.js and Express.
                    </p>
                    <p>
                        Estimate the upper bound of the response size before resolving the query and
                        optionally log query data to our Gateway Developer Portal to monitor and
                        tune rate limiting settings.
                    </p>
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = 'https://medium.com/@evanmcneely/graphqlgate-rate-limiting-with-query-complexity-for-node-js-bd85195b0c0f';
                        }}
                    >
                        Learn more <ArrowRightCircle size={25} />
                    </button>
                </div>
                <img src="./Logo.PNG" alt="./Logo.PNG" />
            </section>
            <section id="pageTwo">
                <div id="demoCardWrapper">
                    <div className="algorithmCard">
                        <h3>
                            Code Snippet
                            <button type="submit" onClick={() => copy(code)}>
                                📋{isCopied && <small>Copied</small>}
                            </button>
                        </h3>
                        <img src="./code.png" alt="./code.png" />
                    </div>

                    <div id="gifCard">
                        <img src="./login.gif" alt="./login.gif" />
                        <img src="./project.gif" alt="./project.gif" />
                        <img src="./queries.gif" alt="./queries.gif" />
                    </div>
                    {/* <div className="algorithmCard">
                        <h1>Token Bucket</h1>
                        <img src={gear} alt="settings" />
                    </div>
                    <div className="algorithmCard">
                        <h1>Sliding Window Log</h1>
                        <img src={gear} alt="settings" />
                    </div>
                    <div className="algorithmCard">
                        <h1>Sliding Window Counter</h1>
                        <img src={gear} alt="settings" />
                    </div>
                    <div className="algorithmCard">
                        <h1>Fixed Window</h1>
                        <img src={gear} alt="settings" />
                    </div>
                    <div className="demoCardImg" /> */}
                </div>
            </section>

            <div className="centeredSentence">
                <h1>WHAT MAKES US DIFFERENT?</h1>
            </div>
            <section id="pageThree">
                <div id="pageThreeWrapper">
                    <div id="pageThreeLeft">
                        <div className="icon">
                            <img className="iconImg" src={settings} alt="settings-icon" />
                            <p>
                                Customize your rate-limiting logic with popular algorithms like
                                token-bucket, fixed-window, sliding-window-counter and
                                sliding-window-log, and assign custom type weights to your fields to
                                tailor the solution to your needs.
                            </p>
                        </div>
                        <div className="icon">
                            <img className="iconImg" src={intime} alt="intime-icon" />
                            <p>
                                Accurately measure the complexity of a GraphQL query before
                                executing it to throttle queries by complexity and depth before they
                                reach your GraphQL API.
                            </p>
                        </div>
                    </div>
                    <div id="pageThreeRight">
                        <div className="icon">
                            <img className="iconImg" src={barchart} alt="barchart-icon" />
                            <p>
                                Analyses query request data such as complexity, depth and tokens
                                with different rate limiting settings applied to see “what would
                                have happened” to tune your API rate-limits and better protect your
                                application.
                            </p>
                        </div>
                        <div className="icon">
                            <img className="iconImg" src={data} alt="data-icon" />
                            <p>
                                Gain insight to your GraphQL API with the Gateway Developer Portal
                                which allows you to visualize query data to identify trends over the
                                long term.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
