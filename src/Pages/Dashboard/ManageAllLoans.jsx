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
            // ধরে নিচ্ছি /admin/loans রুটটি সমস্ত লোন ডেটা দেয়
            const res = await axiosSecure.get("/admin/loans");
            return res.data;
        },
        onError: (err) => {
            console.error("Error fetching loans:", err);
            Swal.fire("Error", "Failed to load loans", "error");
        },
    });

    // --- ৩. ✅ Edit Mutation (নতুন) ---
    const editMutation = useMutation({
        mutationFn: ({ id, updatedData }) =>
            axiosSecure.patch(`/admin/loans/${id}`, updatedData), // ধরে নিচ্ছি PATCH রুট: /admin/loans/:id
        onSuccess: () => {
            Swal.fire("Updated!", "Loan details updated successfully.", "success");
        },
        onError: (err) => {
            console.error("Edit error:", err);
            Swal.fire("Error", "Failed to update loan details", "error");
        },
        onSettled: () => refetch(),
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

    // --- ✅ Handlers ---

    // এই ফাংশনটি SweetAlert2 ফর্ম ডেটা নিয়ে mutation ট্রিগার করবে
    const updateLoanHandler = async (id, updatedData) => {
        editMutation.mutate({ id, updatedData });
    };

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

    // ✅ Edit Modal
    const handleEdit = (loan) => {
        Swal.fire({
            title: `Edit Loan: ${loan.title}`,
            html: `
                <div class="space-y-4 text-left p-2">
                    <label class="block text-gray-700 dark:text-gray-300">Title</label>
                    <input id="swal-title" class="swal2-input w-full" value="${loan.title || ''}" placeholder="Loan Title">
                    
                    <label class="block text-gray-700 dark:text-gray-300">Interest Rate (%)</label>
                    <input id="swal-interest" type="number" step="0.01" class="swal2-input w-full" value="${loan.interest_rate || 0}" placeholder="Interest Rate">

                    <label class="block text-gray-700 dark:text-gray-300">Category</label>
                    <input id="swal-category" class="swal2-input w-full" value="${loan.loan_category || ''}" placeholder="Category">
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            showLoaderOnConfirm: true,
            customClass: {
                popup: isDark ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-800',
                title: isDark ? 'text-white' : 'text-gray-800',
                input: isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800',
            },
            preConfirm: () => {
                const title = document.getElementById('swal-title').value;
                const interest_rate = parseFloat(document.getElementById('swal-interest').value);
                const loan_category = document.getElementById('swal-category').value;

                if (!title || isNaN(interest_rate) || !loan_category) {
                    Swal.showValidationMessage('Please fill out all required fields.');
                    return false;
                }

                return { title, interest_rate, loan_category };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // আপডেট ডেটা হ্যান্ডলারকে কল করা
                updateLoanHandler(loan._id, result.value);
            }
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
                                    disabled={toggleMutation.isPending}
                                />
                            </td>
                            <td className="px-4 py-2 flex justify-center gap-3">
                                <button
                                    onClick={() => handleEdit(loan)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors"
                                    disabled={editMutation.isPending}
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(loan)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors"
                                    disabled={deleteMutation.isPending}
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