import React from 'react';
import { gql, useQuery } from '@apollo/client';

interface UserContext {
    email: string;
    password: string;
    authenticated: boolean;
    id: string;
}

type MyComponentProps = React.PropsWithChildren<unknown>;

const AuthContext = React.createContext<UserContext | null>(null);

const authContext: UserContext = {
    email: '',
    password: '',
    authenticated: false,
    id: '',
};

function setContext(user: UserContext, token?: string) {
    authContext.email = user.email;
    authContext.password = user.password;
    authContext.authenticated = true;
    if (token) localStorage.setItem('session-token', token);
}

const CHECK_AUTH_QUERY = gql`
    query checkAuthQuery {
        checkAuth {
            id
            email
            password
        }
    }
`;

function AuthProvider({ children }: MyComponentProps) {
    const { data } = useQuery(CHECK_AUTH_QUERY);
    if (data.checkAuth !== null) {
        setContext(data.checkAuth);
    }
    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within an Auth provider');
    return context;
};

export { useAuth, AuthProvider, setContext };
