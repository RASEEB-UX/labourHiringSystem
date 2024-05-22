import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addUser, addUserType } from '../redux/userSlice';
function UserProfile() {
  const location = useLocation()
  const [userData, setUserData] = useState({})
  console.log('user page')
  const userMobile=useSelector((state)=>state.userStore.userMobile)
  const dispatch = useDispatch()
  const getUserData = async () => {
    try {
      const response = await axios.post('https://labourhiringsystem-1.onrender.com/api/user/getuserdata', { mobile:userMobile})
      console.log(response.data)
      dispatch(addUser(response.data.user))
      setUserData(response.data.user)
      // dispatch(addUserType(response.data.addUserType))
    }
    catch (err) {
      console.log(err)
    }
  }
  console.log('user data is', userData)
  useEffect(() => {
    getUserData()
  }, [location])
  return (
    Object.keys(userData).length !== 0 ? <div className=' min-h-[90vh] flex flex-col  gap-3 justify-center items-center'>
      <div className="w-full max-w-sm min-h-[24rem]  bg-white shadow-lg rounded-lg   mb-1 border border-gray-500">
        <div className="px-4 py-2 my-2  border-b flex flex-col items-center  justify-center">
          <img src={userData.photo} alt={userData.username} className="h-20 w-20 rounded-full" />
          <h2 className="text-xl font-bold text-gray-800 ">{userData.username}</h2>
        </div>
        <div className="p-4 my-2 text-center">
          <p className="text-sm text-gray-600 p-2"><strong>UserName:</strong> {userData.username}</p>
          <p className="text-sm text-gray-600 p-2"><strong>Mobile:</strong> {userData.mobile}</p>
          <p className="text-sm text-gray-600 p-2"><strong>Address:</strong> {userData.address}</p>
          <p className="text-sm text-gray-600 p-2"><strong>Gender:</strong> {userData.gender}</p>
          <p className="text-sm text-gray-600 p-2"><strong>Age:</strong> {userData.age}</p>
          <button className='bg-[#4b48f0] w-full mx-auto  my-2 px-4 py-2 rounded-md shadow-xl'>Update</button>
        </div>
      </div>
    </div> : <div className=' mx-auto text-center flex justify-center items-center min-h-[90vh]   '>
      <h2 className='w-[20rem] font-bold text-2xl flex justify-center items-center  p-12 bg-[#ffff] shadow-md border black hover:scale-110 transition-all duration-700 aspect-video hover:text-blue-700'>
        No Data Found With This Number</h2>
    </div>

  );
}

export default UserProfile;

