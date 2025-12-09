// src/Pages/Dashboard/PaymentSuccess.jsx

import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSeceure";


const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure()
    console.log(sessionId);
    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data);
                })
        }
    }, [sessionId, axiosSecure])
    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-xl font-semibold">payment successful</p>
        </div>
    );
};

export default PaymentSuccess;
