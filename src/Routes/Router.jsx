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
                Component: MyLoans

            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'profile',
                Component: ProfilePage
            },
            {
                path: 'manage-users',
                Component: ManageUsers
            },
            {
                path: 'manage-all-loans',
                Component: ManageAllLoans
            },
            {
                path: 'manage-loan-applications',
                Component: ManageLoanApplications
            },
            {
                path: 'add-loan',
                Component: AddLoans
            },
            {
                path: 'manage-loans',
                Component: ManageLoans
            }

        ]
    }


]);


