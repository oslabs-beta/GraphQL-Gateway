/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable default-case */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../public/styles.css';
import { useAuth } from '../auth/AuthProvider';

export default function Navbar() {
    const navigate = useNavigate();
    const { user, setUser, loading } = useAuth();

    const [show, setShow] = useState('flex');
    const scrollPos = useRef(window.scrollY);

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setUser(null);
        localStorage.removeItem('session-token');
        // TODO: send logout reqeust to end session
        navigate('/');
    };

    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > scrollPos.current) {
                setShow('none');
            } else {
                setShow('flex');
            }
            scrollPos.current = window.scrollY;
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
                {user && (
                    <Link to="/dashboard" type="submit" className="linkBtn">
                        Dashboard
                    </Link>
                )}
                <div
                    id="side-navbar"
                    style={{
                        display: show,
                    }}
                >
                    {user ? (
                        <Link to="/logout" type="submit" className="linkBtn" onClick={handleLogout}>
                            Logout
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" type="submit" className="linkBtn">
                                Login
                            </Link>
                            <Link to="/signup" type="submit" className="linkBtn">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
