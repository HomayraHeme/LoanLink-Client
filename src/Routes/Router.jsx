import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import AllLoans from "../Pages/AllLoans.jsx";

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
                }
            ]
    },
]);
