import { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PageLoading from '../asset/pageLoading/PageLoading';
const ValidRoutes = ({ requiredRoles,roleComponent }) => {
    let [isLoading, setIsLoading] = useState(true)
    let { isAuthenticated, user, vefifyAuth } = useAuth()
    let role=user?.data?.role
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

    if (!requiredRoles.includes(role)) {
        
        return <Navigate to="/unauthorised" />;
    }

    return <>{roleComponent[role]}</>;};

export default ValidRoutes;
