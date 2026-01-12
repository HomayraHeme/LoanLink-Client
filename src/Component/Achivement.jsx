 import React from "react";
 import { FaUserCheck, FaSmile, FaGlobeAsia, FaHandshake } from "react-icons/fa";
import { useTheme } from "../Theme/ThemeContext";

const Achievements = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-gray-900" : "bg-green-100";
  const headingColor = isDark ? "text-emerald-300" : "text-emerald-800";
  const cardBg = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";

  return (
    <section className={`${bgColor} py-10`}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className={`text-4xl font-black mb-12 ${headingColor}`}>
          Our Achievements
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            className={`p-6 rounded-lg shadow-md ${cardBg} ${textColor} hover:shadow-emerald-500/40 transition`}
          >
            <FaUserCheck
              className={`text-5xl mx-auto mb-3 ${
                isDark ? "text-emerald-400" : "text-emerald-700"
              }`}
            />
            <h3 className="text-4xl font-extrabold">5K+</h3>
            <p className="text-sm mt-1 text-gray-400 dark:text-gray-300">
              Loans Approved
            </p>
          </div>

          <div
            className={`p-6 rounded-lg shadow-md ${cardBg} ${textColor} hover:shadow-emerald-500/40 transition`}
          >
            <FaSmile
              className={`text-5xl mx-auto mb-3 ${
                isDark ? "text-emerald-400" : "text-emerald-700"
              }`}
            />
            <h3 className="text-4xl font-extrabold">98%</h3>
            <p className="text-sm mt-1 text-gray-400 dark:text-gray-300">
              Happy Clients
            </p>
          </div>

          <div
            className={`p-6 rounded-lg shadow-md ${cardBg} ${textColor} hover:shadow-emerald-500/40 transition`}
          >
            <FaGlobeAsia
              className={`text-5xl mx-auto mb-3 ${
                isDark ? "text-emerald-400" : "text-emerald-700"
              }`}
            />
            <h3 className="text-4xl font-extrabold">10+</h3>
            <p className="text-sm mt-1 text-gray-400 dark:text-gray-300">
              Cities Served
            </p>
          </div>

          <div
            className={`p-6 rounded-lg shadow-md ${cardBg} ${textColor} hover:shadow-emerald-500/40 transition`}
          >
            <FaHandshake
              className={`text-5xl mx-auto mb-3 ${
                isDark ? "text-emerald-400" : "text-emerald-700"
              }`}
            />
            <h3 className="text-4xl font-extrabold">20+</h3>
            <p className="text-sm mt-1 text-gray-400 dark:text-gray-300">
              Partners
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
