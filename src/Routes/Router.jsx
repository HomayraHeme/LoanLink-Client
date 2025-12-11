import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import AllLoans from "../Pages/AllLoans.jsx";
import AboutUs from "../Pages/AboutUs.jsx";
import ContactUs from "../Pages/ContactUs.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ViewDetails from "../Pages/ViewDetails.jsx";
import LoanApplicationForm from "../Pages/LoanApplicationForm.jsx";
import MyLoans from "../Pages/Dashboard/MyLoans.jsx";
import DashboardLayout from "../Layouts/DashboardLayout.jsx";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess.jsx";
import { Component } from "react";
import ProfilePage from "../Pages/Dashboard/ProfilePage.jsx";
import ManageUsers from "../Pages/Dashboard/ManageUsers.jsx";
import ManageAllLoans from "../Pages/Dashboard/ManageAllLoans.jsx";
import ManageLoanApplications from "../Pages/Dashboard/ManageLoanApplication.jsx";
import AddLoan from "../Pages/Dashboard/AddLoans";
import AddLoans from "../Pages/Dashboard/AddLoans";
import ManageLoans from "../Pages/Dashboard/ManageLoans.jsx";
import PendingLoans from "../Pages/Dashboard/PendingLoans.jsx";
import ApprovedLoans from "../Pages/Dashboard/ApprovedLoans.jsx";
import AdminRoute from "./AdminRoute.jsx";
import ManagerRoute from "./ManagerRoute.jsx";
import BorrowerRoute from "./BorrowerRoute.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children:
            [
                {
                    index: true,
                    Component: Home,
                },
                {
                    path: "/all-loans",
                    Component: AllLoans
                },
                {
                    path: "about",
                    Component: AboutUs
                },
                {
                    path: "contact",
                    Component: ContactUs
                },
                {
                    path: '/login',
                    Component: Login
                },
                {
                    path: '/register',
                    Component: Register
                },
                {
                    path: '/view-details/:id',
                    element:
                        <PrivateRoute>
                            <ViewDetails></ViewDetails>
                        </PrivateRoute>

                },
                {
                    path: '/apply-loan/:id',
                    element:
                        <PrivateRoute>
                            <LoanApplicationForm></LoanApplicationForm>
                        </PrivateRoute>
                }
            ]
    },


    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'my-loans',
                element: <BorrowerRoute><MyLoans></MyLoans></BorrowerRoute>

            },
            {
                path: 'payment-success',
                Component: <BorrowerRoute><PaymentSuccess></PaymentSuccess></BorrowerRoute>
            },
            {
                path: 'profile',
                element: <ProfilePage></ProfilePage>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'manage-all-loans',
                element: <AdminRoute><ManageAllLoans></ManageAllLoans></AdminRoute>
            },
            {
                path: 'manage-loan-applications',
                element: <AdminRoute><ManageLoanApplications></ManageLoanApplications></AdminRoute>
            },
            {
                path: 'add-loan',
                element: <ManagerRoute><AddLoans></AddLoans></ManagerRoute>
            },
            {
                path: 'manage-loans',
                element: <ManagerRoute><ManageLoans></ManageLoans></ManagerRoute>
            },
            {
                path: 'pending-loans',
                element: <ManagerRoute><PendingLoans></PendingLoans></ManagerRoute>
            },
            {
                path: 'approved-loans',
                element: <ManagerRoute><ApprovedLoans></ApprovedLoans></ManagerRoute>
            },
            {
                path: 'profile',
                element: <ProfilePage></ProfilePage>
            },

        ]
    }


]);


