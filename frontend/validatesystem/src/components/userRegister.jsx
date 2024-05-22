import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { addAuthStatus, addUser } from '../redux/userSlice';
import { addUserType } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { MdTurnedInNot } from 'react-icons/md';
function UserRegister() {
  const navigate = useNavigate()
  const location = useLocation()
  console.log('pathname of userregisterpage is',location.pathname)
  const phoneNumber = location.state?.userPhoneNumber
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    photo: '',
    username: '',
    mobile: '',
    address: '',
    age: '',
    gender: '',
    password: ''



  });
  const [apiMsg, setApiMsg] = useState('');
  const [apiErr, setApiErr] = useState('');
  const [msg, setmsg] = useState('');
  const [isSubmitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setApiMsg('')
    setmsg('')
    setApiErr('')
    const { name, value, files } = e.target;
    delete errors[name]
    setErrors(errors)
    const newValue = files ? files[0] : value; // For file input, use files[0]
    setFormData({
      ...formData,
      [name]: newValue
    });
  };
  const verifyData = () => {
    formData.mobile = location.state.userPhoneNumber
    const newErrors = {};
    console.log(formData)
    // Username validation
    if (!formData.username.trim() || formData.username.length < 3 || formData.username.length > 20 || !/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(formData.username.trim())) {
      newErrors.username = 'invalid username (min 3 , max 20 chars)';
    }
    // Phone number validation
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'invalid phoneNumber';
    }
    // Email validation
    // if (!formData.email || !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email))
    //   newErrors.email='valid email is required'
    // Age validation
    if (!formData.age.trim() || !/^\d+$/.test(formData.age.trim()) || formData.age < 16) {
      newErrors.age = 'a valid age is required (min 16 , max 70yrs)';
    }

    // Photo validation
    if (!formData.photo) {
      newErrors.photo = 'Photo is required';
    }
    // // Password validation
    // if (formData.password.length < 8) {
    //   newErrors.password = 'Password must be at least 8 characters long';
    // }
    if (!isNaN(formData.gender)) {
      newErrors.gender = 'invalid gender';
    }
    const strongPasswordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
    if (!strongPasswordRegex.test(formData.password))
      newErrors.password = 'password must include oneUppercase,OneLowercase,one number, one special character and min 8 ,max 10 chars'
    if (!formData.address.trim() || formData.address.length < 3 || formData.address.length > 20 || !/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(formData.address.trim())) {
      newErrors.address = 'valid address required (min 3 , max 20 chars)';
    }

    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors)
      setErrors(newErrors);
      return true
    }
    console.log('user data validated')
    return false

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('user data is', formData)
    setApiMsg('')
    setmsg('')
    setApiErr('')
    const errorsPresent = verifyData()//it returns true or false if any errors generated
    //if verifyData function generated some errors return from here also dont go for api call
    if (errorsPresent)//if errorsPresent==true return dont go for api call
      return
    //go for api call only when data is valid
    const data = new FormData();

    // Append all fields from formData to data
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    })

    try {
      setSubmitting(true)
      const response = await axios.post('http://localhost:8000/api/user/register', data, {
        withCredentials: true
      });
      console.log(response.data)
      setApiMsg('Registered Successfully')
      setmsg('')
      setSubmitting(false)
      navigate('/loginwithpassword')
    } catch (error) {
      setmsg("")
      setSubmitting(false)
      console.log(error)
      if (error.response)
        setApiErr(error.response.data.message || error.response.data.error);
      else if (error.request)
        return setApiErr('Server Connection Failed ')
      // Handle error
    }
  };
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center min-h-[90vh] border gap-3 border-green-700 px-5'>
      <div className='w-full my-3 sm:my-0 sm:w-[50%]  min-h-[50vh] sm:h-[90vh] flex justify-center items-center'>
        <img src="../../digital.png" alt="" className='bg-cover bg-no-repeat' />
      </div>
      <div className='w-full sm:w-[50%]'>
        <div className="registerholder shadow-md my-3 border border-black text-black mx-auto min-h-[80vh] bg-[#FFFF] p-3 w-full max-w-sm flex flex-col justify-center items-center">
          <h2 className='text-black my-1 tracking-wide font-semibold'>Registration Form</h2>
          {apiMsg && <p className="error-message">{apiMsg}</p>}
          {apiErr && <p className="error-message text-red-700 text-center">{apiErr}</p>}
          {msg && <p className="infomessage">{msg}</p>}
          <form onSubmit={handleSubmit} className='w-full  text-black text-center flex flex-col'>
            <input className='my-2 p-2 w-full border border-black rounded-md' type="text" name="username" placeholder="Name" required onChange={handleChange} value={formData.username} />
            {errors.username && <small className='text-red-600'>{errors.username}</small>}
            <input className='my-2 p-2 border border-black rounded-md' type="text" name="age" placeholder="Age max-70yrs" required onChange={handleChange} value={formData.age} />
            {errors.age && <small className='text-red-600'>{errors.age}</small>}
            <input className='my-2 p-2 border border-black rounded-md' type="text" name="address" placeholder="your address" required onChange={handleChange} value={formData.address} />
            {errors.address && <small className='text-red-600'>{errors.address}</small>}
            <input className='my-2 p-2 border border-black rounded-md' type="text" name="password" placeholder="Strong password" required onChange={handleChange} value={formData.password} />
            {errors.password && <small className='text-red-600'>{errors.password}</small>}

            <label htmlFor="">Upload your photo</label>
            <input className='my-2 p-2 border border-black rounded-md fileinput' type="file" name="photo" required onChange={handleChange} />
            {errors.photo && <small className='text-red-600'>{errors.photo}</small>}
            <select name="gender" className='my-2 p-2 border border-black rounded-md' value={formData.gender} onChange={handleChange}>
              <option value="">Gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            {errors.gender && <small className='text-red-600'>{errors.gender}</small>}
            <input type="submit" disabled={isSubmitting} value={isSubmitting ? 'submitting data' : 'Register'} className='bg-[#017EF4] mx-2 my-2 px-4 py-2 rounded-md shadow-md' />
          </form>
          <button className='text-underline hover:bg-[#017EF4]  mx-2 my-2 px-4 py-2 rounded-md shadow-md' onClick={() => navigate({pathname:'/signin'},{state:{navigateUrl:location.pathname}})}>Go Back To Mobile SignUp</button>
        </div>
      </div>

    </div>

  )
}
export default UserRegister

