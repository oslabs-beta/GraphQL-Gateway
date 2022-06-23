import React from 'react';

interface User {
    email: string;
    password: string;
    authenticated: boolean;
}

const AuthContext = React.createContext<User | null>(null);

// mock data
// TODO: change this with real auth data

const authContext: User = {
    email: 'test@test.com',
    password: 'test123',
    authenticated: true,
};

type MyComponentProps = React.PropsWithChildren<unknown>;

function AuthProvider({ children }: MyComponentProps) {
    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within an Auth provider');
    return context;
};

export { useAuth, AuthProvider };
