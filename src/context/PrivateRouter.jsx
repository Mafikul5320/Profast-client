import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router';
import Loading from './Loading';

const PrivateRouter = ({ children }) => {
    const { User, loading } = use(AuthContext);
    if (loading) {
        return <Loading></Loading>
    }

    if (!User && !User?.email) {
        return <Navigate to={'/login'} />
    }


    return children
};

export default PrivateRouter;