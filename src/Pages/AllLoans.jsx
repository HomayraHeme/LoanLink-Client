import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
import { useTheme } from '../Theme/ThemeContext';
import { Link } from 'react-router';
import Loading from './Loading';

const AllLoans = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const axios = useAxios();

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // ✅ useQuery object syntax
    const { data: loans = [], isLoading, isError } = useQuery({
        queryKey: ['loans'],
        queryFn: async () => {
            const res = await axios.get('/loans');
            return res.data;
        },
    });

    const filteredLoans = useMemo(() => {
        return loans.filter(
            loan =>
                loan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                loan.loan_category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [loans, searchTerm]);

    const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
    const paginatedLoans = filteredLoans.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (isLoading) return <p className="text-center py-10"><Loading></Loading></p>;
    if (isError) return <p className="text-center py-10">Error fetching loans.</p>;

    const bgColor = isDark ? 'bg-gray-900' : 'bg-green-100';
    const textColor = isDark ? 'text-white' : 'text-emerald-800';
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
    const cardText = isDark ? 'text-gray-200' : 'text-gray-600';
    const headingColor = isDark ? 'text-emerald-300' : 'text-emerald-800';


    return (
        <div className={`${bgColor} min-h-screen py-10 px-4`}>
            <h2 className={`text-3xl font-extrabold mb-6 text-center ${headingColor}`}>All Loans</h2>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <aside className="w-full md:w-1/4 p-4 border rounded-lg border-gray-300 dark:border-gray-700">
                    <h3 className={`font-semibold mb-4 ${textColor}`}>Search / Filter</h3>
                    <input
                        type="text"
                        placeholder="Search by title or category"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700"
                    />
                </aside>

                {/* Loan Cards */}
                <div className="w-full md:w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedLoans.length === 0 ? (
                        <p className={`${textColor} col-span-full text-center`}>No loans found.</p>
                    ) : (
                        paginatedLoans.map(loan => (
                            <div key={loan._id} className={`p-4 rounded-lg shadow-md ${cardBg} ${cardText}`}>
                                <img
                                    src={loan.image}
                                    alt={loan.title}
                                    className="w-full h-40 object-cover rounded-md mb-3"
                                />
                                <h3 className="font-bold text-lg mb-1">{loan.title}</h3>
                                <p className="text-sm mb-1">Category: {loan.loan_category}</p>
                                <p className="text-sm mb-1">Interest: {loan.interest_rate}%</p>
                                <p className="font-semibold mb-2">Max Loan: ${loan.max_loan_limit.toLocaleString()}</p>
                                <Link to={`/view-details/${loan._id}`}>
                                    <button
                                        className={`px-3 py-2 rounded-md btn-primary w-full font-semibold`}
                                    >
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Pagination */}
            <div className="max-w-7xl mx-auto mt-8 flex justify-center gap-3">
                {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`px-3 py-1 rounded ${currentPage === idx + 1
                            ? 'bg-emerald-700 text-white'
                            : 'bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllLoans;
