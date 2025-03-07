import { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';

import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
  const [educatorName, setEducatorName]= useState(null);
  const {userData} = useContext(AppContext)

useEffect(() => {
  if (userData) { 
    setEducatorName(userData);
  }
}, [userData]); 

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className="w-28 lg:w-32" />
      </Link>
      <div className="flex items-center gap-5 text-gray-500 relative">
        {educatorName ? "Hi " + educatorName.name : <p>Hi! Admin</p>}
      </div>
    </div>
  )
}



export default Navbar;