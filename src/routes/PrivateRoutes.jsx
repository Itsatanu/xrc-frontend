import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PageLoading from '../asset/pageLoading/PageLoading';
const PrivateRoutes = ({ requiredRoles }) => {
    let [isLoading, setIsLoading] = useState(true)
    let { isAuthenticated, user, vefifyAuth } = useAuth()

    useEffect(() => {
        const validateAccess = async () => {
            await vefifyAuth();
            setIsLoading(false);
        };

        validateAccess();
    }, [])


    if (isLoading) {
        return <PageLoading />;
    }
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!requiredRoles.includes(user?.data?.role)) {
        
        return <Navigate to="/unauthorised" />;
    }
    return <Outlet />;
};

export default PrivateRoutes;
