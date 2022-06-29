import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { setContext } from '../auth/AuthProvider';

export interface ISState {
    user: {
        email: string;
        password: string;
    };
}

const LOGIN_MUTATION = gql`
    mutation loginMutation($email: String!, $password: String!) {
        loginMutation(email: $email, password: $password) {
            token
            email
            password
            projects
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

    const [loginMutation, { data, error }] = useMutation(LOGIN_MUTATION);

    const handleClick = async (e: any, variables: ISState['user']) => {
        e.preventDefault();

        loginMutation({ variables });
        if (error) console.log('login error', error);
        else {
            // todo: check format of data coming back from server
            console.log('login data', data);
            setContext(data, data.token);
            navigate('/dashboard');
        }
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
