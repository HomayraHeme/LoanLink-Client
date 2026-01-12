import React from "react";
import logoImg from "../../assets/loanlogo-removebg-preview.png";
import { useTheme } from "../../Theme/ThemeContext";
import Logo from "./Logo";
import { NavLink } from "react-router";

const Footer = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // 🎨 Theme-based color logic
    const bgColor = isDark
        ? "bg-gradient-to-r from-gray-950 via-gray-900 to-emerald-950"
        : "bg-gradient-to-r from-emerald-700 via-green-600 to-lime-400";

    const textColor = "text-white";
    const subText = isDark ? "text-gray-400" : "text-white/90";
    const hoverColor = isDark ? "hover:text-lime-300" : "hover:text-white";
    const borderTop = isDark ? "border-t border-gray-700" : "border-t border-white/20";

    return (
        <footer
            className={`${bgColor} ${textColor} transition-colors duration-500 px-6 sm:px-10 py-12`}
        >
            {/*  Main Grid */}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 text-center sm:text-left">

                {/* 1 Logo & Info */}
                <aside className=" items-center gap-4 justify-center sm:justify-start">
                    <div className="flex items-center justify-center sm:justify-start mb-3">
                        <Logo></Logo>
                    </div>
                    <div>

                        <p className={`text-sm sm:text-base ${subText}`}>
                            Providing reliable loans and financial services.
                        </p>
                    </div>
                </aside>

                {/* 2Services */}
                <nav className="flex flex-col items-center sm:items-start space-y-2">
                    <h6 className="font-semibold text-base sm:text-lg mb-2">Services</h6>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Loan Application</a>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Credit Check</a>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Financial Tips</a>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Investment Plans</a>
                </nav>

                {/* 3 Contact */}
<nav className="flex flex-col items-center sm:items-start space-y-2">
  <h6 className="font-semibold text-base sm:text-lg mb-2">Contact</h6>
  <p className={`${subText}`}>📞 +880 1878654211</p>
  <p className={`${subText}`}>✉️ heme5674@gmail.com</p>
  <p className={`${subText}`}>🏢 Dhaka, Bangladesh</p>
 </nav>


                {/* 4 Legal */}
                <nav className="flex flex-col items-center sm:items-start space-y-2">
  <h6 className="font-semibold text-base sm:text-lg mb-2">Quick Links</h6>
  <NavLink to="/" className={`link link-hover ${hoverColor} ${subText}`}>Home</NavLink>
  <NavLink to="/all-loans" className={`link link-hover ${hoverColor} ${subText}`}>All Loans</NavLink>
  <NavLink to="/about" className={`link link-hover ${hoverColor} ${subText}`}>About Us</NavLink>
  <NavLink to="/contact" className={`link link-hover ${hoverColor} ${subText}`}>Contact</NavLink>
</nav>
            </div>

            {/*  Copyright Section */}
            <div
                className={`mt-10 pt-5 border-t ${borderTop} text-center text-sm sm:text-base ${subText}`}
            >
                © {new Date().getFullYear()} <span className="font-semibold">LoanLink</span>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
