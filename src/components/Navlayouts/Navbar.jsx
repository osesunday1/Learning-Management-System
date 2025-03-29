import React, { useContext, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { userData, setUserData } = useUser();
  const role = userData?.role;

  const { navigate } = useContext(AppContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Logout
  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    setUserData(null);
    navigate('/');
  };

  return (
    <header className="bg-secondary border-b border-gray-500 px-4 sm:px-10 md:px-14 lg:px-36 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <img
          onClick={() => {
            if (role === 'educator') navigate('/educator');
            else if (role === 'student') navigate('/course-list');
            else navigate('/');
          }}
          src={assets.logo}
          alt="Logo"
          className="w-28 lg:w-32 cursor-pointer"
        />

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center text-gray-700">
          {!role && (
            <>
              <Link to="/course-list" className="text-secondary">
                All Courses
              </Link>
              <button
                onClick={() => navigate('/auth')}
                className="bg-secondary text-white px-5 py-2 rounded-full hover:bg-secondary-100"
              >
                Sign In
              </button>
            </>
          )}

          {role === 'student' && (
            <>
              <Link to="/course-list">Courses</Link>
              <Link to="/my-enrollments">My Enrollments</Link>

              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded"
              >
                <option value="USD">USD ($)</option>
                <option value="NGN">NGN (₦)</option>
              </select>

              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <img
                  src={userData.photo || '/default-avatar.png'}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg z-50">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {role === 'educator' && (
            <>
              <Link to="/educator">Dashboard</Link>

              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <img
                  src={userData.photo || '/default-avatar.png'}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg z-50">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-gray-700">
          {!role && (
            <>
              <Link to="/course-list" onClick={() => setMobileMenuOpen(false)}>All Courses</Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/auth');
                }}
                className="bg-secondary text-white px-5 py-2 rounded-full"
              >
                Sign In
              </button>
            </>
          )}

          {role === 'student' && (
            <>
              <Link to="/course-list" onClick={() => setMobileMenuOpen(false)}>Courses</Link>
              <Link to="/my-enrollments" onClick={() => setMobileMenuOpen(false)}>My Enrollments</Link>

              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded"
              >
                <option value="USD">USD ($)</option>
                <option value="NGN">NGN (₦)</option>
              </select>

              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
              <button onClick={logoutHandler}>Logout</button>
            </>
          )}

          {role === 'educator' && (
            <>
              <Link to="/educator" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
              <button onClick={logoutHandler}>Logout</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;