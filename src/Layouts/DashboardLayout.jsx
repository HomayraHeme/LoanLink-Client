import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { FaHome, FaUsers, FaChartLine, FaBars, FaTimes, FaRegCreditCard, FaUser } from "react-icons/fa";
import { useTheme } from "../Theme/ThemeContext";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const DashboardLayout = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    return (
        <div
            className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? "bg-gray-900 text-gray-100" : "bg-green-100 text-gray-900"
                }`}
        >
            {/* 🔝 Navbar */}
            <Navbar />

            {/* 🧭 Main Dashboard Area */}
            <div className="flex flex-1">
                {/* Sidebar / Drawer */}
                <aside
                    className={`relative h-full p-4 border-r transition-all duration-300 flex flex-col ${isDark
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-300 bg-white shadow-sm"
                        } ${isDrawerOpen ? "w-60 is-drawer-open" : "w-20 is-drawer-close"}`}
                >
                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                        className={`absolute top-4 right-[-12px] z-10 p-2 rounded-full shadow-md transition ${isDark
                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                            : "bg-white hover:bg-gray-100 text-gray-800"
                            }`}
                    >
                        {isDrawerOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-3 mt-10">
                        {/* NavLink - Home */}
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition ${isActive
                                    ? isDark
                                        ? "bg-gray-700 text-white"
                                        : "bg-gray-200 text-gray-900"
                                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`
                            }
                        >
                            <FaHome className="text-lg" />
                            {isDrawerOpen && <span>Home</span>}
                        </NavLink>

                        {/* NavLink - My Loans */}
                        <NavLink
                            to="/dashboard/my-loans"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition ${isActive
                                    ? isDark
                                        ? "bg-gray-700 text-white"
                                        : "bg-gray-200 text-gray-900"
                                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`
                            }
                        >
                            <FaRegCreditCard
                                className="text-lg" />
                            {isDrawerOpen && <span>My Loans</span>}
                        </NavLink>

                        {/* NavLink - Reports */}
                        <NavLink
                            to="/dashboard/profile"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition ${isActive
                                    ? isDark
                                        ? "bg-gray-700 text-white"
                                        : "bg-gray-200 text-gray-900"
                                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`
                            }
                        >
                            <FaUser className="text-lg" />
                            {isDrawerOpen && <span>My Profile</span>}
                        </NavLink>
                    </nav>
                </aside>

                {/* Content Area */}
                <main className="flex-1 p-6 overflow-y-auto transition-all duration-300">
                    <Outlet /> {/* Routes render here */}
                </main>
            </div>

            {/* 🔚 Footer */}
            <Footer />
        </div>
    );
};

export default DashboardLayout;
