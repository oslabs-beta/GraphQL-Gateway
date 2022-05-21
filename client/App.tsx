import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';

export interface ISState {
    style: {
        loginBox: string;
        signupBox: string;
    };
}

function App() {
    const [style, setStyle] = useState<ISState['style']>({
        loginBox: 'none',
        signupBox: 'block',
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

    return (
        <div>
            <h1>Welcome Guest!</h1>
            <div style={{ display: style.signupBox }}>
                <h3>Please signup</h3>

                <div>
                    <Signup />
                </div>
                <div>If you already have account, click here:</div>
                <button type="button" onClick={() => setToggle()}>
                    Login instead
                </button>
            </div>

            <div style={{ display: style.loginBox }}>
                <h3>Please login</h3>
                <div>
                    <Login />
                </div>
                <div>If you do not have an account, click here:</div>
                <button type="button" onClick={() => setToggle()}>
                    Go back to signup form
                </button>
            </div>
        </div>
    );
}

export default App;
