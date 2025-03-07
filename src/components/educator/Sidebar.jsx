import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useContext } from "react";

const Sidebar = () => {

  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
  ];


  return isEducator && (

    <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col'>
      {menuItems.map((item) => (
        <NavLink key={item.path} to={item.path} end={item.path === '/educator'}
        className={({ isActive }) => 
          `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 
          ${isActive ? 'bg-indigo-50 border-r-4 border-indigo-500' 
          : 'hover:bg-gray-100 border-r-[6px] border-white hover:border-gray-100'}`
        }
        >
          <img src={item.icon} alt="" className="w-6 h-6" />
          <p className='md:block hidden text-center'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;