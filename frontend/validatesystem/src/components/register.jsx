import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { addWorker } from '../redux/workerSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { reauthenticateWithCredential } from 'firebase/auth';
function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    photo: '',
    username: '',
    mobile: '',
    area: '',
    age: '',
    category: '',
  });
  useEffect(() => {
    if (!location.state?.userPhoneNumber)
      navigate('/signin', { state: { navigateUrl: '/register' } })

  }, [])
  const [errors, setErrors] = useState({});
  const [msg, setmsg] = useState('');
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [apiSuccess, setApiSuccess] = useState('');
  const handleChange = (e) => {
    console.log(Object.keys(errors).length)
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value; // For file input, use files[0]
    console.log(newValue)
    setApiSuccess('')
    setApiError('')
    setmsg('')
    delete errors[name]
    setErrors(errors)
    setFormData((previousData) => ({
      ...previousData,
      [name]: newValue
    }));
  };
  const validateData = async () => {
    // Validation
    formData.mobile = location.state.userPhoneNumber
    const newErrors = {};
    if (!formData.username.trim() || !/^[a-zA-Z\s]+$/.test(formData.username.trim())) {
      newErrors.username = 'a valid username is required';
    }
    if (!formData.photo) {
      newErrors.photo = 'Photo is required';
    }
    if (!formData.area.trim() || !/^[a-zA-Z\s]+$/.test(formData.area.trim())) {
      newErrors.area = 'a valid area is required';
    }
    if (!formData.age.trim() || !/^\d+$/.test(formData.age.trim())) {
      newErrors.age = 'proper age is required';
    } else if (isNaN(formData.age.trim()) || parseInt(formData.age.trim()) <= 0) {
      newErrors.age = 'Age must be a valid number greater than 0';
    }
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'a valid mobile  number is required';
    }
    if (!formData.category.trim() || !/^[a-zA-Z\s]+$/.test(formData.category.trim())) {

      newErrors.category = 'Category is required';
    }
    // Set errors
    setErrors(newErrors);
    console.log('errors generated are ', newErrors)
    if (Object.keys(newErrors).length > 0) {
      return true; //if validateData function generated errors return from here dont go for api call
    }
    return false
    // If no errors, submit the form
  }
  const handleSubmit = async (e) => {
    console.log('handlesubmit called')
    e.preventDefault();
    setErrors('');
    setmsg('');
    setApiError('')
    setApiSuccess('')
    const errorPresent = validateData();///it returns true or false based on whether data is having error or not
    if (errorPresent)//if any error in userdata return dont go for api call
      return

    console.log('returned')

    // Create a new FormData instance
    const data = new FormData();

    // Append all fields from formData to data
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    })

    try {
      setmsg("Submitting Form Data")
      setSubmitting(true)
      const response = await axios.post('http://localhost:8000/api/workers/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSubmitting(false)
      setmsg('')
      dispatch(addWorker(response.data.user))
      setApiSuccess("User Registered Successfully")
      console.log(response.data);
    } catch (error) {
      setmsg('');
      setApiSuccess('')
      setSubmitting(false)

      console.log(error);
      if (error.response) {
        setApiError(error.response.data.message);
      }
      else if (error.request) {
        setApiError('Some Server Error Occurred');
      }
      // Handle error
    }
  };


  return (
    <div className='flex flex-col sm:flex-row justify-center items-center min-h-[90vh] gap-3 px-4'>
      <div className='min-h-[70vh] sm:my-2 sm:min-h-[90vh] sm:w-[50%] flex justify-center items-center'>
        <img src="../../slide1.jpg" alt="" className='bg-transparent mix-blend-multiply' />
      </div>
      <div className='min-h-[70vh] sm:min-h-[90vh]  min-w-[50%] sm:min-w-[50%] flex justify-center items-center'>
        <div className="registerholder shadow-sm my-2 border border-black text-black mx-auto min-h-[90vh] bg-[#FFFFFF] p-3 w-full max-w-sm flex flex-col justify-center items-center">
          <h2 className='text-black my-1 tracking-wide font-semibold'>Registration Form</h2>
          {apiError && <p className="error-message text-red-700">{apiError}</p>}
          {apiSuccess && <p className="error-message text-green-600">{apiSuccess}</p>}
          {msg && <p className="infomessage">{msg}</p>}
          <form onSubmit={handleSubmit} encType="multipart/form-data" className='w-full  text-black text-center flex flex-col'>
            <input className='my-2 p-2 w-full border border-black rounded-md' type="text" name="username" placeholder="Name" required onChange={handleChange} />
            {errors.username && <small className='text-red-500 text-center'>{errors.username}</small>}
            <input className='my-2 p-2 border border-black rounded-md' type="text" name="age" placeholder="Age max-70yrs" required onChange={handleChange} />
            {errors.age && <small className='text-red-500 text-center'>{errors.age}</small>}
            <input className='my-2 p-2 border border-black rounded-md' type="text" name="area" placeholder="Area where it will work" required onChange={handleChange} />
            {errors.area && <small className='text-red-500 text-center'>{errors.area}</small>}
            <input className='my-2 p-2 border border-black rounded-md fileinput' type="file" name="photo" onChange={handleChange} />
            {errors.photo && <small className='text-red-500 text-center'>{errors.photo}</small>}
            <select className='my-2 p-2 border border-black rounded-md' id="category" name="category" onChange={handleChange} value={formData.category} required>
              <option value="">Select Category</option>
              <option value="Mason">Mason</option>
              <option value="Labourer">Labourer</option>
              <option value="Tile Work">Tile Work</option>
              <option value="Shuttering">Shuttering</option>
              <option value="Colouring">Colouring</option>
              <option value="Pop Work">Pop Work</option>
              <option value="Slab Work">Slab work</option>
              <option value="Carpenter">Carpenter</option>
            </select>
            {errors.category && <small className='text-red-500 text-center'>{errors.category}</small>}
            <input type="submit" disabled={isSubmitting} value={isSubmitting ? "Submitting data..." : "Register"} className='bg-[#017EF4] mx-2 my-2 px-4 py-2 rounded-md shadow-md' />
          </form>
        </div>
      </div>

    </div>


  )
}
export default Register
