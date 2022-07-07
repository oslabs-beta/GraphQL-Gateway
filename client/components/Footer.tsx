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
                    // eslint-disable-next-line no-nested-ternary
                    pathname === '/signup' ? '#fff' : pathname === '/login' ? '#fff' : '#092173',
                color:
                    // eslint-disable-next-line no-nested-ternary
                    pathname === '/signup' ? '#092173' : pathname === '/login' ? '#092173' : '#fff',
            }}
        >
            <div>
                <h4>Copyright © Team Cat-Snake 2022</h4>
            </div>
        </div>
    );
}
