import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const AuthContext = React.createContext<UserContext | null>(null);
interface UserContext {
    email: string;
    password: string;
    authenticated: boolean;
    id: string;
}

const authContext: UserContext = {
    email: '',
    password: '',
    authenticated: false,
    id: '',
};

// checkAuth: User

const CHECK_AUTH_QUERY = gql`
    query checkAuthQuery {
        checkAuth {
            id
            email
            password
        }
    }
`;
function checkAuth() {
    const navigate = useNavigate();
    const { data, error } = useQuery(CHECK_AUTH_QUERY);
    if (error) return `Error! ${error.message}`;

    if (data.token) {
        console.log(data);
        authContext.authenticated = true;
    } else {
        authContext.authenticated = false;
        navigate('/');
    }
}

function setContext(user: UserContext, token?: string) {
    authContext.email = user.email;
    authContext.password = user.password;
    authContext.authenticated = true;
    if (token) localStorage.setItem('session-token', token);
}

type MyComponentProps = React.PropsWithChildren<unknown>;

function AuthProvider({ children }: MyComponentProps) {
    // const [checkAuth] = useQuery(CHECK_AUTH_QUERY, {
    //     onComplete: (data) => {
    //         setContext(data.checkAuth);
    //     },
    // });
    // checkAuth();
    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within an Auth provider');
    return context;
};

export { useAuth, AuthProvider, setContext, checkAuth };
