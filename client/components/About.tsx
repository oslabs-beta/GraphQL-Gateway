import React from 'react';

export default function About() {
    return (
        <div className="container">
            <section id="aboutSection">
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
                <div id="aboutDiv">
                    <h1>OUR STORY</h1>
                    <p>
                        <strong>GraphQL GATEWAY</strong> tool seriers started in the SUMMER of 2022.
                        A group of passionate engineers - Cat Sneak Team, had a vision: to solve the
                    </p>
                    <p>
                        Today <strong>GraphQL GATEWAY</strong> tool series has launched and featured
                        with TWO npm packages - GraphQL limiter and Gate Logger, plus this developer
                        portal.
                    </p>
                    <p>
                        If you like our product, can buy us a coffee ☕
                        <a href="https://www.buymeacoffee.com/catSnake"> here</a>
                    </p>
                </div>
            </section>
        </div>
    );
}
