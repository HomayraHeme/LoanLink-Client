import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../Theme/ThemeContext";
import useAxios from "../Hooks/useAxios";

const AvailableLoans = () => {
    const axiosInstance = useAxios();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Fetch loans using TanStack Query v5
    const { data: loans = [], isLoading, isError } = useQuery({
        queryKey: ["loans"],
        queryFn: async () => {
            const res = await axiosInstance.get("/loans");
            return res.data;
        },
    });

    const headingColor = isDark ? 'text-emerald-300' : 'text-emerald-800';

    if (isLoading) return <p className="text-center mt-10">Loading loans...</p>;
    if (isError) return <p className="text-center mt-10">Error fetching loans.</p>;

    // Limit to 6 loans
    const displayedLoans = loans.slice(0, 6);

    return (
        <div>
            <div>
                <h3 className={`text-5xl font-black text-center ${headingColor}`}>Available Loans</h3>
            </div>
            <div
                className={`w-11/12 grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto py-10 px-4 ${isDark ? "bg-gray-900 text-white" : "bg-green-100 text-gray-900"
                    }`}
            >
                {displayedLoans.map((loan) => (
                    <div
                        key={loan._id}
                        className={`rounded-lg shadow-lg p-4 transition-transform duration-300 hover:scale-105 ${isDark ? "bg-gray-800" : "bg-white"
                            }`}
                    >
                        <img
                            src={loan.image}
                            alt={loan.title}
                            className="w-full h-40 object-cover rounded-md"
                        />
                        <h3 className="text-lg font-bold mt-3">{loan.title}</h3>
                        <p className="text-sm mt-2">{loan.short_description}</p>
                        <p className="font-semibold mt-2">
                            Max Loan: ${loan.max_loan_limit.toLocaleString()}
                        </p>
                        <button
                            className='btn-primary mt-4 w-full text-center'
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableLoans;
