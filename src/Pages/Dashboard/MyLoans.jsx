import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query"; // ✅ TanStack Query এখানেই আছে
import { FaEye, FaTimes, FaMoneyCheckAlt } from "react-icons/fa";
import { useTheme } from "../../Theme/ThemeContext";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSeceure";

const MyLoans = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    // --- Fetch user's loans (TanStack Query) ---
    const { data: myLoans = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["myLoans", user?.email],
        enabled: !!user?.email && !!axiosSecure,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-loans?email=${user.email}`);
            return res.data;
        },
    });

    // --- Payment Success Handling ---
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const isSuccess = params.get('success');
        const sessionId = params.get('session_id');

        if (isSuccess === 'true' && sessionId) {

            // সার্ভারে PATCH রিকোয়েস্ট (ক্লায়েন্ট-সাইড ফিলাপ লজিক)
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log('Payment success update response:', res.data);

                    if (res.data.modifiedCount > 0) {
                        Swal.fire("Success!", "Your payment was successful and application updated.", "success");
                        refetch(); // ডেটা রিফ্রেশ করুন
                    } else if (res.data.success === false) {
                        Swal.fire("Error", "Payment confirmed but database update failed.", "error");
                    }

                    // URL থেকে প্যারামিটারগুলো সরিয়ে দিন এবং Clean Redirect
                    navigate(location.pathname, { replace: true });

                })
                .catch(err => {
                    console.error("Error during payment success update:", err);
                    Swal.fire("Error", "Failed to finalize payment and update loan status.", "error");
                    navigate(location.pathname, { replace: true });
                });
        }
    }, [location.search, navigate, axiosSecure, refetch]); // refetch added to dependency array

    // --- Delete loan ---
    const handleDelete = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: "Delete Loan?",
                text: "Are you sure you want to permanently delete this loan?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (confirm.isConfirmed) {
                await axiosSecure.delete(`/loan-applications/${id}`);
                Swal.fire("Deleted!", "Your loan has been deleted.", "success");
                refetch();
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Unable to delete loan.", "error");
        }
    };

    // --- Pay Fee ---
    const handlePay = async (loan) => {
        try {
            const confirm = await Swal.fire({
                title: "Pay Fee?",
                text: "Confirm payment of your loan application fee?",
                icon: "info",
                showCancelButton: true,
            });

            if (confirm.isConfirmed) {
                // Create Stripe session
                const { data } = await axiosSecure.post('/create-payment-session', {
                    userEmail: user.email,
                    loanId: loan._id,
                });

                // Redirect to Stripe checkout
                window.location.href = data.url;
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Payment failed.", "error");
        }
    };

    const bgColor = isDark ? "bg-gray-900" : "bg-green-100";
    const headingColor = isDark ? "text-emerald-300" : "text-emerald-800";

    if (isLoading) return <p className="text-center py-10">Loading your loans...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Error loading loans.</p>;

    return (
        <div className={`${bgColor} min-h-screen py-10 px-4`}>
            <h2 className={`text-3xl font-extrabold mb-6 text-center ${headingColor}`}>My Loans</h2>

            <div className="max-w-6xl mx-auto overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
                <table className={`min-w-full text-sm border-collapse ${isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
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
                                    {/* ✅ Added title attribute for full ID visibility on hover */}
                                    <td className="py-3 px-4 truncate max-w-[100px]" title={loan._id}>{loan._id}</td>
                                    <td className="py-3 px-4">{loan.loanTitle || loan.loanType}</td>
                                    <td className="py-3 px-4">${loan.loanAmount?.toLocaleString()}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${loan.status === "Approved"
                                            ? "bg-green-500 text-white"
                                            : loan.status === "Pending"
                                                ? "bg-yellow-400 text-gray-900"
                                                : loan.status === "Rejected"
                                                    ? "bg-red-500 text-white"
                                                    : "bg-gray-500 text-white"
                                            }`}>
                                            {loan.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 flex gap-3 items-center justify-center">
                                        {/* View Loan Info */}
                                        <button
                                            onClick={() =>
                                                Swal.fire({
                                                    title: 'Loan Info',
                                                    html: `
                                                        <strong>Loan Title:</strong> ${loan.loanTitle} <br/>
                                                        <strong>Name:</strong> ${loan.firstName} ${loan.lastName} <br/>
                                                        <strong>Contact:</strong> ${loan.contactNumber} <br/>
                                                        <strong>Email:</strong> ${loan.userEmail} <br/>
                                                        <strong>Loan Amount:</strong> $${loan.loanAmount} <br/>
                                                        <strong>Status:</strong> ${loan.status} <br/>
                                                        <strong>Applied At:</strong> ${new Date(loan.appliedAt).toLocaleString()}
                                                    `,
                                                    icon: 'info',
                                                    confirmButtonText: 'Close'
                                                })
                                            }
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
                                        >
                                            <FaEye />
                                        </button>

                                        {/* Delete Loan */}
                                        {loan.status === "Pending" && loan.applicationFeeStatus === "Unpaid" && (
                                            <button
                                                onClick={() => handleDelete(loan._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTimes />
                                            </button>
                                        )}

                                        {/* Pay Fee / Paid Status */}
                                        {loan.applicationFeeStatus === "Unpaid" ? (
                                            <button
                                                onClick={() => handlePay(loan)}
                                                className="flex items-center gap-1 text-green-600 hover:text-green-800 font-semibold"
                                                title="Pay Application Fee ($10)"
                                            >
                                                <FaMoneyCheckAlt /> Pay
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    Swal.fire({
                                                        title: "Payment Details",
                                                        html: `
                                                            <strong>Email:</strong> ${loan.userEmail}<br/>
                                                            <strong>Loan ID:</strong> ${loan._id}<br/>
                                                            <strong>Transaction ID:</strong> ${loan.transactionId || 'N/A'}<br/>
                                                            ${loan.trackingId ? `<strong>Tracking ID:</strong> ${loan.trackingId} <br/>` : ""}
                                                            <strong>Status:</strong> Paid
                                                        `,
                                                        icon: "success",
                                                        confirmButtonText: "Close"
                                                    });
                                                }}
                                                className="bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700"
                                            >
                                                Paid
                                            </button>
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