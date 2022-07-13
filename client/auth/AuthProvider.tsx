import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

interface UserContext {
    email?: string;
    id?: string;
}

interface AuthContextType {
    user: UserContext | null;
    // better typed but erroring --> setUser: React.Dispatch<React.SetStateAction<boolean>> | null
    setUser: any;
    loading: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
    user: null,
    setUser: '',
    loading: true,
});

const CHECK_AUTH_QUERY = gql`
    query checkAuthQuery {
        checkAuth {
            id
            email
        }
    }
`;

function AuthProvider({ children }: React.PropsWithChildren<unknown>) {
    const [user, setUser] = useState<UserContext | null>(null);
    const [loading, setLoading] = useState(true);

    // query to the server to check if there is a valid session and update state accordingly
    useQuery(CHECK_AUTH_QUERY, {
        onCompleted: (data: any) => {
            if (data.checkAuth === null) {
                // localStorage.removeItem('session-token');
            } else {
                setUser({
                    email: data.checkAuth.email,
                    id: data.checkAuth.id,
                });
            }
            setLoading(false);
        },
        onError: (error) => {
            console.log(error);
            // localStorage.removeItem('session-token');
            setLoading(false);
        },
    });

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const value: AuthContextType = { user, setUser, loading };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within an Auth provider');
    return context;
}

export { useAuth, AuthProvider };
