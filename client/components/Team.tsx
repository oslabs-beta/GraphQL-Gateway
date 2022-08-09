import React from 'react';

export default function Team() {
    return (
        <div className="container">
            <section id="aboutSection">
                <div id="aboutDiv">
                    <h1>OUR STORY</h1>
                    <p>
                        <strong style={{ color: '#2785d7ca' }}>GraphQLGateway</strong> was developed
                        by a group of passionate engineers with the idea of developing a rate
                        limiter for GraphQL APIs based on accurate complexity analysis.
                    </p>
                    <p>
                        The <strong style={{ color: '#2785d7ca' }}>GraphQLGateway</strong> suite
                        consists of <strong style={{ color: '#2785d7ca' }}>graphql-limiter</strong>{' '}
                        providing rate limiting tools for your API and{' '}
                        <strong style={{ color: '#2785d7ca' }}>gate-logger</strong> establishing the
                        link between the rate limiter and your{' '}
                        <strong style={{ color: '#2785d7ca' }}>Developer Portal</strong>. Combined
                        these tools will allow you to monitor your API and fine tune your rate
                        limiter to meet your specific needs.
                    </p>
                    <p>
                        With the multiple rate-limiting and configuration choices, protecting your
                        APIs becomes an afterthought.
                    </p>
                    <p>- Evan, Stephan, Milos, Flora and Jon</p>
                    <span style={{ color: '#414141' }}>
                        ☕ Want to support us? - Buy us a&nbsp;
                        <a
                            style={{ color: '#2785d7ca', textDecoration: 'no-underline' }}
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
