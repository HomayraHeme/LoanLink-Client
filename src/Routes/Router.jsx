import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import AllLoans from "../Pages/AllLoans.jsx";
import AboutUs from "../Pages/AboutUs.jsx";
import ContactUs from "../Pages/ContactUs.jsx";

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
                }
            ]
    },
]);
