import React, { useState } from 'react';

export interface ISState {
    user: {
        email: string;
        password: string;
    };
}

function Login() {
    const [user, setUser] = useState<ISState['user']>({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = () => {
        console.log(user);
    };

    return (
        <div className="app">
            <h1>Login</h1>
            <div className="login-box">
                <div className="form-wrapper">
                    <input
                        className="input"
                        type="text"
                        onChange={handleChange}
                        name="email"
                        value={user.email}
                        placeholder="enter email"
                    />
                    <input
                        className="input"
                        type="password"
                        onChange={handleChange}
                        name="password"
                        value={user.password}
                        placeholder="enter password"
                    />
                    <button className="btn" type="submit" onClick={handleClick}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
