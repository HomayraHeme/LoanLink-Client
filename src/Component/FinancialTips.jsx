import React from "react";
 import { FaPiggyBank, FaChartLine, FaCreditCard } from "react-icons/fa";
import { useTheme } from "../Theme/ThemeContext";

const FinancialTips = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-gray-900" : "bg-green-100";
  const cardBg = isDark ? "bg-gray-800" : "bg-white";
  const headingColor = isDark ? "text-emerald-300" : "text-emerald-800";
  const textColor = isDark ? "text-white" : "text-gray-900";

  return (
    <section className={`${bgColor} py-16`}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className={`text-4xl font-black mb-12 ${headingColor}`}>
          Financial Tips & Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className={`p-6 rounded-lg shadow-md ${cardBg} ${textColor} hover:shadow-emerald-500/40 transition`}
          >
            <FaChartLine
              className={`text-5xl mx-auto mb-3 ${
                isDark ? "text-emerald-400" : "text-emerald-700"
              }`}
            />
            <h3 className="text-xl font-semibold mb-2">
              Improve Your Credit Score
            </h3>
            <p className="text-sm mb-3 text-gray-400 dark:text-gray-300">
              Learn how to strengthen your financial profile and increase your
              approval chances.
            </p>
             
          </div>

          <div
            className={`p-6 rounded-lg shadow-md ${cardBg} ${textColor} hover:shadow-emerald-500/40 transition`}
          >
            <FaPiggyBank
              className={`text-5xl mx-auto mb-3 ${
                isDark ? "text-emerald-400" : "text-emerald-700"
              }`}
            />
            <h3 className="text-xl font-semibold mb-2">
              Smart Budgeting Basics
            </h3>
            <p className="text-sm mb-3 text-gray-400 dark:text-gray-300">
              Simple steps to manage your monthly expenses and save effectively.
            </p>
            
          </div>

          <div
            className={`p-6 rounded-lg shadow-md ${cardBg} ${textColor} hover:shadow-emerald-500/40 transition`}
          >
            <FaCreditCard
              className={`text-5xl mx-auto mb-3 ${
                isDark ? "text-emerald-400" : "text-emerald-700"
              }`}
            />
            <h3 className="text-xl font-semibold mb-2">
              Choosing the Right Loan
            </h3>
            <p className="text-sm mb-3 text-gray-400 dark:text-gray-300">
              Understand loan types and pick what fits your financial goals
              best.
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialTips;
