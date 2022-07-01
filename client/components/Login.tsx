import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { setAuthContext } from '../auth/AuthProvider';

export interface ISState {
    user: {
        email: string;
        password: string;
    };
}

const LOGIN_MUTATION = gql`
    mutation loginMutation($user: UserInput!) {
        login(user: $user) {
            token
            email
            password
            id
        }
    }
`;

function Login() {
    const navigate = useNavigate();
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

    const switchForm = () => {
        navigate('/signup');
    };

    const [loginMutation] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            setAuthContext(data.login, data.login.token);
            navigate('/dashboard');
        },
        onError: (error) => console.log(error),
    });

    const handleClick = async (e: any, userData: ISState['user']) => {
        e.preventDefault();
        loginMutation({ variables: { user: userData } });
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
                <button className="formBtn" type="submit" onClick={(e) => handleClick(e, user)}>
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
