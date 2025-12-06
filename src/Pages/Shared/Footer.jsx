import React from 'react';
import logoImg from '../../assets/loanlogo-removebg-preview.png'
const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-gradient-to-r from-emerald-700 via-green-600 to-lime-400 text-white p-10">
                <aside className="flex items-center gap-4">
                    <img src={logoImg} alt="LoanLink" className="h-12 w-auto rounded-md " />
                    <div>
                        <p className="font-semibold">LoanLink</p>
                        <p className="text-sm text-white/90">Providing reliable loans and financial services</p>
                    </div>
                </aside>
                <nav>
                    <h6 className="footer-title text-white">Services</h6>
                    <a className="link link-hover text-white/95">Branding</a>
                    <a className="link link-hover text-white/95">Design</a>
                    <a className="link link-hover text-white/95">Marketing</a>
                    <a className="link link-hover text-white/95">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title text-white">Company</h6>
                    <a className="link link-hover text-white/95">About us</a>
                    <a className="link link-hover text-white/95">Contact</a>
                    <a className="link link-hover text-white/95">Jobs</a>
                    <a className="link link-hover text-white/95">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title text-white">Legal</h6>
                    <a className="link link-hover text-white/95">Terms of use</a>
                    <a className="link link-hover text-white/95">Privacy policy</a>
                    <a className="link link-hover text-white/95">Cookie policy</a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;