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
                                : '#092173',
                color:
                    // eslint-disable-next-line no-nested-ternary
                    pathname === '/signup'
                        ? '#092173'
                        : pathname === '/login'
                            ? '#092173'
                            : pathname === '/dashboard'
                                ? '#092173'
                                : '#fff',
            }}
        >
            <div>
                <h4>Copyright © Team Cat-Snake 2022</h4>
            </div>
        </div>
    );
}
