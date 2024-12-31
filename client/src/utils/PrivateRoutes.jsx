import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => {
    const { auth } = useAuth();
    if (!auth.tokens || !auth.tokens.access || !auth.tokens.access.token) {
        return <Navigate to="/login" />;
    }
    console.log(auth);
    return <Outlet />;
};

export default PrivateRoutes;
