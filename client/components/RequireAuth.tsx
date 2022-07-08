import React, { PropsWithChildren } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import Loading from './Loading';

function RequireAuth({ children }: PropsWithChildren<unknown>) {
    const { user, loading } = useAuth();
    const location = useLocation();
    // if authentication is still being confirmed, return a loading component
    // TODO: replace this with a loading component
    if (loading) return <Loading />;
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return user ? <>{children}</> : <Navigate to="/" state={{ from: location }} replace />;
}

export default RequireAuth;
