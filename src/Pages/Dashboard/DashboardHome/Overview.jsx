 import React from 'react';
import { FaDollarSign, FaFileInvoice, FaClock, FaCheckCircle } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Overview = () => {
    // Mock dynamic data - in production, fetch this from your API
    const stats = [
        { id: 1, label: 'Total Loan Amount', value: '$52,000', icon: <FaDollarSign />, color: 'bg-blue-500' },
        { id: 2, label: 'Active Applications', value: '12', icon: <FaFileInvoice />, color: 'bg-purple-500' },
        { id: 3, label: 'Pending Approval', value: '5', icon: <FaClock />, color: 'bg-yellow-500' },
        { id: 4, label: 'Total Repaid', value: '$18,400', icon: <FaCheckCircle />, color: 'bg-green-500' },
    ];

    const chartData = [
        { name: 'Jan', loans: 4000 },
        { name: 'Feb', loans: 3000 },
        { name: 'Mar', loans: 2000 },
        { name: 'Apr', loans: 2780 },
        { name: 'May', loans: 1890 },
    ];

    return (
        <div className="space-y-8">
            {/* 📊 Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.id} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
                        <div className={`p-4 rounded-lg text-white ${stat.color}`}>{stat.icon}</div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* 📈 Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4">Loan Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="loans" fill="#10B981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4">Repayment Trend</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="loans" stroke="#3B82F6" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;