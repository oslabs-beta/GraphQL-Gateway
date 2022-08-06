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
                        ? '#2785d7ca'
                        : pathname === '/login'
                            ? '#2785d7ca'
                            : pathname === '/dashboard'
                                ? '#fff'
                                : '#2785d7ca',
                color:
                    // eslint-disable-next-line no-nested-ternary
                    pathname === '/signup'
                        ? '#fff'
                        : pathname === '/login'
                            ? '#fff'
                            : pathname === '/dashboard'
                                ? '#2785d7ca'
                                : '#fff',
            }}
        >
            <div>
                <h4>GraphQLGateway</h4>
            </div>
        </div>
    );
}
