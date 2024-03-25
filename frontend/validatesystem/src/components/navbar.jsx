import React, { useEffect, useState } from 'react';
import { MdMenu } from 'react-icons/md'; // Importing MdMenu from react-icons/md
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const [ispath, setpath] = useState(false)
  const changenav = () => {
    let vwidth = window.innerWidth
    let path = window.location.pathname
    var userpath = /^\/available.*$/
    //console.log('path is ', path)
    // console.log('width is ', vwidth)
    //console.log('width is correct', vwidth <= 512)
    //console.log('path is correct', userpath.test(path))
    if (vwidth <= 512 && userpath.test(path)) {
      setpath(true)
    }
    else {
      setpath(false)
    }
  }
  window.addEventListener('resize', () => {
    changenav()
  })
  useEffect(() => {
    console.log("hi")
    setIsOpen(false)
    changenav()
  }, [location])
  if (ispath)
    return null
  return (
    <nav className=" border  border-black bg-white-700 min-h-12 text-black relative transition duration-500">
      <div className="flex px-6 justify-between items-center transition-all duration-900 ">
        {/* Logo */}
        <div className="ml-1 flex items-center">
          <img src="../../baby.jpg" alt="Logo" className="h-9 w-9 object-cover rounded-full mr-2" />
          <span className="text-black font-bold text-lg whitespace-nowrap tracking-wider">LabourHub</span>
        </div>

        {/* Toggle Button */}
        <div className="block lg:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          <MdMenu className="" size={56} /> {/* Using MdMenu icon */}

        </div>

        {/* Navigation Links */}

        <ul className="hidden  text-2xl lg:flex justify-between h-full  items-center gap-12">
          <li>
            <Link to="/" className=" hover:text-blue-700">Home</Link>
          </li>
          <li>
            <Link to="/features" className=" hover:text-blue-700">Features</Link>
          </li>
          <li>
            <Link to="/available/all" className=" hover:text-blue-700">Availability</Link>
          </li>
          <li>
            <Link to="/update" className=" hover:text-blue-700">update</Link>
          </li>
        </ul>

        {/* Register Button */}

        <button className="hidden lg:block px-4 py-2 bg-[#5295DB]  rounded-lg" onClick={() => navigate('/register')}>
          Register
        </button>

      </div>
      <div className={`${isOpen ? 'block  ' : 'hidden '} overflow-hidden h-fit bg-blue-200 w-full py-3 text-[1.4rem]`}>
        <ul className=" w-full flex py-4 flex-col justify-center items-center gap-6">
          <li>
            <Link to="/" className=" hover:text-blue-900">Home</Link>
          </li>
          <li>
            <Link to="/features" className=" hover:text-blue-900">Features</Link>
          </li>
          <li>
            <Link to="/available/all" className=" hover:text-blue-9">Availability</Link>
          </li>
          <li>
            <Link to="/update" className=" hover:text-blue-9">Update</Link>
          </li>
        </ul>
        <button className='px-4 py-1 bg-[#5295DB] block rounded-lg mx-auto' onClick={() => navigate('/register')}>Register</button>
      </div>


    </nav>
  );
};

export default Navbar;
