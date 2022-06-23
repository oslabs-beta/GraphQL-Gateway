import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

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

<<<<<<< HEAD
    const handleClick = () => {
        // eslint-disable-next-line no-console
        console.log(user);
=======
    const navigate = useNavigate();

    const switchForm = () => {
        navigate('/signup');
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        navigate('/dashboard');
        // console.log(user);
>>>>>>> dev
    };

    return (
        <div className="box">
            <Logo />
            <h1 className="text">Login</h1>

            <div className="form-wrapper">
                <input
                    className="email"
                    type="text"
                    onChange={handleChange}
                    name="email"
                    value={user.email}
                    placeholder="Type your email"
                />
                <input
                    className="password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={user.password}
                    placeholder="Type your password"
                />
                <br />
                <button className="formBtn" type="submit" onClick={handleClick}>
                    Login
                </button>
                <br />
                <span className="paragraph">
                    Not a member?
                    <button className="btn transferBtn" type="button" onClick={switchForm}>
                        Register here
                    </button>
                </span>
            </div>
        </div>
    );
}

export default Login;
