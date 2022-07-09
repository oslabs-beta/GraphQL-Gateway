import React from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';

export default function GithubButton() {
    const handleClick = () => {
        axios
            .get('/auth', {
                headers: { 'Access-Control-Allow-Origin': '*' },
            })
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };

    return (
        <>
            <button type="submit" id="github" onClick={handleClick}>
                Sign In with Github
            </button>
            <p>or</p>
        </>
    );
}
