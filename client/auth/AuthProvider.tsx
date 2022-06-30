import React from 'react';

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

function setContext(user: UserContext, token: string) {
    authContext.email = user.email;
    authContext.password = user.password;
    authContext.authenticated = true;
    localStorage.setItem('session-token', token);
}

type MyComponentProps = React.PropsWithChildren<unknown>;

function AuthProvider({ children }: MyComponentProps) {
    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within an Auth provider');
    return context;
};

export { useAuth, AuthProvider, setContext };
