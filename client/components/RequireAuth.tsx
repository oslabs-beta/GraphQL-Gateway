import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

function RequireAuth(): JSX.Element {
    const auth = useAuth();
    const location = useLocation();
    return auth?.authenticated ? (
        <Navigate to="/dashboard" state={{ from: location }} replace />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;
