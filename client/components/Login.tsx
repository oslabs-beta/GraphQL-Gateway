import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ISState {
    user: {
        login: boolean;
        email: string;
        password: string;
    };
}

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState<ISState['user']>({
        login: true,
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const switchForm = () => {
        navigate('/signup');
    };

    const handleClick = async (e: any) => {
        e.preventDefault();
        setUser({
            ...user,
            login: !user.login,
        });
        navigate('/dashboard');
    };

    return (
        <div className="box">
            <h1 className="text">Login</h1>

            <div className="form-wrapper">
                <input
                    className="input"
                    type="text"
                    onChange={handleChange}
                    name="email"
                    value={user.email}
                    placeholder="Type your email"
                />
                <input
                    className="input"
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
