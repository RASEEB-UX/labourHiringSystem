// AdminPage.js
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { addUser } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaCog, FaHome, FaComment, FaAdn } from 'react-icons/fa'
import axios from 'axios';

const AdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userEmail = useSelector((state) => state.userStore.userEmail)
  const dispatch = useDispatch()
  const addAdminData = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/admin/getadmindata', { email: userEmail })
      console.log(response.data)
      dispatch(addUser(response.data.user))
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    addAdminData()
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-[90vh] bg-[#E9EEFA]">
      {/* Sidebar */}
      <div
        className={`w-0  min-[700px]:w-[15rem] bg-[#2E53DA] text-gray-100 h-full  rounded-lg
        `}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          {/* Sidebar Links */}
          <ul>
            <li className="py-2 flex  hover:text-black hover:bg-[#FFFFFE]  rounded-full items-center justify-center gap-2">
              <span><FaHome size={23} /></span>
              <Link to={{ pathname: '/adminpage' }} state={{ userChoice: 'admin' }} className=" hover:text-black  px-4 py-2  block">
                Home
              </Link>
            </li>
            <li className="py-2 flex hover:text-black hover:bg-[#FFFFFE] rounded-full items-center justify-center gap-2">
              <span><FaComment size={23} /></span>
              <Link to={{ pathname: '/adminpage/getallfeedbacks' }} state={{ userChoice: 'admin' }} className=" hover:text-black   px-4 py-2  block">
                Feedback
              </Link>
            </li>
            <li className="py-2 flex hover:text-black hover:bg-[#FFFFFE] rounded-full items-center justify-center gap-2">
              <span><FaAdn size={23} /></span>
              <Link to='#'  className=" hover:text-black   py-2  px-4 block">
                Advertisement
              </Link>
            </li>
            <li className="py-2 flex hover:text-black hover:bg-[#FFFFFE]  rounded-full   items-center justify-center gap-2 ">
              <span><FaCog size={23} /></span>
              <Link to="#" className=" hover:text-black    py-2 px-4 block">
                Settings
              </Link>
            </li>

            {/* Add more sidebar links as needed */}
          </ul>
        </div>

        {/* User Section */}

      </div>

      {/* Main Content */}
      <div className="flex-1 border-2 border-red-900">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
