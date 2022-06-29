import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { setContext } from '../auth/AuthProvider';

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

const SIGNUP_MUTATION = gql`
    mutation signupMutation($email: String!, $password: String!) {
        signupMutation(email: $email, password: $password) {
            token
            email
            password
            projects
            id
        }
    }
`;

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

    const [signupMutation, { error, data }] = useMutation(SIGNUP_MUTATION);

    const handleClick = async (e: any, variables: ISState['user']) => {
        e.preventDefault();
        signupMutation({ variables });
        if (error) console.log(`Signup error, ${error}`);
        else {
            setContext(data, data.token);
            navigate('/dashboard');
        }
    };

    return (
        <div className="box">
            <h1 className="text">Signup</h1>

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
                    Register
                </button>
                <br />
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
