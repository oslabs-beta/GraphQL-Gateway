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
        <div className="box">
            <Logo />
            <h1 className="text">Signup</h1>

            <div className="form-wrapper">
                <input
                    className="email"
                    type="text"
                    onChange={handleChange}
                    name="email"
                    value={user.email}
                    placeholder="enter email"
                />
                <input
                    className="password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={user.password}
                    placeholder="enter password"
                />
                <br />
                <button className="formBtn" type="submit" onClick={handleClick}>
                    Signup
                </button>
                <span className="paragraph">
                    Already a member?
                    <button className="btn transferBtn" type="button" onClick={() => switchForm()}>
                        Login here
                    </button>
                </span>
                <span>
                    or sign in using your
                    <a
                        className="btn transferBtn"
                        // href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}
                        href="http://localhost:3000/auth"
                    >
                        GitHub
                    </a>
                    account
                </span>
            </div>
        </div>
    );
}

export default Signup;
