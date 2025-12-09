import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSeceure";
import { useTheme } from "../../Theme/ThemeContext";
import Swal from "sweetalert2";

const ManageLoanApplications = () => {
    const axiosSecure = useAxiosSecure();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [filterStatus, setFilterStatus] = useState("all");

    // Fetch all loan applications
    const { data: applications = [], isLoading, isError } = useQuery({
        queryKey: ["loanApplications"],
        queryFn: async () => {
            const res = await axiosSecure.get("/loan-applications");
            return res.data;
        },
        onError: (err) => {
            console.error("Fetch loan applications error:", err);
            Swal.fire("Error", "Failed to fetch loan applications", "error");
        },
    });

    const handleView = (app) => {
        Swal.fire({
            title: `Loan Application Details`,
            html: `
                <p><strong>Loan ID:</strong> ${app._id}</p>
                <p><strong>User:</strong> (${app.userEmail})</p>
                <p><strong>Category:</strong> ${app.loan_category}</p>
                <p><strong>Amount:</strong> $${app.loanAmount.toLocaleString()}</p>
                <p><strong>Status:</strong> ${app.status}</p>
                <p><strong>Applied At:</strong> ${new Date(app.appliedAt).toLocaleString()}</p>
                <p><strong>Application Fee Status:</strong> ${app.applicationFeeStatus || "Unpaid"}</p>
                <p><strong>Transaction ID:</strong> ${app.transactionId || "N/A"}</p>
            `,
            width: 500,
            confirmButtonText: "Close",
        });
    };

    // Filtered applications
    const filteredApplications =
        filterStatus === "all"
            ? applications
            : applications.filter((app) => app.status.toLowerCase() === filterStatus.toLowerCase());

    // Theme classes
    const tableBg = isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800";
    const headerBg = isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800";

    if (isLoading) return <p className="text-center py-10">Loading applications...</p>;
    if (isError) return <p className="text-center py-10 text-red-600">Error loading applications.</p>;

    return (
        <div className={`${isDark ? "bg-gray-900 text-white" : "bg-green-100 text-gray-800"} min-h-screen p-6`}>
            <h2 className="text-3xl font-bold mb-6 text-center">Loan Applications</h2>

            {/* Filter */}
            <div className="mb-4 flex justify-end gap-3">
                <label>Status: </label>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-2 py-1 rounded border"
                >
                    <option value="all">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            {/* Table */}
            <table className={`w-full table-auto border ${tableBg} rounded-lg overflow-hidden shadow-lg`}>
                <thead>
                    <tr className={headerBg}>
                        <th className="border px-4 py-2">Loan ID</th>
                        <th className="border px-4 py-2">User</th>
                        <th className="border px-4 py-2">Category</th>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredApplications.map((app) => (
                        <tr key={app._id} className="border hover:bg-opacity-90 transition-colors">
                            <td className="px-4 py-2">{app._id}</td>
                            <td className="px-4 py-2">({app.userEmail})</td>
                            <td className="px-4 py-2">{app.loan_category}</td>
                            <td className="px-4 py-2">${app.loanAmount.toLocaleString()}</td>
                            <td className="px-4 py-2">
                                <span className={`font-semibold capitalize 
                                    ${app.status === "Rejected" ? "text-red-500" : app.status === "Approved" ? "text-green-500" : "text-yellow-500"}`}>
                                    {app.status}
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handleView(app)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageLoanApplications;
