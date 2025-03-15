import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import useFetch from "../customHooks/useFetch";

const Navbar = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const {navigate, isEducator, logoutHandler} = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false);
  
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userID = localStorage.getItem("userID");

  //////==================get all userdata==========\\\\\\\\\\\\
  // ✅ Fetch user only if userData exists
  const { data: fetchedUser } = useFetch(userID ? `${apiUrl}/users/me` : null);

  // ✅ Store user
  const [userData, setUserData] = useState([]);
  useEffect(() => {
      if (fetchedUser) setUserData(fetchedUser);
  }, [fetchedUser]);
  // Toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);



  return (
    <div className={`flex items-center justify-between px-p4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 'bg-primary'}`}>
    
      {/* Logo */}
      <img onClick={()=> navigate('/')} src={assets.logo} alt="Logo" className='w-28 lg:w-32 cursor-pointer' />
      
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
          <div className="flex items-center gap-5">
            <div className="text-secondary">

            <Link to='/course-list' className="mx-4"> All Courses</Link>
            { role === "student" && <Link to='/my-enrollments' className="mx-4"> My Enrollments </Link> }

            </div>

            {userID && (
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
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                    Logout
                </button>
            </div>
        )}
    </div>
)}
            
          </div>
              {
                !userID && (<button onClick={()=> navigate('/auth')} className="bg-secondary text-white px-5 py-2 rounded-full cursor-pointer hover:bg-secondary-100">Sign In</button>)
              }
              
      </div>






      {/* for mobile screens */}
      <div className="md:hidden flex items-center gap-2 sm:gap5 text-gray-500">
         <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs text-secondary">
            
              <>
              <button onClick={()=>{navigate('/educator')}}>{ isEducator ? 'Counselor Dashboard' : 'Become Counsellor'}</button>
              | <Link to='/my-enrollments'> My Enrollments</Link>
              </>
           
         </div>

            {
            <button onClick={()=> navigate('/auth')}><img src={assets.user_icon} alt=""/>Logout</button>
            }
         
      </div>
    </div>
  );
};

export default Navbar;