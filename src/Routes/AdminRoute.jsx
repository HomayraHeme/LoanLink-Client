import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';



const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role !== "admin") {
        return <div className="text-center mt-10 text-red-600">Forbidden — Admins only!</div>;
    }

    return children;
};

export default AdminRoute;
