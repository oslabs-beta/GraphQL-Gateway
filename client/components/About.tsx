import React from 'react';

export default function About() {
    return (
        <div className="container">
            <section id="aboutSection">
                <div id="aboutDiv">
                    <h1>OUR STORY</h1>
                    <p>
                        <strong>GraphQL GATEWAY</strong> tool seriers started in the SUMMER of 2022.
                        A group of passionate engineers - Cat Snake Team, had a vision: to solve
                        `the GrqphQL rate limiting` issue with our own approach and bring our
                        contribution to open source community
                    </p>
                    <p>
                        Today <strong>GraphQL GATEWAY</strong> tool series has launched and featured
                        with <strong>TWO</strong> npm packages - GraphQL limiter and Gate Logger,
                        plus this developer portal.
                    </p>
                    <p>
                        <strong>GraphQL GATEWAY</strong> tool series features <strong>FOUR</strong>{' '}
                        rate-limiting approaches implemented in OUR very own GraphQL limiter npm
                        package, With this package of rate-limiting tools, limiting the number of
                        API calls an app or user make in a given amount of time is no longer a
                        issue.
                    </p>
                    <span>
                        ☕ If you like our product, can buy us a&nbsp;
                        <a
                            style={{ color: '#181818', textDecoration: 'underline' }}
                            href="https://www.buymeacoffee.com/CatSnake"
                        >
                            coffee
                        </a>
                        &nbsp;☕
                    </span>
                </div>
            </section>
        </div>
    );
}
