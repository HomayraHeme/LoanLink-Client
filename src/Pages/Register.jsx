import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSeceure';
import SocialLogin from './SocialLogin';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    // console.log('in register', location);

    const handleRegistration = (data) => {
        // console.log('after register', data.photo[0]);

        const profileImg = data.photo[0]

        registerUser(data.email, data.password)
            .then(() => {
                // console.log(result.user);
                // store img in url
                const formData = new FormData();
                formData.append('image', profileImg)
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key} `

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL

                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in the database');
                                }
                            })


                        // update user profile

                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL,
                        }
                        updateUserProfile(userProfile)
                            .then(() => {
                                // console.log('user Profile Updated done');
                                navigate(location.state || '/')
                            })
                            .catch(error => {
                                console.log(error);
                            })

                    })


            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center">Welcome to Zap Shift</h3>
            <p className=" text-center">Please register</p>
            <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">

                    {/* image */}
                    <label className="label">Photo</label>
                    <input type="file"{...register('photo', { required: true })} className="file-input" placeholder="your photo" />

                    {errors.name?.type === 'required' && <p className='text-red-500'>Photo is required</p>}


                    {/* name */}
                    <label className="label">Name</label>
                    <input type="text"{...register('name', { required: true })} className="input" placeholder="your name" />

                    {errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>}

                    {/* email */}
                    <label className="label">Email</label>
                    <input type="email"{...register('email', { required: true })} className="input" placeholder="Email" />

                    {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

                    {/* pass */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/
                    })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>password must be 6 character or longer</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500'>password must have at least one uppercase,one lowercase,number and special character</p>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p>Already Have an account <Link state={location.state} className='text-blue-400 underline' to="/login">Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;