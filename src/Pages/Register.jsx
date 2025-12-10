import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSeceure';
import SocialLogin from './SocialLogin';
import { useTheme } from '../Theme/ThemeContext';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleRegistration = (data) => {
        console.log("🟢 Form Data Submitted:", data);
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {
                console.log("✅ Firebase user created successfully");

                const formData = new FormData();
                formData.append('image', profileImg);
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                // 🟡 Upload image
                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;
                        console.log("🖼️ Uploaded photo URL:", photoURL);

                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL,
                            role: data.role
                        };

                        console.log("📤 Sending user info to backend:", userInfo);


                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                console.log(" Backend response:", res.data);
                                if (res.data.insertedId) {
                                    console.log(' User created in database');
                                } else if (res.data.message) {
                                    console.warn(" Warning:", res.data.message);
                                }
                            })
                            .catch(err => {
                                console.error(" Error while saving user to backend:", err);
                            });


                        const userProfile = { displayName: data.name, photoURL };
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log("✅ Firebase profile updated successfully");

                                Swal.fire({
                                    icon: 'success',
                                    title: 'Registration Successful',
                                    text: 'Welcome to LoanLink!',
                                    timer: 2000,
                                    showConfirmButton: false
                                });
                                navigate(location.state || '/');
                            })
                            .catch(error => console.error(" Error updating profile:", error));
                    })
                    .catch(error => {
                        console.error(" Image upload failed:", error);
                    });
            })
            .catch(error => {
                console.error(" Firebase registration error:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message,
                });
            });
    };

    // Theme classes
    const bgColor = isDark ? 'bg-gray-900' : 'bg-green-100';
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
    const textColor = isDark ? 'text-gray-100' : 'text-gray-900';
    const inputBg = isDark ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900';
    const btnColor = isDark ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white';
    const linkColor = isDark ? 'text-emerald-300' : 'text-emerald-800';

    return (
        <div className={`${bgColor} min-h-screen flex items-center justify-center py-10 transition-colors duration-500`}>
            <div className={`card w-full max-w-md shadow-2xl rounded-2xl ${cardBg} p-6`}>
                <h3 className={`text-3xl font-bold text-center mb-1 ${linkColor}`}>Welcome to LoanLink</h3>
                <p className={`text-center mb-6 ${textColor}`}>Create your account to get started</p>

                <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
                    {/* Photo */}
                    <div>
                        <label className={`label ${textColor}`}>Profile Photo</label>
                        <input type="file" {...register('photo', { required: true })} className="file-input w-full" />
                        {errors.photo && <p className='text-red-500'>Photo is required</p>}
                    </div>

                    {/* Name */}
                    <div>
                        <label className={`label ${textColor}`}>Name</label>
                        <input type="text" {...register('name', { required: true })} className={`input w-full ${inputBg}`} placeholder="Your Name" />
                        {errors.name && <p className='text-red-500'>Name is required</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className={`label ${textColor}`}>Email</label>
                        <input type="email" {...register('email', { required: true })} className={`input w-full ${inputBg}`} placeholder="Your Email" />
                        {errors.email && <p className='text-red-500'>Email is required</p>}
                    </div>

                    {/* Role */}
                    <div>
                        <label className={`label ${textColor}`}>Role</label>
                        <select {...register('role', { required: true })} className={`select w-full ${inputBg}`}>
                            <option value="">Select Role</option>
                            <option value="borrower">Borrower</option>
                            <option value="manager">Manager</option>
                        </select>
                        {errors.role && <p className="text-red-500">Role is required</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className={`label ${textColor}`}>Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
                            })}
                            className={`input w-full ${inputBg}`}
                            placeholder="Password"
                        />
                        {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 6 characters</p>}
                        {errors.password?.type === 'pattern' && <p className='text-red-500'>Password must include uppercase, lowercase, number, and special character</p>}
                    </div>

                    <button type="submit" className={`w-full py-3 rounded-md font-semibold ${btnColor} mt-2`}>
                        Register
                    </button>
                </form>

                <p className={`text-center mt-4 ${textColor}`}>
                    Already have an account?{' '}
                    <Link state={location.state} className={`underline ${linkColor}`} to="/login">
                        Login
                    </Link>
                </p>

                <div className="mt-6">
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;
