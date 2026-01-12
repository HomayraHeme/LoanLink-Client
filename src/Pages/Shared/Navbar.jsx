 import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { useTheme } from '../../Theme/ThemeContext';
import useAuth from '../../Hooks/useAuth';
import Logo from './Logo';
import Swal from 'sweetalert2';
import { FaMoon, FaSun, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.removeItem('access-token');
        Swal.fire({
          icon: 'success',
          title: 'Logged Out',
          text: 'You have been successfully logged out!',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Logout Failed',
          text: 'Something went wrong. Please try again.',
        });
      });
  };

  // Avatar setup
  const avatar = user?.photoURL ? (
    <img
      src={user.photoURL}
      alt="User avatar"
      className="h-8 w-8 rounded-full object-cover cursor-pointer"
      onClick={() => setProfileMenu((prev) => !prev)}
    />
  ) : (
    <div
      onClick={() => setProfileMenu((prev) => !prev)}
      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-white cursor-pointer ${
        isDark ? 'bg-emerald-800' : 'bg-emerald-600'
      }`}
    >
      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
    </div>
  );

  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isDark
        ? `text-gray-200 hover:bg-emerald-900/50 ${
            isActive ? 'bg-emerald-800 text-white' : ''
          }`
        : `text-white hover:bg-emerald-700/40 ${
            isActive ? 'bg-emerald-700 text-white' : ''
          }`
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 backdrop-blur transition-colors duration-300 text-white ${
          isDark
            ? 'bg-gradient-to-r from-gray-950 via-gray-900 to-emerald-950'
            : 'bg-gradient-to-r from-emerald-700 via-green-600 to-lime-400'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Logo />

            <nav className="hidden md:flex flex-1 justify-center items-center gap-1">
              <NavLink to="/" className={navClass}>
                Home
              </NavLink>
              <NavLink to="/all-loans" className={navClass}>
                All-Loans
              </NavLink>
              <NavLink to="/about" className={navClass}>
                About Us
              </NavLink>
              <NavLink to="/contact" className={navClass}>
                Contact
              </NavLink>
              {user && (
                <NavLink to="/dashboard" className={navClass}>
                  Dashboard
                </NavLink>
              )}
            </nav>

            <div className="ml-auto flex items-center gap-2 relative">
              {!user ? (
                <>
                  <NavLink to="/login" className="btn-primary">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="btn-secondary">
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="relative">
                    {avatar}
                    {/* Profile Dropdown Menu */}
                    {profileMenu && (
                      <div
                        className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg overflow-hidden border ${
                          isDark
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-200 text-gray-800'
                        }`}
                      >
                        <button
                          onClick={() => {
                            navigate('/profile');
                            setProfileMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                          Profile
                        </button>
                         
                        <button
                          onClick={() => {
                            handleLogOut();
                            setProfileMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="ml-2 px-2 py-2 rounded-md hover:bg-emerald-800/40 transition-colors"
                aria-label="Toggle theme"
                type="button"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <FaSun /> : <FaMoon />}
              </button>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setOpen((o) => !o)}
                  className="p-2 rounded-md hover:bg-emerald-800/40 transition-colors"
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

        {/* Mobile Dropdown */}
        {open && (
          <nav
            className={`md:hidden px-4 pb-4 transition-colors ${
              isDark ? 'bg-gray-900/95' : 'bg-emerald-700/20'
            }`}
          >
            <div className="flex flex-col gap-1">
              <NavLink to="/" className={navClass} onClick={() => setOpen(false)}>
                Home
              </NavLink>
              <NavLink
                to="/all-loans"
                className={navClass}
                onClick={() => setOpen(false)}
              >
                All-Loans
              </NavLink>
              <NavLink to="/about" className={navClass} onClick={() => setOpen(false)}>
                About Us
              </NavLink>
              <NavLink to="/contact" className={navClass} onClick={() => setOpen(false)}>
                Contact
              </NavLink>

              {user && (
                <NavLink
                  to="/dashboard"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </NavLink>
              )}

              <div className="mt-2 border-t border-white/10 pt-2 flex flex-col gap-2">
                {!user ? (
                  <>
                    <NavLink
                      to="/login"
                      className="btn-primary"
                      onClick={() => setOpen(false)}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="btn-secondary"
                      onClick={() => setOpen(false)}
                    >
                      Register
                    </NavLink>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleLogOut();
                        setOpen(false);
                      }}
                      className="btn btn-primary"
                      type="button"
                    >
                      Logout
                    </button>

                    <div className="flex items-center gap-2 px-3 py-2">
                      {avatar}
                      <span>{user?.name}</span>
                    </div>
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
