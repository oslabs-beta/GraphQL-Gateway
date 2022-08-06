import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../public/styles.css';
import { useAuth } from '../auth/AuthProvider';

export default function Navbar() {
    const navigate = useNavigate();
    const { user, setUser, loading } = useAuth();

    const [show, setShow] = useState('flex');
    const scrollPos = useRef(window.scrollY);

    const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setUser(null);
        localStorage.removeItem('session-token');
        navigate('/');
    };

    useEffect(() => {
        const url = window.location.href.split('/');
        const target = url[url.length - 1].toLowerCase();
        const element = document.getElementById(target);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                        if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                >
                    Home
                </Link>
                <Link
                    to="/demo"
                    type="submit"
                    className="linkBtn"
                    onClick={() => {
                        const hero = document.getElementById('pageTwo');
                        if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                        if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                >
                    About
                </Link>
                <Link to="/team" type="submit" className="linkBtn">
                    Team
                </Link>
                <div id="side-navbar" style={{ display: show }}>
                    {loading === false &&
                        (user === null ? (
                            <>
                                <Link to="/login" type="submit" className="linkBtn">
                                    Login
                                </Link>
                                <Link to="/signup" type="submit" className="linkBtn">
                                    Signup
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard" type="submit" className="linkBtn">
                                    Dashboard
                                </Link>
                                <button className="linkBtn" type="button" onClick={logout}>
                                    Logout
                                </button>
                            </>
                        ))}
                </div>
            </div>
        </div>
    );
}
