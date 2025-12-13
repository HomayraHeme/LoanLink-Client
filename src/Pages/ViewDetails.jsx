import React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
import { useTheme } from '../Theme/ThemeContext';
import { motion } from 'framer-motion';
import useRole from '../Hooks/useRole';
import Loading from './Loading';

const ViewDetails = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const axios = useAxios();
    const navigate = useNavigate();
    const { id } = useParams();
    const { role } = useRole();
    const canApply = role && !['admin', 'manager'].includes(role.toLowerCase());




    const { data: loan, isLoading, isError } = useQuery({
        queryKey: ['loan', id],
        queryFn: async () => {
            const res = await axios.get(`/loans/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center py-20 text-xl"><Loading></Loading></p>;
    if (isError || !loan) return <p className="text-center py-20 text-xl">Error fetching loan details.</p>;

    const bgColor = isDark ? 'bg-gray-900' : 'bg-gray-50';
    const textColor = isDark ? 'text-gray-100' : 'text-gray-900';
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
    const headingColor = isDark ? 'text-emerald-300' : 'text-emerald-700';
    const labelColor = isDark ? 'text-gray-400' : 'text-gray-600';
    const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';


    return (
        <div className={`${bgColor} min-h-screen py-16 px-6 md:px-20`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`max-w-6xl mx-auto rounded-xl shadow-2xl overflow-hidden ${cardBg}`}
            >
                {/* Top Section: Image + Details */}
                <div className="md:flex md:gap-6">
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="md:w-1/2"
                    >
                        <img
                            src={loan.image}
                            alt={loan.title}
                            className="w-full h-full object-cover md:h-[500px] rounded-t-xl md:rounded-l-xl md:rounded-tr-none transition-transform duration-300 hover:scale-105"
                        />
                    </motion.div>
                    <div className={`md:w-1/2 p-10 flex flex-col justify-center ${textColor}`}>
                        <motion.h1
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className={`text-4xl md:text-5xl font-extrabold mb-4 ${headingColor}`}
                        >
                            {loan.title}
                        </motion.h1>
                        <motion.p
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.7 }}
                            className="text-lg md:text-xl mb-6"
                        >
                            {loan.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-3 text-lg"
                        >
                            <p><span className={`font-semibold ${labelColor}`}>Category:</span> {loan.loan_category}</p>
                            <p><span className={`font-semibold ${labelColor}`}>Interest Rate:</span> {loan.interest_rate}%</p>
                            <p><span className={`font-semibold ${labelColor}`}>Max Loan Limit:</span> ${loan.max_loan_limit.toLocaleString()}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.9 }}
                            className="mt-6"
                        >
                            <span className={`font-semibold ${labelColor}`}>Available EMI Plans:</span>
                            <ul className="list-disc ml-6 mt-2 space-y-1">
                                {Array.isArray(loan.available_emi_plan) && loan.available_emi_plan.map((plan, idx) => (
                                    <li key={idx}>{plan}</li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div className="mt-6">
                            {canApply ? (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-primary"
                                    onClick={() => navigate(`/apply-loan/${loan._id}`)}
                                >
                                    Apply Now
                                </motion.button>
                            ) : (
                                <button
                                    disabled
                                    className="btn-primary opacity-60 cursor-not-allowed"
                                >
                                    Not eligible to apply
                                </button>
                            )}
                        </motion.div>

                    </div>
                </div>

                {/* Extra Details Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className={`p-10 border-t ${borderColor}`}
                >
                    <h2 className={`text-2xl font-bold mb-4 ${headingColor}`}>Loan Features & Details</h2>
                    <ul className="list-disc ml-6 space-y-2 text-lg">
                        <li>Flexible repayment options tailored for your needs.</li>
                        <li>Transparent interest rates with no hidden charges.</li>
                        <li>Quick approval process for eligible applicants.</li>
                        <li>Customer support available 24/7.</li>
                    </ul>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ViewDetails;
