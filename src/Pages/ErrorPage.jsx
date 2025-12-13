 import React from 'react';
import { Link } from 'react-router';
 
 const ErrorPage = () => {
    return (
        <div className='text-center pb-10'>
            <div>
        <img className='w-180 h-150 mx-auto p-10' src="https://img.freepik.com/premium-vector/website-error-disconnected-concept-with-people_662093-264.jpg" alt="" />
        </div>
       <button className='btn-primary '> <Link to='/'>Back to home</Link></button>
        </div>
    );
 };
 
 export default ErrorPage;