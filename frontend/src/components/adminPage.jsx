// AdminPage.js
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { addUser } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { removeAdvertisement } from '../redux/advertisementSlice';
import { FaCog, FaHome, FaComment, FaAdn, FaTimes } from 'react-icons/fa'
import { MdMenu } from 'react-icons/md'; // Importing MdMenu from react-icons/md
import axios from 'axios';

const AdminPage = () => {
  const [openSidebar, setIsSidebarOpen] = useState(false);
  const userEmail = useSelector((state) => state.userStore.userEmail)
  const advertisementStore = useSelector((state) => state.advertisementStore)
  const advertisementId = advertisementStore.advertisementObj._id
  console.log(advertisementId)
  const dispatch = useDispatch()
  const addAdminData = async () => {
    try {
      const response = await axios.post('https://labourhiringsystem-1.onrender.com/api/admin/getadmindata', { email: userEmail })
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

  const toggleSidebar = (id) => {
    setIsSidebarOpen(!openSidebar);
  };
  const handleRemoveAdvertisement = async () => {
    try {
      console.log(advertisementId)
      const response = await axios.delete('https://labourhiringsystem-1.onrender.com/api/advertisement/removeAdvertisement', { data: { id: advertisementId } })
      console.log(response.data)
      alert('Adevrtisement Removed Successfully')
      dispatch(removeAdvertisement())
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="flex h-[90vh] bg-[#E9EEFA]" >
      {/* Sidebar */}
      <div
        className={`w-0 min-[700px]:w-[15rem]  bg-[#5755FE] text-gray-100 h-full transition-all rounded-lg
  ${openSidebar ? ' absolute w-[15rem]' : ''}`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 max-[700px]:flex  max-[700px]:justify-around gap-6 whitespace-nowrap">Admin Panel
            <span className='block min-[700px]:hidden' onClick={toggleSidebar}><FaTimes size={34} /></span>
          </h2>
          {/* Sidebar Links */}
          <table className=' w-full  flex justify-center '>
            <tbody className='p-9 '>
              <tr className=''>
                <td><FaHome size={23} /></td>
                <td><Link to={{ pathname: '/adminpage' }} state={{ userChoice: 'admin' }} className=" hover:text-black  px-4 py-2  block">Home</Link></td>
              </tr>
              <tr>
                <td><FaComment size={23} /></td>
                <td><Link to={{ pathname: '/adminpage/getallfeedbacks' }} state={{ userChoice: 'admin' }} className=" hover:text-black   px-4 py-2  block">Feedback</Link></td>
              </tr>
              {
                advertisementStore.advertisementPresent ?
                  <tr>
                    <td><FaAdn size={23} /></td>
                    <td><h2 onClick={() => handleRemoveAdvertisement()} className="cursor-pointer hover:text-black   py-2  px-4 block"> Remove Advertisement</h2></td>
                  </tr> : <tr>
                    <td><FaAdn size={23} /></td>
                    <td><Link to={{ pathname: '/adminpage/advertisement' }} state={{ userChoice: 'admin' }} className=" hover:text-black   py-2  px-4 block"> Add Advertisement</Link></td>
                  </tr>
              }


              <tr>
                <td><FaComment size={23} /></td>
                <td><Link to={{ pathname: '/adminpage/getpendingrequests' }} state={{ userChoice: 'admin' }} className=" hover:text-black    py-2 px-4 block">Pending Requests</Link></td>
              </tr>
             
            </tbody>
          </table>
        </div>
      </div>


      {/* Main Content */}
      <div className="flex-1 border-2 border-purple-800 overflow-y-auto px-2">
        <h2 className='min-h-[12vh] rounded-sm bg-[#5755FE]  px-2 shadow-md my-2  text-center flex justify-around min-[700px]:justify-center items-center text-2xl font-extrabold mx-auto'>
          <span className='block min-[700px]:hidden' onClick={toggleSidebar}><MdMenu size={54} /></span>
          Welcome Back
        </h2>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
