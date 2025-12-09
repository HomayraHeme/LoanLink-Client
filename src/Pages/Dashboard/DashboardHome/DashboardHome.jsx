import React from 'react';
import useRole from '../../../Hooks/useRole';
import AdminDashboard from './AdminDashboard';


const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <p>loading..........</p>
    }
    if (role === 'Admin') {
        return <AdminDashboard></AdminDashboard>
    }
    else if (role === 'manager') {
        return <ManagerDashboard></ManagerDashboard>
    }
    else {
        return <UserDashboard></UserDashboard>
    }

};

export default DashboardHome;