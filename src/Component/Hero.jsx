import React from 'react';
import ImageSlide from './imageSlide';
import { useTheme } from '../Theme/ThemeContext';
import { Link } from 'react-router';

const Hero = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // 🎨 Theme-based color classes
    const headingColor = isDark ? 'text-emerald-300' : 'text-emerald-800';
    const spanHighlight = isDark ? 'text-lime-400' : 'text-lime-400';
    const paragraphColor = isDark ? 'text-green-200' : 'text-green-700';
    const cardBg = isDark ? 'bg-gray-800' : 'bg-green-700';
    const cardInnerBg = isDark ? 'bg-gray-700' : 'bg-green-600';
    const cardText = isDark ? 'text-gray-200' : 'text-green-300';
    const sectionBg = isDark ? 'bg-gray-900' : 'bg-transparent';

    return (
        <section className={`max-w-7x mx-auto lg:px-8 py-10 sm:py-10 overflow-hidden ${sectionBg} transition-colors duration-500`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-5 items-center">

                    {/* Text Content */}
                    <div className="col-span-6 text-center lg:text-left mb-10 lg:mb-0">
                        <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 transition duration-1000 ease-out ${headingColor}`}>
                            Accelerate Your <span className={spanHighlight}>Path to Success</span>.
                        </h1>

                        <p className={`text-xl mb-8 transition duration-1000 delay-300 ease-out ${paragraphColor}`}>
                            Simple, fast, and secure financial solutions to help you achieve your goals.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                            <a href='#' className='btn-primary '>
                                Apply for loan
                            </a>

                            <a href="/all-loans" className='btn-secondary'>
                                Explore loans
                            </a>
                        </div>
                    </div>

                    {/* Image/Illustration Section */}
                    <div className="col-span-6 flex justify-center lg:justify-end">
                        <div className={`w-80 md:w-200 h-70 md:h-100 p-6 ${cardBg} rounded-xl shadow-2xl animate-pulse transition-colors duration-500`}>
                            <div className={`w-70 md:w-180 lg:w-120 h-60 md:h-90 ${cardInnerBg} rounded-lg flex items-center justify-center ${cardText} font-bold text-xl`}>
                                <ImageSlide className="w-60 md:w-170" />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
};

export default Hero;
