import React, { PropsWithChildren } from 'react';
import { useAuth } from '../auth/AuthProvider';

interface HeaderProps {
    children: any;
}

// function RequireAuth(): JSX.Element {
// eslint-disable-next-line react/function-component-definition
const RequireAuth: React.FC<PropsWithChildren<HeaderProps>> = ({ children }) => {
    // <div>{children}</div>

    const auth = useAuth();
    const location = useLocation();
    return auth?.authenticated ? children : <Navigate to="/" state={{ from: location }} replace />;
};

export default RequireAuth;
