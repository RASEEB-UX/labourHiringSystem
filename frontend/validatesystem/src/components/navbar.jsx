import React, { useEffect, useState } from 'react';
import { MdMenu } from 'react-icons/md'; // Importing MdMenu from react-icons/md
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUsertype] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const handleChange = (e) => {//function to change user type
    console.log('sign in option is', e.target.value)

    navigate(`/${e.target.value}page`, {
      state: { userChoice: e.target.value }
    })
    setUsertype('')

  }//#5755FE
  const handleRegister = (e) => {
    if (e.target.value == 'user')
      return navigate('/userRegister')
    else
      return navigate('/register')
  }
 
  return (
    <nav className=" border  bg-[#5755FE] border-black bg-white-700 min-h-[10vh] shadow-sm shadow-black text-white relative ">
      <div className="flex px-3 lg:px-12  h-[10vh] justify-between items-center  ">
        {/* Logo */}
        <div className="ml-1 flex items-center justify-center  ">
          <img src="../../bigicon.jpg" alt="Logo" className="w-[50px] h-[50px] rounded-full mx-2 hover:scale-[1.5] transition duration-700" />
          <span className=" text-white   font-bolder text-lg whitespace-nowrap tracking-wider">LabourHub</span>
        </div>
        {/* Toggle Button */}
        <div className="block lg:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          <MdMenu className="" size={56} /> {/* Using MdMenu icon */}

        </div>

        {/* Navigation Links */}

        <ul className="hidden  text-2xl lg:flex justify-between   items-center gap-12 ">
          <li>
            <Link to="/" className=" hover:text-blue-700">Home</Link>
          </li>
          <li>
            <Link to="/features" className=" hover:text-blue-700">Features</Link>
          </li>
          <li>
            <Link to="/available" className=" hover:text-blue-700">Availability</Link>
          </li>
          <li>
            <Link to="/update" className=" hover:text-blue-700">update</Link>
          </li>
        </ul>
        <div className='hidden lg:block'>
          <select name="" id="" value={userType} className=' px-6 py-2 bg-red-300 text-white rounded-full text-2xl' onChange={handleChange}>
            <option value="">Sign In</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="worker">Worker</option>
          </select>
        </div>
      </div>
      <div className={`${isOpen ? 'h-[400px]  ' : 'h-[0px] '} overflow-hidden  bg-[#5755FE] z-index-[10] w-full absolute top-[10vh]  shadow-md text-[1.4rem] transition-all duration-500`}>
        <ul className=" w-full flex py-4 flex-col justify-center items-center gap-6">
          <li>
            <Link to="/" className=" hover:text-blue-900">Home</Link>
          </li>

          <li>
            <Link to="/features" className=" hover:text-blue-900">Features</Link>
          </li>
          <li>
            <Link to="/available" className=" hover:text-blue-9">Availability</Link>
          </li>
          <li>
            <Link to="/update" className=" hover:text-blue-9">Update</Link>
          </li>
          <li className='w-full px-3'>
            <select name="userType" id="" value={userType} className='w-full m-auto px-2 py-2 rounded-md text-center text-black ' onChange={handleChange}>
              <option value="" className=''>Sign In</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
              <option value="worker">worker</option>
            </select>
          </li>
          <li className='w-full px-3'>
            <select name="" id="" className='w-full m-auto px-2 py-2 rounded-md text-center text-black ' onChange={handleRegister}>
              <option value="">Register As</option>
              <option value="user">User</option>
              <option value="worker">Worker</option>
            </select>
          </li>      
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
