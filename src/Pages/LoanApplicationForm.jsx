import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
import useAuth from '../Hooks/useAuth';
import { useNavigate } from 'react-router';
import { useTheme } from '../Theme/ThemeContext';
import { motion } from 'framer-motion';

const LoanApplicationForm = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { user } = useAuth();
    const axios = useAxios();
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch loan details
    const { data: loan, isLoading, isError } = useQuery({
        queryKey: ['loan', id],
        queryFn: async () => {
            const res = await axios.get(`/loans/${id}`);
            return res.data;
        },
    });

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (!user || !loan) {
            alert('User or loan details are missing. Cannot submit application.');
            return;
        }

        try {
            const payload = {
                ...data,
                userEmail: user.email,
                loanTitle: loan.title,
                interestRate: loan.interest_rate,
                status: 'Pending',
                applicationFeeStatus: 'Unpaid'
            };
            await axios.post('/loan-applications', payload);
            alert('Application submitted successfully! Redirecting to My Loans.');
            navigate('/dashboard/my-loans');
        } catch (error) {
            console.error(error);
            alert('Error submitting application. Please check your console for details.');
        }
    };

    if (isLoading) return <p className="text-center py-20 text-xl">Loading loan details...</p>;
    if (isError || !loan) return <p className="text-center py-20 text-xl">Error fetching loan details.</p>;

    // --- Styling for Dark Mode ---
    const bgColor = isDark ? 'bg-gray-900' : 'bg-gray-50';
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
    const textColor = isDark ? 'text-gray-100' : 'text-gray-900';
    const labelColor = isDark ? 'text-gray-300' : 'text-gray-700';
    const headingColor = isDark ? 'text-emerald-300' : 'text-emerald-800';

    // FIX APPLIED HERE: Added explicit text-gray-900 (light mode) and dark:text-gray-100 (dark mode)
    // for standard input fields where the user types.
    const inputClasses = "w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100";

    // FIX APPLIED HERE: Ensured read-only field text is light for dark mode, which was already present,
    // but made it explicit that the *default* color is for light mode, and dark:text-gray-100 is for dark mode.
    // I've also changed the light mode text color for better contrast in light mode.
    const readOnlyClasses = "w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100";


    return (
        <div className={`${bgColor} min-h-screen py-16 px-6 md:px-20`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`max-w-3xl mx-auto p-8 rounded-xl shadow-2xl ${cardBg} ${textColor}`}
            >
                <h2 className={`${headingColor} text-4xl font-black mb-6 text-center`}>Loan Application Form</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Auto-filled Read-only Fields */}
                    <div>
                        <label className={`block mb-1 font-semibold ${labelColor}`}>User Email</label>
                        <input
                            type="email"
                            value={user.email || ''} // Safety check for user.email
                            readOnly
                            className={readOnlyClasses}
                        />
                    </div>
                    <div>
                        <label className={`block mb-1 font-semibold ${labelColor}`}>Loan Title</label>
                        <input
                            type="text"
                            value={loan.title}
                            readOnly
                            className={readOnlyClasses}
                        />
                    </div>
                    <div>
                        <label className={`block mb-1 font-semibold ${labelColor}`}>Interest Rate (%)</label>
                        <input
                            type="text"
                            value={loan.interest_rate}
                            readOnly
                            className={readOnlyClasses}
                        />
                    </div>

                    {/* User Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={`block mb-1 font-semibold ${labelColor}`}>First Name</label>
                            <input
                                {...register('firstName', { required: true })}
                                className={inputClasses}
                                placeholder="First Name"
                            />
                            {errors.firstName && <span className="text-red-500 text-sm">First name is required</span>}
                        </div>
                        <div>
                            <label className={`block mb-1 font-semibold ${labelColor}`}>Last Name</label>
                            <input
                                {...register('lastName', { required: true })}
                                className={inputClasses}
                                placeholder="Last Name"
                            />
                            {errors.lastName && <span className="text-red-500 text-sm">Last name is required</span>}
                        </div>
                    </div>

                    <div>
                        <label className={`block mb-1 font-semibold ${labelColor}`}>Contact Number</label>
                        <input
                            {...register('contactNumber', { required: true })}
                            className={inputClasses}
                            placeholder="Contact Number"
                        />
                        {errors.contactNumber && <span className="text-red-500 text-sm">Contact number is required</span>}
                    </div>

                    <div>
                        <label className={`block mb-1 font-semibold ${labelColor}`}>National ID / Passport Number</label>
                        <input
                            {...register('nidPassport', { required: true })}
                            className={inputClasses}
                            placeholder="NID / Passport"
                        />
                        {errors.nidPassport && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>

                    <div>
                        <label className={`block mb-1 font-semibold ${labelColor}`}>Income Source</label>
                        <input
                            {...register('incomeSource', { required: true })}
                            className={inputClasses}
                            placeholder="Income Source"
                        />
                        {errors.incomeSource && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>

                    <div>
                        <label className={`block mb-1 font-semibold ${labelColor}`}>Monthly Income</label>
                        <input
                            type="number"
                            {...register('monthlyIncome', { required: true, min: 0 })}
                            className={inputClasses}
                            placeholder="Monthly Income"
                        />
                        {errors.monthlyIncome && <span className="text-red-500 text-sm">Enter valid monthly income</span>}
                    </div>

                    <div>
                        <label className={`block mb-1 font-semibold ${labelColor}`}>Loan Amount</label>
                        <input
                            type="number"
                            {...register('loanAmount', { required: true, min: 1 })}
                            className={inputClasses}
                            placeholder="Loan Amount"
                        />
                        {errors.loanAmount && <span className="text-red-500 text-sm">Enter valid loan amount</span>}
                    </div>

                    <div>
                        <label className={`block mb-1 font-semibold ${labelColor}`}>Reason for Loan</label>
                        <textarea
                            {...register('loanReason', { required: true })}
                            className={inputClasses}
                            placeholder="Reason for Loan"
                            rows={3}
                        />
                        {errors.loanReason && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>

                    <div>
                        <label className={`block mb-1 font-semibold ${labelColor}`}>Address</label>
                        <textarea
                            {...register('address', { required: true })}
                            className={inputClasses}
                            placeholder="Address"
                            rows={2}
                        />
                        {errors.address && <span className="text-red-500 text-sm">Address is required</span>}
                    </div>

                    <div>
                        <label className={`block mb-1 font-semibold ${labelColor}`}>Extra Notes</label>
                        <textarea
                            {...register('extraNotes')}
                            className={inputClasses}
                            placeholder="Extra Notes (optional)"
                            rows={2}
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className='btn-primary w-full mt-4 text-lg font-semibold'
                    >
                        Submit Application
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default LoanApplicationForm;