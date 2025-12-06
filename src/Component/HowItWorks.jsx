import React from 'react';
import { useTheme } from '../Theme/ThemeContext';
import { FaRegClipboard, FaRegCreditCard, FaCheckCircle } from 'react-icons/fa';

const HowItWorks = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const bgColor = isDark ? 'bg-gray-900' : 'bg-green-100';
    const stepBg = isDark ? 'bg-gray-800' : 'bg-white';
    const stepText = isDark ? 'text-white' : 'text-gray-900';
    const headingColor = isDark ? 'text-emerald-300' : 'text-emerald-800';

    const steps = [
        {
            icon: <FaRegClipboard size={30} />,
            title: 'Submit Application',
            desc: 'Fill out a simple application form to start the process.'
        },
        {
            icon: <FaRegCreditCard size={30} />,
            title: 'Get Approval',
            desc: 'We quickly review your application and approve it.'
        },
        {
            icon: <FaCheckCircle size={30} />,
            title: 'Receive Funds',
            desc: 'Once approved, the funds are transferred to your account instantly.'
        },
    ];

    return (
        <section className={`${bgColor} py-16 w-11/12 mx-auto`}>
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className={`text-4xl sm:text-4xl font-black mb-12 ${headingColor}`}>
                    How It Works
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-lg shadow-lg flex flex-col items-center text-center ${stepBg} ${stepText}`}
                        >
                            <div className="mb-4 text-green-600">{step.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-sm">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
