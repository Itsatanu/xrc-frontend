import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'
const PublicRestrictedRoutes = ({ element, requiredRole, ...rest }) => {
    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return <Route {...rest} element={element} />;
};

export default PublicRestrictedRoutes;
