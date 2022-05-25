import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import '../public/styles.css';

export interface ISState {
    style: {
        loginBox: string;
        signupBox: string;
        dashboard: string;
    };
}

// const GITHUB_CLIENT_ID = 'fef59d869191d88d4bc9';
// const gitHubRedirectURL = 'http://localhost:3000/api/auth/github';
// const path = '/';

function App() {
    const [style, setStyle] = useState<ISState['style']>({
        loginBox: 'none',
        signupBox: 'block',
        dashboard: 'none',
    });

    const setToggle = () => {
        if (style.loginBox === 'none') {
            setStyle({
                ...style,
                loginBox: 'block',
                signupBox: 'none',
            });
        } else {
            setStyle({
                ...style,
                loginBox: 'none',
                signupBox: 'block',
            });
        }
    };

    const viewDashboard = () => {
        if (style.dashboard === 'none') {
            setStyle({
                ...style,
                loginBox: 'none',
                signupBox: 'none',
                dashboard: 'block',
            });
        } else {
            setStyle({
                ...style,
                loginBox: 'none',
                signupBox: 'block',
                dashboard: 'none',
            });
        }
    };

    return (
        <div>
            <div id="navbar">
                <div
                    tabIndex={0}
                    role="button"
                    onKeyPress={viewDashboard}
                    onClick={() => viewDashboard()}
                    className="linkBtn"
                >
                    Dashboard
                </div>
                <div className="linkBtn">Link</div>
                <div className="linkBtn">Link</div>
                <div className="linkBtn">Link</div>
            </div>
            <div id="main">
                <div className="box" style={{ display: style.signupBox }}>
                    <div>
                        <Signup />
                    </div>
                    <br />
                    <div>
                        <span className="paragraph">If you are already registered, click</span>
                        <button
                            className="btn transferBtn"
                            type="button"
                            onClick={() => setToggle()}
                        >
                            here
                        </button>
                        <span>
                            or sign in using your
                            <a
                                // href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}
                                href="http://localhost:3000/auth"
                            >
                                github
                            </a>
                            account
                        </span>
                    </div>
                </div>

                <div className="box" style={{ display: style.loginBox }}>
                    <div>
                        <Login />
                    </div>
                    <br />
                    <div>
                        <span className="paragraph">Click</span>
                        <button
                            className="btn transferBtn"
                            type="button"
                            onClick={() => setToggle()}
                        >
                            here
                        </button>
                        <span className="paragraph">to go back to signup page</span>
                    </div>
                </div>
            </div>
            <div className="dashboard" style={{ display: style.dashboard }}>
                <Dashboard />
            </div>
            <div id="footer">
                <div>
                    <h4>Copyright © Team Cat-Snake 2022</h4>
                </div>
            </div>
        </div>
    );
}

export default App;
