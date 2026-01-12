import React from 'react';
import Hero from '../Component/hero';
import AvailableLoans from '../Component/AvailableLoans';
import HowItWorks from '../Component/HowItWorks';
import CustomerFeedback from '../Component/CustomerFeedback';
import OurServices from '../Component/OurServices';
import FAQ from '../Component/FAQ';
import Achievements from '../Component/Achivement';
import FinancialTips from '../Component/FinancialTips';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <AvailableLoans></AvailableLoans>
            <HowItWorks></HowItWorks>
            <Achievements></Achievements>
            <CustomerFeedback></CustomerFeedback>
            <OurServices></OurServices>
            <FinancialTips></FinancialTips>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;