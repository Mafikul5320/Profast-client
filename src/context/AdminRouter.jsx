import React from 'react';
import useAuth from '../Hooks/useAuth';
import useAdminFind from '../Hooks/useAdminFind';
import Loading from './Loading';
import { Navigate } from 'react-router';

const AdminRouter = ({ children }) => {

    const { User, loading } = useAuth();
    const { isLoading, user } = useAdminFind();
    if (loading || isLoading) {
        return <Loading></Loading>
    }
    if (!User && !User?.email || user?.role !== "admin") {
        return <Navigate to={'/forbidden'} />
    }

    return children
};

export default AdminRouter;