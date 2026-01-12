 import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
import { useTheme } from '../Theme/ThemeContext';
import { Link } from 'react-router';
import LoadingSkeleton from '../Component/LoadingSkeleton';
import Loading from './Loading';

const AllLoans = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const axios = useAxios();

  // Filters & Sorting State
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [interestFilter, setInterestFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch loans
  const { data: loans = [], isLoading, isError } = useQuery({
    queryKey: ['loans'],
    queryFn: async () => {
      const res = await axios.get('/loans');
      return res.data;
    },
  });

  // Filter loans based on search, category, and interest
  const filteredLoans = useMemo(() => {
    let filtered = loans;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        loan =>
          loan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loan.loan_category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter(loan => loan.loan_category === categoryFilter);
    }

    // Interest filter
    if (interestFilter === 'low') {
      filtered = filtered.filter(loan => loan.interest_rate <= 10);
    } else if (interestFilter === 'high') {
      filtered = filtered.filter(loan => loan.interest_rate > 10);
    }

    // Sorting
    if (sortBy === 'interestAsc') {
      filtered.sort((a, b) => a.interest_rate - b.interest_rate);
    } else if (sortBy === 'interestDesc') {
      filtered.sort((a, b) => b.interest_rate - a.interest_rate);
    } else if (sortBy === 'maxLoanAsc') {
      filtered.sort((a, b) => a.max_loan_limit - b.max_loan_limit);
    } else if (sortBy === 'maxLoanDesc') {
      filtered.sort((a, b) => b.max_loan_limit - a.max_loan_limit);
    }

    return filtered;
  }, [loans, searchTerm, categoryFilter, interestFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const paginatedLoans = filteredLoans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading)
    return (
      <p className="text-center py-10">
        <LoadingSkeleton />
      </p>
    );
  if (isError)
    return <p className="text-center py-10">Error fetching loans.</p>;

  // Theme colors
  const bgColor = isDark ? 'bg-gray-900' : 'bg-green-100';
  const textColor = isDark ? 'text-white' : 'text-emerald-800';
  const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
  const cardText = isDark ? 'text-gray-200' : 'text-gray-600';
  const headingColor = isDark ? 'text-emerald-300' : 'text-emerald-800';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-300';
  const btnColor = isDark
    ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
    : 'bg-emerald-700 hover:bg-emerald-800 text-white';
  const selectBg = isDark ? 'bg-gray-700' : 'bg-white';
  const selectText = isDark ? 'text-white' : 'text-gray-900';

  return (
    <div className={`${bgColor} min-h-screen py-10 px-4 transition-colors duration-500`}>
      <h2 className={`text-3xl font-extrabold mb-6 text-center ${headingColor}`}>
        All Loans
      </h2>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Sidebar: Search, Filters, Sorting */}
        <aside className={`w-full md:w-1/4 p-4 border rounded-lg ${borderColor}`}>
          <h3 className={`font-semibold mb-4 ${textColor}`}>Search / Filter</h3>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by title or category"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={`w-full p-2 mb-3 rounded border ${borderColor} ${textColor} ${selectBg}`}
          />

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className={`w-full p-2 mb-3 rounded border ${borderColor} ${selectText} ${selectBg} appearance-none`}
          >
            <option value="">All Categories</option>
            {Array.from(new Set(loans.map(l => l.loan_category))).map((cat, idx) => (
              <option key={idx} value={cat} className={`${selectText} ${selectBg}`}>
                {cat}
              </option>
            ))}
          </select>

          {/* Interest Filter */}
          <select
            value={interestFilter}
            onChange={e => setInterestFilter(e.target.value)}
            className={`w-full p-2 mb-3 rounded border ${borderColor} ${selectText} ${selectBg} appearance-none`}
          >
            <option value="">All Interest Rates</option>
            <option value="low" className={`${selectText} ${selectBg}`}>Low (≤10%)</option>
            <option value="high" className={`${selectText} ${selectBg}`}>High (>10%)</option>
          </select>

          {/* Sorting */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className={`w-full p-2 rounded border ${borderColor} ${selectText} ${selectBg} appearance-none`}
          >
            <option value="">Sort By</option>
            <option value="interestAsc" className={`${selectText} ${selectBg}`}>Interest ↑</option>
            <option value="interestDesc" className={`${selectText} ${selectBg}`}>Interest ↓</option>
            <option value="maxLoanAsc" className={`${selectText} ${selectBg}`}>Max Loan ↑</option>
            <option value="maxLoanDesc" className={`${selectText} ${selectBg}`}>Max Loan ↓</option>
          </select>
        </aside>

        {/* Loan Cards */}
        <div className="w-full md:w-3/4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedLoans.length === 0 ? (
            <p className={`${textColor} col-span-full text-center`}>No loans found.</p>
          ) : (
            paginatedLoans.map(loan => (
              <div key={loan._id} className={`flex flex-col justify-between p-4 rounded-lg shadow-md ${cardBg} ${cardText}`}>
                <div>
                  <img
                    src={loan.image}
                    alt={loan.title}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-bold text-lg mb-1">{loan.title}</h3>
                  <p className="text-sm mb-1">Category: {loan.loan_category}</p>
                  <p className="text-sm mb-1">Interest: {loan.interest_rate}%</p>
                  <p className="font-semibold mb-3">Max Loan: ${loan.max_loan_limit.toLocaleString()}</p>
                </div>

                <Link to={`/view-details/${loan._id}`}>
                  <button className={`px-3 py-2 rounded-md w-full font-semibold ${btnColor} mt-auto`}>
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
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1
                ? 'bg-emerald-700 text-white'
                : `bg-gray-300 dark:bg-gray-700 dark:text-gray-300`
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
