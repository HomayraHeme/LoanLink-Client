// src/Pages/Dashboard/PaymentSuccess.jsx

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSeceure";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [message] = useState("Processing payment...");

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log('Payment success update response:', res.data);

                    if (res.data.modifiedCount > 0) {
                        Swal.fire("Success!", "Your payment was successful and application updated.", "success");
                    } else {
                        // Handle case where modifiedCount is 0 (already paid, etc.)
                        Swal.fire("Info", "Payment was confirmed, but loan status was already updated.", "info");
                    }

                    // Crucial: Navigate away to clear the query parameters and re-trigger MyLoans data fetch.
                    navigate('/dashboard/my-loans', { replace: true });

                })
                .catch(err => {
                    console.error("Error during payment success update:", err);
                    Swal.fire("Error", "Failed to finalize payment and update loan status.", "error");
                    // Also navigate away on error
                    navigate('/dashboard/my-loans', { replace: true });
                });
        }
    }, [sessionId, axiosSecure, navigate]);

    // Simple display while processing
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
            <p className="text-xl font-semibold mt-2">{message}</p>
            <p className="mt-4 text-gray-500">Redirecting to your loans dashboard...</p>
        </div>
    );
};

export default PaymentSuccess;