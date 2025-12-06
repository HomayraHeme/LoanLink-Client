import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectFlip, Pagination, Navigation, Autoplay } from 'swiper/modules';

export default function ImageSlide() {
    return (

        <>
            <Swiper
                effect={'flip'}
                grabCursor={true}
                pagination={true}
                navigation={true}
                modules={[EffectFlip, Pagination, Navigation, Autoplay]}
                autoplay={{ delay: 1500, disableOnInteraction: true }}
                className="mySwiper w-60 md:w-160 lg:w-110 h-50 md:h-80"
                loop={true}
            >
                <SwiperSlide>
                    <img className='w-100 md:w-160 lg:w-110 h-50 md:h-80 rounded-2xl' src="https://img.freepik.com/free-photo/account-assets-audit-bank-bookkeeping-finance-concept_53876-124924.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-60 md:w-160 lg:w-110 h-50 md:h-80 rounded-2xl' src="https://img.freepik.com/premium-photo/glass-jar-with-money-education-wooden-table-against-green-background_392895-110440.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-60 md:w-160 lg:w-110 h-50 md:h-80 rounded-2xl' src="https://img.freepik.com/free-photo/closeup-shot-person-thinking-buying-selling-house_181624-19919.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-60 md:w-160 lg:w-110 h-50 md:h-80 rounded-2xl' src="https://img.freepik.com/free-vector/mortgage-loan-home-purchase-mobile-application-with-credit-score-property-buy-build_107791-3939.jpg" />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
