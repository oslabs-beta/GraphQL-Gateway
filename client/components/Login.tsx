import React from 'react';

export interface ISState {
    viewDashboard: any;
}

// eslint-disable-next-line react/function-component-definition
const Login: React.FC<ISState> = ({ viewDashboard }) => (
    <div className="app">
        <h1>Login</h1>
        <div className="login-box">
            <div className="form-wrapper">
                <input className="input" type="text" name="email" placeholder="enter email" />
                <input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="enter password"
                />
                <button className="btn" type="submit" onClick={viewDashboard}>
                    Login
                </button>
            </div>
        </div>
    </div>
);

export default Login;
