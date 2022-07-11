import React from 'react';
import axios from 'axios';

export default function GithubButton() {
    const handleClick = () => {
        axios
            .get('http://localhost:3000/auth', {
                headers: {
                    // 'Access-Control-Allow-Origin': '*',
                    // Accept: 'text/html; charset=utf-8',
                    // withCredentials: false,
                    // Origin: 'https://github.com',
                },
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
            <a
                className="btn transferBtn"
                // href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}
                href="http://localhost:3000/auth"
            >
                GitHub github{' '}
            </a>
        </>
    );
}
