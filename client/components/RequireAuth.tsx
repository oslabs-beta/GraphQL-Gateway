import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

function RequireAuth({ children }: React.PropsWithChildren<unknown>) {
    const { user, loading } = useAuth();
    // if authentication is still being confirmed, return a loading component
    // TODO: replace this with a loading component
    if (loading) return <>Loading...</>;
    const location = useLocation();
    return user ? children : <Navigate to="/" state={{ from: location }} replace />;
}

export default RequireAuth;
