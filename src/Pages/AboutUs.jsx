import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../Theme/ThemeContext';
import { Link } from 'react-router'; // ✅ correct import

// Animation variants
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
};

const AboutUs = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // 🎨 Theme colors
    const bgColor = isDark ? 'bg-gray-900' : 'bg-green-100';
    const textColor = isDark ? 'text-gray-100' : 'text-gray-800';
    const headingColor = isDark ? 'text-emerald-300' : 'text-emerald-800';
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
    const cardText = isDark ? 'text-gray-300' : 'text-gray-600';
    const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';

    return (
        <section className={`${bgColor} ${textColor} py-24 transition-colors duration-500`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

                {/* --- Hero Section --- */}
                <motion.div
                    className="text-center space-y-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h1
                        className={`text-5xl sm:text-6xl font-extrabold ${headingColor}`}
                        variants={fadeUp}
                        custom={0}
                    >
                        Empowering Financial Freedom
                    </motion.h1>
                    <motion.p
                        className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-500 dark:text-gray-400"
                        variants={fadeUp}
                        custom={1}
                    >
                        At LoanLink, we’re transforming the way people access financial support — combining
                        technology, trust, and transparency to make lending simpler, faster, and smarter.
                    </motion.p>
                </motion.div>

                {/* --- Story Section --- */}
                <div className="lg:grid lg:grid-cols-2 gap-14 items-center">
                    <motion.img
                        src="https://img.freepik.com/free-vector/loans-isometric-composition-with-set-workplace-with-office-pictograms-finance_1284-28135.jpg"
                        alt="Our Story"
                        className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    />

                    <motion.div
                        className="space-y-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.h2
                            className={`text-4xl font-bold mb-4 ${headingColor}`}
                            variants={fadeUp}
                            custom={0}
                        >
                            Our Story
                        </motion.h2>
                        <motion.p className={`text-lg leading-relaxed ${cardText}`} variants={fadeUp} custom={1}>
                            LoanLink began with a mission to simplify access to credit for everyone. We connect
                            borrowers and financial institutions through a secure, technology-driven platform that
                            prioritizes speed, accuracy, and transparency.
                        </motion.p>
                        <motion.p className={`text-lg leading-relaxed ${cardText}`} variants={fadeUp} custom={2}>
                            Today, we’re proud to have served thousands of individuals and businesses — making
                            financial empowerment more accessible than ever before.
                        </motion.p>
                    </motion.div>
                </div>

                {/* --- Mission & Vision Section --- */}
                <motion.div
                    className={`py-16 border-y ${borderColor}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="grid md:grid-cols-2 gap-10 text-center md:text-left">
                        {[
                            {
                                title: 'Our Mission',
                                text: 'To empower people and businesses with fair, transparent, and accessible financial solutions — driving growth through innovation and trust.',
                            },
                            {
                                title: 'Our Vision',
                                text: 'To be the most trusted fintech brand that bridges financial gaps — helping communities thrive through smarter lending systems and human-centered technology.',
                            },
                        ].map((item, i) => (
                            <motion.div key={i} variants={fadeUp} custom={i}>
                                <h3 className={`text-3xl font-bold mb-3 ${headingColor}`}>{item.title}</h3>
                                <p className={`text-lg ${cardText}`}>{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* --- Stats Section --- */}
                <motion.div
                    className="text-center space-y-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h3 className={`text-4xl font-bold ${headingColor}`} variants={fadeUp} custom={0}>
                        Our Global Impact
                    </motion.h3>
                    <motion.p
                        className={`text-lg max-w-3xl mx-auto ${cardText}`}
                        variants={fadeUp}
                        custom={1}
                    >
                        We’ve empowered thousands of customers across borders with loans designed to meet real
                        needs — from homes and education to business growth and beyond.
                    </motion.p>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { number: '25K+', label: 'Loans Processed' },
                            { number: '98%', label: 'Customer Satisfaction' },
                            { number: '15+', label: 'Countries Served' },
                            { number: '120+', label: 'Global Partners' },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeUp}
                                custom={idx + 2}
                                whileHover={{ scale: 1.05 }}
                                className={`p-6 rounded-lg shadow-md hover:shadow-xl transition ${cardBg} ${cardText}`}
                            >
                                <h4 className={`text-4xl font-extrabold ${headingColor}`}>{stat.number}</h4>
                                <p>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* --- Core Values Section --- */}
                <motion.div
                    className="text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h3
                        className={`text-4xl font-bold mb-10 ${headingColor}`}
                        variants={fadeUp}
                        custom={0}
                    >
                        Our Core Values
                    </motion.h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Integrity',
                                desc: 'We build trust through honesty, transparency, and ethical practices that put people first.',
                            },
                            {
                                title: 'Innovation',
                                desc: 'We continuously evolve, using cutting-edge technology to simplify financial access for everyone.',
                            },
                            {
                                title: 'Customer Focus',
                                desc: 'Every decision we make revolves around providing the best experience for our users and partners.',
                            },
                        ].map((value, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeUp}
                                custom={idx + 1}
                                whileHover={{ scale: 1.05 }}
                                className={`p-8 rounded-lg shadow-md hover:shadow-xl transition-transform ${cardBg} ${cardText}`}
                            >
                                <h4 className="text-2xl font-semibold mb-3">{value.title}</h4>
                                <p>{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* --- CTA Section --- */}
                <motion.div
                    className="text-center mt-20 space-y-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h3
                        className={`text-3xl font-bold ${headingColor}`}
                        variants={fadeUp}
                        custom={0}
                    >
                        Ready to Build Your Financial Future?
                    </motion.h3>
                    <motion.p
                        className={`text-lg max-w-2xl mx-auto ${cardText}`}
                        variants={fadeUp}
                        custom={1}
                    >
                        Whether you’re applying for your first loan or expanding your business, LoanLink is here
                        to guide you — with speed, transparency, and trust.
                    </motion.p>
                    <motion.div variants={fadeUp} custom={2}>
                        <Link to="/all-loans">
                            <button className="btn-primary transition-transform hover:scale-105">
                                Get Started
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;
