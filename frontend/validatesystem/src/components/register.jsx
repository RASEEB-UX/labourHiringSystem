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
    labourDocument:'',
    aadhaar:'',
    password:''
  });
  
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
    console.log(formData)
    formData.mobile = location.state.userPhoneNumber
    const newErrors = {};
    if (!formData.username.trim() || !/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(formData.username.trim()) || formData.username.length<3 ||formData.username.length>20) {
      newErrors.username = 'a valid username is required (min 3,max 20 chars)';
    }
    if (!formData.photo) {
      newErrors.photo = 'Photo is required';
    }
    const strongPasswordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
    if (!strongPasswordRegex.test(formData.password))
      newErrors.password = 'password must include oneUppercase,OneLowercase,one number, one special character and min 8 ,max 10 chars'
    if (!formData.labourDocument) {
      newErrors.labourDocument = 'Labour Id card is required';
    }
    if (!formData.aadhaar) {
      newErrors.aadhaar= 'valid aadhaar card is required';
    }
    if (!formData.area.trim() || formData.area.length<3 ||formData.area.length>20 || !/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(formData.area.trim()  ) ) {
      newErrors.area = 'a valid area is required (min 3chars, max 20chars)';
    }
    if (!formData.age.trim()  || !/^\d+$/.test(formData.age.trim()) || formData.age<16||formData.age>70) {
      newErrors.age = 'proper age is required (min 16 , max 70yrs)';
    } 
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'a valid mobile  number is required';
    }
    if (!formData.category.trim() || !/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(formData.category.trim())) {

      newErrors.category = 'Category is required';
    }
    // Set errors
    setErrors(newErrors);
    console.log('errors generated are ', newErrors)
    if (Object.keys(newErrors).length > 0) {
      return true; //if validateData function generated errors return from here dont go for api call
    }
    console.log('returning')
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
    const errorPresent = await validateData();///it returns true or false based on whether data is having error or not
    if (errorPresent)//if any error in userdata return dont go for api call
    {
      console.log(errorPresent)
      return
    }
  
    

    // Create a new FormData instance
    const data = new FormData();

    // Append all fields from formData to data
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    })

    try {
      setmsg("Submitting Form Data")
      setSubmitting(true)
      const response = await axios.post('https://labourhiringsystem-1.onrender.com/api/pendingrequests/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSubmitting(false)
      setmsg('')
     
      setApiSuccess("User Document Submitted")
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
        <img src="../../transparentIcon.png" alt="" className=' ' />
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
            <input className='my-2 p-2 border border-black rounded-md' type="text" name="password" placeholder="Strong Password Needed" required onChange={handleChange} />
            {errors.password && <small className='text-red-500 text-center'>{errors.password}</small>}
            <label htmlFor="photo">Upload Photo</label>
            <input className='my-2 p-2 border border-black rounded-md fileinput' type="file" name="photo" id='photo' onChange={handleChange} />
            {errors.photo && <small className='text-red-500 text-center'>{errors.photo}</small>}
            <label htmlFor="labourCard">Upload LabourCard</label>
            <input className='my-2 p-2 border border-black rounded-md fileinput' id='labourCard' type="file" name="labourDocument" onChange={handleChange} />
            {errors.labourDocument && <small className='text-red-500 text-center'>{errors.labourDocument}</small>}
            <label htmlFor="AadhaarCard">Upload AadhaarCard</label>
            <input className='my-2 p-2 border border-black rounded-md fileinput' id='AadhaarCard' type="file" name="aadhaar" onChange={handleChange} />
            {errors.aadhaar && <small className='text-red-500 text-center'>{errors.aadhaar}</small>}
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
            <button className='hover:bg-[#017EF4] mx-2 my-2 px-4 py-2 rounded-md shadow-md' onClick={()=>navigate({pathname:'/signin'},{state:{navigateUrl:location.pathname}})}>Sign Up Using Another Number</button>
          </form>
        </div>
      </div>

    </div>


  )
}
export default Register
