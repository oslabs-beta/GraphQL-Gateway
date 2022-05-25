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

    const navigate = useNavigate();

    const switchForm = () => {
        navigate('/signup');
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        navigate('/dashboard');
        // console.log(user);
    };

    return (
        <div className="App">
            <Logo />
            <h1>Login</h1>
            <div className="login-box">
                <div>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="email"
                        value={user.email}
                        placeholder="enter email"
                    />
                    <input
                        type="password"
                        onChange={handleChange}
                        name="password"
                        value={user.password}
                        placeholder="enter password"
                    />
                    <button type="submit" onClick={handleClick}>
                        Login
                    </button>
                    <div>If you do not have an account, click here:</div>
                    <button type="button" onClick={switchForm}>
                        Go back to signup form
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
