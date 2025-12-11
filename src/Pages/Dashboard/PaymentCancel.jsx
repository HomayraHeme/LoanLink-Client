import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
            <h2>payment is cancel.please try again</h2>
            <Link to="/dashboard/my-parcels"><button className='btn btn-primary text-black'>Try again</button></Link>
        </div>
    );
};

export default PaymentCancel;