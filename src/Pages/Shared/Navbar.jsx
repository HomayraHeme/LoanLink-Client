import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import logoImg from '../../assets/loanlogo-removebg-preview.png';

const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(
        typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light'
    );

    useEffect(() => {
        try {
            const raw = localStorage.getItem('user');
            setUser(raw ? JSON.parse(raw) : null);
        } catch {
            setUser(null);
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    const avatar = user?.photoURL ? (
        <img src={user.photoURL} alt="User avatar" className="h-8 w-8 rounded-full object-cover" />
    ) : (
        <div className="h-8 w-8 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-medium text-white">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
    );

    const navClass = ({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium text-white ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`;

    // button styles for auth actions
    const loginBtnClass =
        'px-3 py-2 rounded-md text-sm font-medium border border-white/25 text-white hover:bg-white/5';
    const registerBtnClass =
        'px-3 py-2 rounded-md text-sm font-semibold bg-lime-300 text-slate-800 hover:bg-lime-400';

    return (
        <>
            <header className="bg-gradient-to-r from-emerald-700 via-green-600 to-lime-400 text-white sticky top-0 z-40 backdrop-blur">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16 gap-4">
                        {/* LEFT: Logo */}
                        <div className="flex items-center">
                            <NavLink to="/" className="flex items-center gap-3">
                                <img src={logoImg} alt="LoanLink" className="h-10 w-auto" />
                                <span className="font-semibold hidden sm:inline">LoanLink</span>
                            </NavLink>
                        </div>

                        {/* CENTER: main links (centered on desktop) */}
                        <nav className="hidden md:flex flex-1 justify-center items-center gap-1">
                            <NavLink to="/" className={navClass}>Home</NavLink>
                            <NavLink to="/all-loans" className={navClass}>All-Loans</NavLink>

                            {!user && (
                                <>
                                    <NavLink to="/about" className={navClass}>About Us</NavLink>
                                    <NavLink to="/contact" className={navClass}>Contact</NavLink>
                                </>
                            )}

                            {user && <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>}
                        </nav>

                        {/* RIGHT: Auth controls + theme toggle */}
                        <div className="ml-auto flex items-center gap-2">
                            {/* Desktop auth buttons grouped to the end */}
                            <div className="hidden md:flex items-center gap-2">
                                {!user ? (
                                    <>
                                        <NavLink to="/login" className={loginBtnClass}>Login</NavLink>
                                        <NavLink to="/register" className={registerBtnClass}>Register</NavLink>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleLogout}
                                            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/5 text-white"
                                            type="button"
                                        >
                                            Logout
                                        </button>

                                        <button
                                            title={user.name || 'Profile'}
                                            onClick={() => navigate('/profile')}
                                            type="button"
                                            className="ml-1"
                                        >
                                            {avatar}
                                        </button>
                                    </>
                                )}

                                <button
                                    onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
                                    className="ml-2 px-2 py-2 rounded-md hover:bg-white/5 text-white"
                                    aria-label="Toggle theme"
                                    type="button"
                                >
                                    {theme === 'dark' ? '🌙' : '☀️'}
                                </button>
                            </div>

                            {/* Mobile controls: theme + menu button */}
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
                                    className="mr-2 px-2 py-2 rounded-md hover:bg-white/5 text-white"
                                    aria-label="Toggle theme"
                                    type="button"
                                >
                                    {theme === 'dark' ? '🌙' : '☀️'}
                                </button>

                                <button
                                    onClick={() => setOpen((o) => !o)}
                                    className="p-2 rounded-md hover:bg-white/5 text-white"
                                    aria-expanded={open}
                                    aria-label="Toggle menu"
                                    type="button"
                                >
                                    {open ? '✖' : '☰'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu: keep logical order, place login/register at the end */}
                {open && (
                    <nav className="md:hidden bg-white/5 px-4 pb-4">
                        <div className="flex flex-col gap-1">
                            <NavLink to="/" className={navClass} onClick={() => setOpen(false)}>Home</NavLink>
                            <NavLink to="/all-loans" className={navClass} onClick={() => setOpen(false)}>All-Loans</NavLink>

                            {!user ? (
                                <>
                                    <NavLink to="/about" className={navClass} onClick={() => setOpen(false)}>About Us</NavLink>
                                    <NavLink to="/contact" className={navClass} onClick={() => setOpen(false)}>Contact</NavLink>
                                </>
                            ) : (
                                <NavLink to="/dashboard" className={navClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
                            )}

                            <div className="mt-2 border-t border-white/10 pt-2 flex flex-col gap-2">
                                {!user ? (
                                    <>
                                        <NavLink to="/login" className={loginBtnClass} onClick={() => setOpen(false)}>Login</NavLink>
                                        <NavLink to="/register" className={registerBtnClass} onClick={() => setOpen(false)}>Register</NavLink>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setOpen(false);
                                            }}
                                            className="text-left px-3 py-2 rounded-md hover:bg-white/5 text-white"
                                            type="button"
                                        >
                                            Logout
                                        </button>

                                        <button
                                            onClick={() => {
                                                navigate('/profile');
                                                setOpen(false);
                                            }}
                                            className="text-left px-3 py-2 rounded-md hover:bg-white/5 flex items-center gap-2 text-white"
                                            type="button"
                                        >
                                            {avatar}
                                            <span>{user?.name}</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                )}
            </header>


        </>
    );
};

export default Navbar;