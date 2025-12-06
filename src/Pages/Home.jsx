import React from 'react';
import Hero from '../Component/hero';
import AvailableLoans from '../Component/AvailableLoans';
import HowItWorks from '../Component/HowItWorks';
import CustomerFeedback from '../Component/CustomerFeedback';
import OurServices from '../Component/OurServices';
import FAQ from '../Component/FAQ';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <AvailableLoans></AvailableLoans>
            <HowItWorks></HowItWorks>
            <CustomerFeedback></CustomerFeedback>
            <OurServices></OurServices>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;