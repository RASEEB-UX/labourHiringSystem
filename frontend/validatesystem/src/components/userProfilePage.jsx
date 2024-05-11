import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
function UserProfile() {
  const [userData, setUserData] = useState({})
  const userEmail = useSelector((state) => state.userStore.userEmail)
  const dispatch = useDispatch()
  const getUserData = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/user/getuserdata', { email: userEmail })
      console.log(response.data)
      dispatch(addUser(response.data.user))
      setUserData(response.data.user)
    }
    catch (err) {
      console.log(err)
    }
  }
  console.log('user data is', userData)
  useEffect(() => {
    getUserData()
  }, [userEmail])
  return (
    userData && <div className='min-h-[90vh] flex flex-col  gap-3 justify-center items-center'>
      <div className="max-w-lg p-7 mx-auto min-h-[24rem]  bg-white shadow-lg rounded-lg   mb-1">
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
          <p className="text-sm text-gray-600 p-2"><strong>Email:</strong> {userData.email}</p>
          <button className='bg-[#4b48f0] w-full mx-auto  my-2 px-4 py-2 rounded-md shadow-xl'>Update</button>
        </div>
      </div>
    </div>

  );
}

export default UserProfile;

