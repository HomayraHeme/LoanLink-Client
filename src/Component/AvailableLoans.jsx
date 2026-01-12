import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../Theme/ThemeContext";
import useAxios from "../Hooks/useAxios";
import { Link } from "react-router";
import Loading from "../Pages/Loading";

const AvailableLoans = () => {
    const axiosInstance = useAxios();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { data: loans = [], isLoading, isError } = useQuery({
        queryKey: ["availableLoans"],
        queryFn: async () => {
            const res = await axiosInstance.get("/AvailableLoans");
            return res.data;
        },
    });

    const headingColor = isDark ? "text-emerald-300" : "text-emerald-800";

    if (isLoading) return <p className="text-center mt-10"><Loading></Loading></p>;
    if (isError) return <p className="text-center mt-10">Error fetching loans.</p>;

    if (loans.length === 0)
        return <p className="text-center mt-10 text-gray-500">No loans available at the moment.</p>;
    const displayedLoans = loans.slice(0, 8);

    return (
        <div>
            <div>
                <h3 className={`text-5xl font-black text-center ${headingColor}`}>
                    Available Loans
                </h3>
            </div>
            <div
                className={`max-w-7x lg:px-10  grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto py-10 px-4 ${isDark
                    ? "bg-gray-900 text-white"
                    : "bg-green-100 text-gray-900"
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
                            Max Loan: ${loan.max_loan_limit?.toLocaleString()}
                        </p>
                        <Link to={`/view-details/${loan._id}`}>
                            <button className="btn-primary mt-4 w-full text-center">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableLoans;
