import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import SocialLogin from './SocialLogin';
import { useTheme } from '../Theme/ThemeContext';
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleLogin = (data) => {
        Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Welcome back to LoanLink!',
            timer: 2000,
            showConfirmButton: false

        });
        navigate(location.state || '/');
        signInUser(data.email, data.password)

            .catch(error => console.error(error));
    }

    const bgColor = isDark ? 'bg-gray-900' : 'bg-green-100';
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
    const textColor = isDark ? 'text-gray-100' : 'text-gray-900';
    const inputBg = isDark ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900';
    const btnColor = isDark ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white';
    const linkColor = isDark ? 'text-emerald-300' : 'text-emerald-800';

    return (
        <div className={`${bgColor} min-h-screen flex items-center justify-center py-10 transition-colors duration-500`}>
            <div className={`card w-full max-w-sm shadow-2xl rounded-2xl ${cardBg} p-6`}>
                <h3 className={`text-3xl font-bold text-center mb-1 ${linkColor}`}>Welcome Back</h3>
                <p className={`text-center mb-6 ${textColor}`}>Please login to continue</p>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    <div className="flex flex-col">
                        <label className={`mb-1 ${textColor}`}>Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            placeholder="Email"
                            className={`input w-full rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBg}`}
                        />
                        {errors.email && <p className="text-red-500 mt-1 text-sm">Email is required</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className={`mb-1 ${textColor}`}>Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            placeholder="Password"
                            className={`input w-full rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBg}`}
                        />
                        {errors.password?.type === 'required' && <p className="text-red-500 mt-1 text-sm">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500 mt-1 text-sm">Password must be at least 6 characters</p>}
                    </div>

                    <div className="flex justify-between items-center">
                        <a href="#" className={`text-sm hover:underline ${linkColor}`}>Forgot password?</a>
                    </div>

                    <button type="submit" className={`w-full py-3 rounded-md font-semibold ${btnColor} mt-2`}>
                        Login
                    </button>
                </form>

                <p className={`text-center mt-4 ${textColor}`}>
                    New to LoanLink? <Link state={location.state} className={`underline ${linkColor}`} to="/register">Register</Link>
                </p>

                <div className="mt-6">
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;
