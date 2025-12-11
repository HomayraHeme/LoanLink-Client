import React from 'react';
import logoImg from '../../assets/loanlogo-removebg-preview.png';

const Logo = () => {
    return (
        <div className='flex items-center'>
            <img
                src={logoImg}
                alt="LoanLink"
                className="h-14"
            />
            <p className="font-bold text-lg sm:text-xl"><span className='text-emerald-900'>Loan</span><span className='text-lime-400'>Link</span></p>
        </div>
    );
};

export default Logo;