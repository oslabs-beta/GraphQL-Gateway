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
            password
        }
    }
`;

function AuthProvider({ children }: React.PropsWithChildren<unknown>) {
    const [user, setUser] = useState<UserContext | null>(null);
    const [loading, setLoading] = useState(true);

    // query the server to check if there is a valid session
    useEffect(() => {
        const { data } = useQuery(CHECK_AUTH_QUERY);
        if (data && data.checkAuth !== null) {
            setLoading(false);
            setUser({
                email: data.checkAuth.email,
                id: data.checkAuth.id,
            });
        }
    }, []);

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
