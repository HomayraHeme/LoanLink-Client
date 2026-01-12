import React from 'react';
import { useTheme } from '../Theme/ThemeContext';

const services = [
    { title: "Home Loan", desc: "Get your dream home with easy EMI options.", icon: "🏠" },
    { title: "Personal Loan", desc: "Quick funds for personal needs.", icon: "💰" },
    { title: "Car Loan", desc: "Drive your dream car with minimal interest.", icon: "🚗" },
    { title: "Education Loan", desc: "Invest in your future with flexible plans.", icon: "🎓" }
];

const OurServices = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const bgColor = isDark ? 'bg-gray-900' : 'bg-green-100';
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
    const cardText = isDark ? 'text-gray-200' : 'text-gray-600';
    const cardHover = isDark ? 'hover:shadow-2xl' : 'hover:shadow-xl';
    const headingColor = isDark ? 'text-emerald-300' : 'text-emerald-800';


    return (
        <section className={`${bgColor} max-w-7x mx-auto lg:px-10 py-10 px-4`}>
            <h2 className={`text-4xl font-black mb-10 text-center ${headingColor}`}>Our Services</h2>
            <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                {services.map((service, idx) => (
                    <div key={idx} className={`p-6 rounded-lg shadow-md ${cardBg} ${cardText} transition ${cardHover}`}>
                        <div className="text-4xl mb-4">{service.icon}</div>
                        <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                        <p>{service.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurServices;
