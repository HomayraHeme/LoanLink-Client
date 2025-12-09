import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSeceure";
import { useTheme } from "../../Theme/ThemeContext";

// --- EditLoanModal Component ---
const EditLoanModal = ({ isDark, loanData, onClose }) => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // 1. Initial form state from loanData
    const [formData, setFormData] = useState({
        title: loanData.title || "",
        short_description: loanData.short_description || "",
        description: loanData.description || "",
        loan_category: loanData.loan_category || "",
        interest_rate: loanData.interest_rate || 0,
        max_loan_limit: loanData.max_loan_limit || 0,
        requiredDocuments: loanData.requiredDocuments || [],
        available_emi_plan: loanData.available_emi_plan || [],
        image: loanData.image || "",
        showOnHome: loanData.showOnHome || false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // 2. Update Mutation Setup
    const updateMutation = useMutation({
        mutationFn: (updatedData) => axiosSecure.patch(`/loans/${loanData._id}`, updatedData),
        onSuccess: () => {
            Swal.fire("Updated!", "Loan updated successfully.", "success");
            queryClient.invalidateQueries(["manageLoans"]);
            onClose();
        },
        onError: (err) => {
            console.error("Error updating loan:", err);
            Swal.fire("Error", "Failed to update loan.", "error");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {
            ...formData,
            interest_rate: parseFloat(formData.interest_rate),
            max_loan_limit: parseFloat(formData.max_loan_limit),
            requiredDocuments: Array.isArray(formData.requiredDocuments) ? formData.requiredDocuments : [formData.requiredDocuments],
            available_emi_plan: Array.isArray(formData.available_emi_plan) ? formData.available_emi_plan : [formData.available_emi_plan],
        };
        updateMutation.mutate(updatedData);
    };

    if (updateMutation.isLoading) return <div className="p-6">Updating...</div>;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className={`p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
                <h3 className="text-2xl font-bold mb-4 border-b pb-2">Edit Loan: {loanData.title}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Title */}
                    <div>
                        <label className="block font-medium mb-1">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "border-gray-300"}`} />
                    </div>

                    {/* Loan Category */}
                    <div>
                        <label className="block font-medium mb-1">Category (loan_category)</label>
                        <input type="text" name="loan_category" value={formData.loan_category} onChange={handleChange} required className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "border-gray-300"}`} />
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block font-medium mb-1">Short Description</label>
                        <input type="text" name="short_description" value={formData.short_description} onChange={handleChange} className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "border-gray-300"}`} />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium mb-1">Full Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required className={`w-full p-2 border rounded h-24 ${isDark ? "bg-gray-700 border-gray-600" : "border-gray-300"}`}></textarea>
                    </div>

                    {/* Interest Rate & Max Loan Limit (Numeric Fields) */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block font-medium mb-1">Interest Rate (%)</label>
                            <input type="number" step="0.01" name="interest_rate" value={formData.interest_rate} onChange={handleChange} required className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "border-gray-300"}`} />
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium mb-1">Max Loan Limit</label>
                            <input type="number" name="max_loan_limit" value={formData.max_loan_limit} onChange={handleChange} required className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "border-gray-300"}`} />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block font-medium mb-1">Image URL</label>
                        <input type="text" name="image" value={formData.image} onChange={handleChange} required className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "border-gray-300"}`} />
                        {formData.image && <img src={formData.image} alt="Preview" className="w-24 h-24 object-cover mt-2 rounded" />}
                    </div>

                    {/* Show on Home Checkbox */}
                    <div className="flex items-center">
                        <input type="checkbox" id="showOnHome" name="showOnHome" checked={formData.showOnHome} onChange={handleChange} className={`h-4 w-4 text-blue-600 border-gray-300 rounded ${isDark ? "bg-gray-700 border-gray-600" : ""}`} />
                        <label htmlFor="showOnHome" className="ml-2 block text-sm font-medium">Show on Home Page</label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={updateMutation.isLoading} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors disabled:opacity-50">
                            {updateMutation.isLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ManageLoans = () => {
    const axiosSecure = useAxiosSecure();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const queryClient = useQueryClient();

    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);

    const { data: loans = [], isLoading, isError } = useQuery({
        queryKey: ["manageLoans"],
        queryFn: async () => {
            const res = await axiosSecure.get("/loans");
            return res.data;
        },
        onError: (err) => {
            console.error(err);
            Swal.fire("Error", "Failed to fetch loans", "error");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/loans/${id}`),
        onSuccess: () => {
            Swal.fire("Deleted!", "Loan deleted successfully", "success");
            queryClient.invalidateQueries(["manageLoans"]);
        },
        onError: (err) => {
            console.error(err);
            Swal.fire("Error", "Failed to delete loan", "error");
        },
    });

    const handleDelete = (loan) => {
        Swal.fire({
            title: `Delete ${loan.title}?`,
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(loan._id);
            }
        });
    };

    const handleUpdate = (loan) => {
        setSelectedLoan(loan);
        setIsModalOpen(true);
    };

    const lowerCaseSearch = search.toLowerCase();
    const filteredLoans = loans.filter(loan => {
        const title = loan.title?.toLowerCase() || "";
        const category = loan.loan_category?.toLowerCase() || "";

        return (
            title.includes(lowerCaseSearch) ||
            category.includes(lowerCaseSearch)
        );
    });

    const tableBg = isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800";
    const headerBg = isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800";

    if (isLoading) return <p className="text-center py-10 text-xl">Loading loans...</p>;
    if (isError) return <p className="text-center py-10 text-red-600">Error loading loans.</p>;

    return (
        <div className={`${isDark ? "bg-gray-900 text-white" : "bg-green-100 text-gray-900"} min-h-screen p-6`}>
            <h2 className="text-3xl font-bold mb-6 text-center">Manage Loans</h2>

            <div className="mb-4 flex justify-end">
                <input
                    type="text"
                    placeholder="Search by title or category"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`px-3 py-2 rounded w-full max-w-sm ${isDark ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                />
            </div>

            <table className={`w-full table-auto border ${tableBg} rounded-lg overflow-hidden shadow-lg`}>
                <thead>
                    <tr className={`${headerBg}`}>
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Interest</th>
                        <th className="border px-4 py-2">Category</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLoans.map((loan) => (
                        <tr key={loan._id} className={`${isDark ? "border-gray-700" : "border-gray-300"} border hover:bg-opacity-90 transition-colors`}>
                            <td className="px-4 py-2">
                                <img src={loan.image} alt={loan.title} className="w-20 h-20 object-cover rounded" />
                            </td>
                            <td className="px-4 py-2">{loan.title}</td>
                            <td className="px-4 py-2">{loan.interest_rate}%</td>
                            <td className="px-4 py-2">{loan.loan_category}</td>
                            <td className="px-4 py-2 flex gap-2">
                                <button

                                    onClick={() => handleUpdate(loan)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(loan)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filteredLoans.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center py-4">
                                No loans found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {isModalOpen && selectedLoan && (
                <EditLoanModal
                    isDark={isDark}
                    loanData={selectedLoan}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ManageLoans;