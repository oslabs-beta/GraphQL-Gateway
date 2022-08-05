/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../public/styles.css';

export default function Footer() {
    const { pathname } = useLocation();
    return (
        <div
            id="footer"
            style={{
                backgroundColor:
                    pathname === '/signup'
                        ? '#fff'
                        : pathname === '/login'
                            ? '#fff'
                            : pathname === '/dashboard'
                                ? '#fff'
                                : '#181818',
                color:
                    // eslint-disable-next-line no-nested-ternary
                    pathname === '/signup'
                        ? '#181818'
                        : pathname === '/login'
                            ? '#181818'
                            : pathname === '/dashboard'
                                ? '#181818'
                                : '#fff',
            }}
        >
            <div>
                <h4>Copyright © Team Cat-Snake 2022</h4>
            </div>
        </div>
    );
}
