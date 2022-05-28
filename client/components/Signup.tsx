import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export interface ISState {
    user: {
        email: string;
        password: string;
    };
    style: {
        loginBox: string;
        signupBox: string;
    };
}

function Signup() {
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

    const navigate = useNavigate();

    const switchForm = () => {
        navigate('/login');
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        navigate('/dashboard');
        // console.log(user);
    };

    return (
        <div className="app">
            <Logo />
            <h1>Signup</h1>
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
                        Signup
                    </button>
                    <div>If you already have account, click here:</div>
                    <button type="button" onClick={() => switchForm()}>
                        Login instead
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
