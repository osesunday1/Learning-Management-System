import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";


const Navbar = () => {


  const {navigate, isEducator, logoutHandler, userData} = useContext(AppContext)


  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");




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
            
          </div>
              {
                role ? (<button onClick={()=> logoutHandler()} className="bg-secondary text-white px-5 py-2 rounded-full cursor-pointer">Logout</button>) :
                (<button onClick={()=> navigate('/auth')} className="bg-secondary text-white px-5 py-2 rounded-full cursor-pointer">Sign In</button>)
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