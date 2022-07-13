import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';

export default function GithubButton() {
    return (
        <>
            <a className="btn transferBtn" href="http://localhost:3000/auth">
                <button type="submit" id="github">
                    Sign In with Github
                </button>
            </a>
            <p>or</p>
        </>
    );
}
