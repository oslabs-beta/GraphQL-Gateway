import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../auth/AuthProvider';

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
const { setUser: setAuth } = useAuth();

const SIGNUP_MUTATION = gql`
    mutation signupMutation($user: UserInput!) {
        signup(user: $user) {
            token
            email
            password
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

    const [signupMutation] = useMutation(SIGNUP_MUTATION, {
        onCompleted: (data) => {
            setAuth({
                email: data.login.email,
                id: data.login.id,
            });
            localStorage.setItem('session-token', data.login.token);
            navigate('/dashboard');
        },
        onError: (error) => console.log(error),
    });

    const handleClick = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        userData: ISState['user']
    ) => {
        e.preventDefault();
        signupMutation({ variables: { user: userData } });
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
                    <Link to="/login" className="btn transferBtn" type="button">
                        Login here
                    </Link>
                </span>
                {/* <span>
                    or sign in using your
                    <a
                        className="btn transferBtn"
                        // href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}
                        href="http://localhost:3000/auth"
                    >
                        GitHub
                    </a>
                    account
                </span> */}
            </div>
        </div>
    );
}

export default Signup;
