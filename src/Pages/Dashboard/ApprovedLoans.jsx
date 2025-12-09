import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSeceure';
import { useTheme } from '../../Theme/ThemeContext';

const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: includeTime ? '2-digit' : undefined,
        minute: includeTime ? '2-digit' : undefined,
    });
};

const ViewLoanDetailsModal = ({ loan, onClose }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const modalBg = isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900";
    const headerColor = isDark ? "text-blue-400" : "text-blue-700";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className={`p-8 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all ${modalBg}`}>
                <h3 className={`text-3xl font-bold mb-4 pb-2 border-b ${headerColor}`}>
                    Loan Application Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    {/* --- Loan Overview --- */}
                    <div>
                        <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-2">Loan Overview</h4>
                        <p><strong>Loan ID:</strong> {loan._id}</p>
                        <p><strong>Title:</strong> {loan.loanTitle}</p>
                        <p><strong>Category:</strong> {loan.loan_category || loan.loan_category}</p>
                        <p><strong>Amount:</strong> ${loan.loanAmount?.toLocaleString('en-US')}</p>
                        <p><strong>Interest:</strong> {loan.interestRate}%</p>
                    </div>

                    {/* --- Borrower Info --- */}
                    <div>
                        <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-2">Borrower Info</h4>
                        <p><strong>Email:</strong> {loan.userEmail}</p>
                        <p><strong>Contact:</strong> {loan.contactNumber || 'N/A'}</p>
                        <p><strong>Address:</strong> {loan.address || 'N/A'}</p>
                        <p><strong>NID/ID:</strong> {loan.nidPassport || 'N/A'}</p>
                    </div>

                    {/* --- Status & Dates --- */}
                    <div className="col-span-1 md:col-span-2 mt-4">
                        <h4 className="font-bold text-lg mb-2 border-l-4 border-red-500 pl-2">Status & Timeline</h4>
                        <p><strong>Current Status:</strong> <span className={`font-semibold p-1 rounded ${loan.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                            }`}>{loan.status}</span></p>
                        <p className="mt-1"><strong>Applied On:</strong> {formatDate(loan.appliedAt, true)}</p>

                        {loan.status === 'Approved' && loan.approvedAt && (
                            <p className="text-green-600 font-semibold mt-1">
                                <strong>Approved On:</strong> {formatDate(loan.approvedAt, true)}
                            </p>
                        )}

                        <h4 className="font-bold text-lg mb-2 mt-4 border-l-4 border-purple-500 pl-2">Required Documents</h4>
                        <ul className="list-disc list-inside ml-4">
                            {Array.isArray(loan.requiredDocuments) && loan.requiredDocuments.length > 0 ? (
                                loan.requiredDocuments.map((doc, index) => (
                                    <li key={index}>{doc}</li>
                                ))
                            ) : (
                                <li>No specific documents listed in application data.</li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


const ApprovedLoans = () => {
    const axiosSecure = useAxiosSecure();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [loanToView, setLoanToView] = useState(null);

    // --- Data Fetching: Fetch only Approved Loans ---
    const { data: approvedApplications = [], isLoading, isError } = useQuery({
        queryKey: ["approvedLoans"],
        queryFn: async () => {
            const res = await axiosSecure.get("/loan-applications/approved");
            return res.data;
        },
        onError: (err) => {
            console.error("Fetch Error:", err);
            Swal.fire("Error", "Failed to load approved loan applications.", "error");
        },
    });

    // --- Action Handler (View Details) ---
    const handleView = (loan) => {
        setLoanToView(loan);
        setIsViewModalOpen(true);
    };

    const tableBg = isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800";
    const headerBg = isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800";

    if (isLoading) return <p className="text-center py-10 text-xl">Loading approved applications...</p>;
    if (isError) return <p className="text-center py-10 text-red-600">Error loading data.</p>;
    if (approvedApplications.length === 0) return <p className="text-center py-10 text-xl">❌ No approved loan applications found.</p>;


    return (
        <div className={`${isDark ? "bg-gray-900 text-white" : "bg-green-100 text-gray-900"} min-h-screen p-6`}>
            <h2 className="text-3xl font-bold mb-6 text-center">✅ Approved Loan Applications ({approvedApplications.length})</h2>

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className={`min-w-full table-auto border ${tableBg}`}>
                    <thead>
                        <tr className={`${headerBg}`}>
                            <th className="border px-4 py-3 text-left">Loan ID</th>
                            <th className="border px-4 py-3 text-left">User Info (Email)</th>
                            <th className="border px-4 py-3 text-right">Amount</th>
                            <th className="border px-4 py-3 text-left">Approved Date</th>
                            <th className="border px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedApplications.map((loan) => (
                            <tr key={loan._id} className={`${isDark ? "hover:bg-gray-700 border-gray-700" : "hover:bg-gray-100 border-gray-300"} border-b`}>
                                <td className="px-4 py-3 truncate max-w-xs">{loan._id}</td>
                                <td className="px-4 py-3">

                                    <p className="text-sm text-gray-500">{loan.userEmail}</p>
                                </td>
                                <td className="px-4 py-3 text-right">${loan.loanAmount?.toLocaleString('en-US') || 'N/A'}</td>
                                <td className="px-4 py-3 font-medium text-green-500">{formatDate(loan.approvedAt)}</td>
                                <td className="px-4 py-3 flex gap-2 justify-center">

                                    <button
                                        onClick={() => handleView(loan)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isViewModalOpen && loanToView && (
                <ViewLoanDetailsModal
                    loan={loanToView}
                    onClose={() => setIsViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ApprovedLoans;