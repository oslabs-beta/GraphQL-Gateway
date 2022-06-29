import React from 'react';

const AuthContext = React.createContext<UserContext | null>(null);
interface UserContext {
    email: string;
    password: string;
    authenticated: Boolean;
    id: String;
    projects: [];
}

const authContext: UserContext = {
    email: '',
    password: '',
    authenticated: false,
    id: '',
    projects: [],
};

function setContext(user: UserContext, token: string) {
    authContext.email = user.email;
    authContext.password = user.password;
    authContext.authenticated = true;
    localStorage.setItem('session-token', token);
}

type MyComponentProps = React.PropsWithChildren<{}>;

function AuthProvider({ children }: MyComponentProps) {
    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within an Auth provider');
    return context;
};

export { useAuth, AuthProvider, setContext };
