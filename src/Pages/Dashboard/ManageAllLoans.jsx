import React from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSeceure";
import { useTheme } from "../../Theme/ThemeContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageAllLoans = () => {
    const axiosSecure = useAxiosSecure();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // ✅ Fetch all loans
    const { data: loans = [], isLoading, refetch } = useQuery({
        queryKey: ["allLoans"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/loans");
            return res.data;
        },
        onError: (err) => {
            console.error("Error fetching loans:", err);
            Swal.fire("Error", "Failed to load loans", "error");
        },
    });

    // ✅ Delete mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/admin/loans/${id}`),
        onSuccess: () => {
            Swal.fire("Deleted!", "Loan deleted successfully.", "success");
        },
        onError: () => {
            Swal.fire("Error", "Failed to delete loan", "error");
        },
        onSettled: () => refetch(),
    });

    // ✅ Toggle showOnHome mutation
    const toggleMutation = useMutation({
        mutationFn: ({ id, showOnHome }) =>
            axiosSecure.patch(`/admin/loans/${id}/toggle-home`, { showOnHome }),
        onSuccess: () => {
            Swal.fire("Updated!", "Loan visibility updated successfully.", "success");
        },
        onError: () => {
            Swal.fire("Error", "Failed to update loan visibility", "error");
        },
        onSettled: () => refetch(),
    });

    // ✅ Handlers
    const handleDelete = (loan) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Delete loan: "${loan.title}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DC2626",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(loan._id);
            }
        });
    };

    const handleToggle = (loan) => {
        toggleMutation.mutate({ id: loan._id, showOnHome: !loan.showOnHome });
    };

    const handleEdit = (loan) => {
        Swal.fire({
            title: "Edit Feature Coming Soon!",
            text: `You can redirect to /dashboard/edit-loan/${loan._id} or open a modal.`,
            icon: "info",
            confirmButtonColor: "#10B981",
        });
    };

    // ✅ Theme-based styles
    const bg = isDark ? "bg-gray-900 text-white" : "bg-green-100 text-gray-800";
    const tableBg = isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800";
    const headerBg = isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800";

    if (isLoading) return <p className="text-center py-10">Loading loans...</p>;

    return (
        <div className={`${bg} min-h-screen p-6`}>
            <h2 className="text-3xl font-bold mb-6 text-center">All Loans</h2>

            <table
                className={`w-full table-auto border ${tableBg} rounded-lg overflow-hidden shadow-lg`}
            >
                <thead>
                    <tr className={`${headerBg}`}>
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Interest</th>
                        <th className="border px-4 py-2">Category</th>
                        <th className="border px-4 py-2">Created By</th>
                        <th className="border px-4 py-2">Show on Home</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr
                            key={loan._id}
                            className={`${isDark ? "border-gray-700" : "border-gray-300"
                                } border hover:bg-opacity-90 transition-colors`}
                        >
                            <td className="px-4 py-2 text-center">
                                <img
                                    src={loan.image}
                                    alt={loan.title}
                                    className="w-20 h-16 object-cover rounded mx-auto"
                                />
                            </td>
                            <td className="px-4 py-2">{loan.title}</td>
                            <td className="px-4 py-2">{loan.interest_rate}%</td>
                            <td className="px-4 py-2">{loan.loan_category}</td>
                            <td className="px-4 py-2">{loan.createdBy || "N/A"}</td>
                            <td className="px-4 py-2 text-center">
                                <input
                                    type="checkbox"
                                    checked={loan.showOnHome || false}
                                    onChange={() => handleToggle(loan)}
                                    className="w-5 h-5 accent-emerald-600 cursor-pointer"
                                    disabled={toggleMutation.isLoading}
                                />
                            </td>
                            <td className="px-4 py-2 flex justify-center gap-3">
                                <button
                                    onClick={() => handleEdit(loan)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors"
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(loan)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageAllLoans;
