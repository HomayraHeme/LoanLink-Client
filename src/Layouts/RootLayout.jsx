import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer';
import Navbar from '../Pages/Shared/Navbar';
import { useTheme } from '../Theme/ThemeContext';

const RootLayout = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Page background color
    const bgColor = isDark ? 'bg-gray-900' : 'bg-green-100';
    const textColor = isDark ? 'text-gray-100' : 'text-gray-900';

    return (
        <div className={`${bgColor} ${textColor} min-h-screen transition-colors duration-500`}>
            <Navbar />
            <main className="transition-colors duration-500">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;
