import React, { useState } from 'react';
import { useTheme } from '../Theme/ThemeContext';

const faqs = [
    { q: "What is the minimum loan amount?", a: "The minimum loan amount starts from $5000 depending on the loan type." },
    { q: "How fast can I get approval?", a: "Most loans are approved within 24 hours after verification." },
    { q: "Are there any hidden charges?", a: "No, we believe in complete transparency." },
    { q: "Can I prepay my loan?", a: "Yes, you can prepay anytime without extra penalty." }
];

const FAQ = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [openIndex, setOpenIndex] = useState(null);
    const toggleFAQ = index => setOpenIndex(openIndex === index ? null : index);

    const sectionBg = isDark ? 'bg-gray-900' : 'bg-green-100s';
    const textColor = isDark ? 'text-white' : 'text-emerald-800';
    const borderColor = isDark ? 'border-gray-700' : 'border-gray-300';
    const answerText = isDark ? 'text-gray-300' : 'text-gray-600';
    const headingColor = isDark ? 'text-emerald-300' : 'text-emerald-800';


    return (
        <section className={`${sectionBg} max-w-7x lg:px-10 mx-auto py-16 px-4`}>
            <h2 className={`text-4xl font-black mb-10 text-center ${headingColor}`}>Frequently Asked Questions</h2>
            <div className="max-w-7xl mx-auto space-y-4">
                {faqs.map((faq, idx) => (
                    <div
                        key={idx}
                        className={`border rounded-lg p-4 cursor-pointer ${borderColor}`}
                        onClick={() => toggleFAQ(idx)}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className={`font-semibold text-lg ${textColor}`}>{faq.q}</h3>
                            <span className={`font-bold ${textColor}`}>{openIndex === idx ? "-" : "+"}</span>
                        </div>
                        {openIndex === idx && <p className={`mt-2 ${answerText}`}>{faq.a}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
