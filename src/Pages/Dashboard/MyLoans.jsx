import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTimes, FaMoneyCheckAlt } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import { useTheme } from "../../Theme/ThemeContext";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth"; // assuming you have a user context

const MyLoans = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const axios = useAxios();
    const { user } = useAuth(); // must have user.email available

    // ✅ Fetch logged-in user's loans
    const { data: myLoans = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["myLoans", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`/my-loans?email=${user.email}`);
            return res.data;
        },
    });

    // 🎯 Cancel loan
    const handleCancel = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: "Cancel Loan?",
                text: "Are you sure you want to cancel this pending loan?",
                icon: "warning",
                showCancelButton: true,
            });
            if (confirm.isConfirmed) {
                await axios.patch(`/loan-applications/${id}/cancel`);
                Swal.fire("Cancelled!", "Your loan was cancelled.", "success");
                refetch();
            }
        } catch (error) {
            Swal.fire("Error", "Unable to cancel loan.", "error");
        }
    };

    // 💳 Pay Fee
    const handlePay = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: "Pay Fee?",
                text: "Confirm payment of your loan application fee?",
                icon: "info",
                showCancelButton: true,
            });
            if (confirm.isConfirmed) {
                await axios.patch(`/loan-applications/${id}/pay-fee`);
                Swal.fire("Success!", "Fee has been paid successfully.", "success");
                refetch();
            }
        } catch (error) {
            Swal.fire("Error", "Payment failed.", "error");
        }
    };

    // 🎨 Theme colors
    const bgColor = isDark ? "bg-gray-900" : "bg-green-100";
    const headingColor = isDark ? "text-emerald-300" : "text-emerald-800";

    if (isLoading) return <p className="text-center py-10">Loading your loans...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Error loading loans.</p>;

    return (
        <div className={`${bgColor} min-h-screen py-10 px-4`}>
            <h2 className={`text-3xl font-extrabold mb-6 text-center ${headingColor}`}>My Loans</h2>

            <div className="max-w-6xl mx-auto overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <table className="min-w-full text-sm text-left">
                    <thead className={`${isDark ? "bg-gray-700 text-gray-100" : "bg-emerald-200 text-gray-900"}`}>
                        <tr>
                            <th className="py-3 px-4">Loan ID</th>
                            <th className="py-3 px-4">Loan Info</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myLoans.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500 dark:text-gray-400">
                                    No loans found.
                                </td>
                            </tr>
                        ) : (
                            myLoans.map((loan) => (
                                <tr key={loan._id} className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                                    <td className="py-3 px-4">{loan._id}</td>
                                    <td className="py-3 px-4">{loan.loanTitle || loan.loanType}</td>
                                    <td className="py-3 px-4">${loan.loanAmount?.toLocaleString()}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${loan.status === "Approved"
                                                    ? "bg-green-500 text-white"
                                                    : loan.status === "Pending"
                                                        ? "bg-yellow-400 text-gray-900"
                                                        : loan.status === "Rejected"
                                                            ? "bg-red-500 text-white"
                                                            : "bg-gray-500 text-white"
                                                }`}
                                        >
                                            {loan.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 flex gap-3 items-center">
                                        <button
                                            onClick={() => Swal.fire("Loan Info", loan.loanTitle, "info")}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FaEye />
                                        </button>

                                        {loan.status === "Pending" && (
                                            <button
                                                onClick={() => handleCancel(loan._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTimes />
                                            </button>
                                        )}

                                        {loan.applicationFeeStatus === "Unpaid" ? (
                                            <button
                                                onClick={() => handlePay(loan._id)}
                                                className="flex items-center gap-1 text-green-600 hover:text-green-800"
                                            >
                                                <FaMoneyCheckAlt /> Pay
                                            </button>
                                        ) : (
                                            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                                                Paid
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyLoans;
