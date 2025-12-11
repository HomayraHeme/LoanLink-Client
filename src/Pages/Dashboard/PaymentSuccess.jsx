import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSeceure';


const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id')
    console.log(sessionId);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(
                    res => {
                        console.log(res.data);
                        setPaymentInfo({
                            transactionId: res.data.transactionId,
                            trackingId: res.data.trackingId
                        })
                        navigate('/dashboard/my-loans')
                    })
        }
    }, [sessionId, axiosSecure])



    return (
        <div>
            <h2 className="text-4xl">Payment successful</h2>
            <p>Your transactionId:{paymentInfo.transactionId}</p>
            <p>Your Parcel TrackingId:{paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;