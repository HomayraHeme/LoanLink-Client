import React from "react";
import logoImg from "../../assets/loanlogo-removebg-preview.png";
import { useTheme } from "../../Theme/ThemeContext";

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
            className={`footer p-8 sm:p-10 ${bgColor} ${textColor} transition-colors duration-500`}
        >
            <div
                className="
          max-w-7xl mx-auto w-full
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-8 md:gap-10
          place-items-start
        "
            >
                {/* 1️⃣ Logo & Info */}
                <aside className="flex flex-col sm:flex-row sm:items-center gap-4 text-center sm:text-left">
                    <img
                        src={logoImg}
                        alt="LoanLink"
                        className="h-12 w-auto rounded-md mx-auto sm:mx-0"
                    />
                    <div>
                        <p className="font-bold text-lg">LoanLink</p>
                        <p className={`text-sm ${subText}`}>
                            Providing reliable loans and financial services
                        </p>
                    </div>
                </aside>

                {/* 2️⃣ Services */}
                <nav className="flex flex-col items-center sm:items-start space-y-2">
                    <h6 className="footer-title font-semibold text-base">Services</h6>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Loan Application</a>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Credit Check</a>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Financial Advice</a>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Investment Plans</a>
                </nav>

                {/* 3️⃣ Company */}
                <nav className="flex flex-col items-center sm:items-start space-y-2">
                    <h6 className="footer-title font-semibold text-base">Company</h6>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>About us</a>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Careers</a>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Our Team</a>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Press kit</a>
                </nav>

                {/* 4️⃣ Legal */}
                <nav className="flex flex-col items-center sm:items-start space-y-2">
                    <h6 className="footer-title font-semibold text-base">Legal</h6>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Terms of use</a>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Privacy policy</a>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Cookie policy</a>
                    <a className={`link link-hover ${hoverColor} ${subText}`}>Accessibility</a>
                </nav>
            </div>

            {/* Copyright section */}
            <div
                className={`mt-10 pt-4 pl-10 md:pl-25 lg:pl-120  text-sm ${borderTop} ${subText} w-full`}
            >
                © {new Date().getFullYear()} LoanLink. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
