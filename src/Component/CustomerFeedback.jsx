import React from 'react';
import { useTheme } from '../Theme/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

const feedbacks = [
    {
        name: 'Alice Johnson',
        feedback: 'LoanLink made the loan process super easy and fast!',
        img: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
        name: 'Michael Smith',
        feedback: 'I got approved within hours. Highly recommend this service.',
        img: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
        name: 'Sophia Lee',
        feedback: 'Excellent customer support and seamless experience!',
        img: 'https://randomuser.me/api/portraits/women/3.jpg'
    },
    {
        name: 'David Brown',
        feedback: 'Transparent and reliable. Got my funds without any hassle.',
        img: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    {
        name: 'Emily Davis',
        feedback: 'The fastest loan approval I have ever experienced!',
        img: 'https://randomuser.me/api/portraits/women/5.jpg'
    },
    {
        name: 'James Wilson',
        feedback: 'Friendly staff and excellent guidance throughout the process.',
        img: 'https://randomuser.me/api/portraits/men/6.jpg'
    },
    {
        name: 'Olivia Martinez',
        feedback: 'Simple application, quick approval, and helpful team.',
        img: 'https://randomuser.me/api/portraits/women/7.jpg'
    },
    {
        name: 'William Taylor',
        feedback: 'Highly recommended for anyone needing quick financial support.',
        img: 'https://randomuser.me/api/portraits/men/8.jpg'
    },
    {
        name: 'Ava Anderson',
        feedback: 'Seamless experience and very trustworthy service.',
        img: 'https://randomuser.me/api/portraits/women/9.jpg'
    },
    {
        name: 'Benjamin Thomas',
        feedback: 'Professional, fast, and reliable. Very satisfied!',
        img: 'https://randomuser.me/api/portraits/men/10.jpg'
    }
];

const CustomerFeedback = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const bgColor = isDark ? 'bg-gray-900' : 'bg-green-100';
    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
    const headingColor = isDark ? 'text-emerald-300' : 'text-emerald-800';


    return (
        <section className={`${bgColor} pb-16`}>
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className={`text-4xl sm:text-4xl font-black mb-12 ${headingColor}`}>
                    Customer Feedback
                </h2>
                <Swiper
                    loop={true}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    coverflowEffect={{
                        rotate: 15,       // subtle rotation for elegance
                        stretch: 0,       // no extra stretch, keeps it clean
                        depth: 100,       // decent depth for 3D feel
                        modifier: 1,      // moderate effect strength
                        scale: 0.85,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {feedbacks.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className={`p-6 rounded-lg shadow-lg ${cardBg} ${textColor}`}>
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-20 h-20 rounded-full mx-auto mb-4"
                                />
                                <p className="text-sm mb-2">"{item.feedback}"</p>
                                <h4 className="font-semibold">{item.name}</h4>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default CustomerFeedback;
