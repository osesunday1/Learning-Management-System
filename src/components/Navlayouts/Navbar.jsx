import React, { useContext, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';


const Navbar = () => {

  const { userData, setUserData } = useUser();
  const role = userData?.role;

  const {navigate} = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);


      // Logout
    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        setUserData(null);
        navigate("/");
    };

  return (
    <header className={`flex items-center justify-between px-p4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 'bg-primary'}`}>
            
            {/* Logo */}
      <img 
        onClick={() => {
          if (role === "educator") navigate("/educator");
          else if (role === "student") navigate("/course-list");
          else navigate("/");
        }}
        src={assets.logo} alt="Logo" className='w-28 lg:w-32 cursor-pointer' 
      />

      <nav className="flex gap-4">
        {!role && (
          <>
            <div className="hidden md:flex items-center gap-5 text-gray-500">
                <div className="flex items-center gap-5">
                    <div className="text-secondary">

                    <Link to='/course-list' className="mx-4"> All Courses</Link>
                
                    </div>
                </div>

                 <button onClick={()=> navigate('/auth')} className="bg-secondary text-white px-5 py-2 rounded-full cursor-pointer hover:bg-secondary-100">Sign In</button>
            </div>
          </>
        )}

        {role === 'student' && (
          <>
            <Link to="/course-list">Courses</Link>
            <Link to="/my-enrollments">My Enrollments</Link>
            
            <div 
                className="relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                {/* User Image */}
                <img 
                    src={userData.photo || "/default-avatar.png"} 
                    alt="User Avatar" 
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:border-gray-400"
                />

                {/* Invisible buffer to prevent flickering */}
                <div className="absolute top-full w-full h-2"></div>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div 
                        className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg z-50"
                    >
                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                        <button 
                            onClick={logoutHandler} 
                            className="w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
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
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                {/* User Image */}
                <img 
                    src={userData.photo || "/default-avatar.png"} 
                    alt="User Avatar" 
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:border-gray-400"
                />

                {/* Invisible buffer to prevent flickering */}
                <div className="absolute top-full w-full h-2"></div>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div 
                        className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg z-50"
                    >
                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                        <button 
                            onClick={logoutHandler} 
                            className="w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>


          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;