import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const ManagerRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = useRole();


    if (loading || !user || roleLoading) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }



    if (role !== "manager") {
        return <div className="text-center mt-10 text-red-600">Forbidden — Managers only!</div>;
    }

    return children;
};

export default ManagerRoute;