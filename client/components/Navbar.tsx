/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable default-case */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../public/styles.css';

export default function Navbar() {
    const [show, setShow] = useState('flex');
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            console.log('top', document.body.getBoundingClientRect().top);
            setScrollPos(document.body.getBoundingClientRect().top);
            console.log('sp', scrollPos);
            if (document.body.getBoundingClientRect().top > scrollPos) {
                console.log('yes');
                setShow('none');
            } else {
                console.log('no');
                setShow('flex');
            }
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, []);

    useEffect(() => {
        const url = window.location.href.split('/');
        const target = url[url.length - 1].toLowerCase();
        const element = document.getElementById(target);
        element && element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    return (
        <div id="navBarWrapper">
            <div
                id="navbar"
                style={{
                    display: show,
                }}
            >
                <Link
                    to="/"
                    type="submit"
                    className="linkBtn"
                    onClick={() => {
                        const hero = document.getElementById('pageOne');
                        hero && hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                >
                    Home
                </Link>
                <Link
                    to="/demo"
                    type="submit"
                    className="linkBtn"
                    onClick={() => {
                        const hero = document.getElementById('demoCard');
                        hero && hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                >
                    Demo
                </Link>
                <Link
                    to="/about"
                    type="submit"
                    className="linkBtn"
                    onClick={() => {
                        const hero = document.getElementById('pageThree');
                        hero && hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                >
                    About
                </Link>
                <div
                    id="side-navbar"
                    style={{
                        display: show,
                    }}
                >
                    <Link to="/login" type="submit" className="linkBtn">
                        Login
                    </Link>
                    <Link to="/signup" type="submit" className="linkBtn">
                        Signup
                    </Link>
                </div>
            </div>
        </div>
    );
}
