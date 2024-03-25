import React from 'react'
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { addUser } from '../redux/userslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    photo: null,
    username: '',
    adhaar: '',
    mobile: '',
    skills: '',
    area: '',
    age: '',
    category: ''
  });
  const [error, setError] = useState('');
  const [msg, setmsg] = useState('');


  const handleChange = (e) => {
    setError("")
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value; // For file input, use files[0]
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
setError('')
setmsg('')
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      const stripe =  loadStripe('pk_test_51Ox1OrSJpqWn0BrsNg5b3sKCOV0IUiq7X4CsdLEgQlNG88R1nhTx9up23iM3cplBrIha1CPKD1RDQXxHVATNH6Ec007pbrJ6Cn');
      setmsg("plz wait sending your data")
      const user =  axios.post('http://localhost:8000/api/users/register', formDataToSend);
      const response = axios.post('http://localhost:8000/api/users/checkoutSessionStripe');
      const [returnedStripy,returneduser,returnedresponse]=await Promise.all([stripe,user,response])
     // console.log(returnedresponse)
       const session = returnedresponse.data.session;
      const result = returnedStripy.redirectToCheckout({
         sessionId: session
      })
     // dispatch(addUser(response.data.user)) // Handle successful submission
     // setTimeout(() => { navigate(`/available/${formData.category}`) }, 2000)
    } catch (error) {
      setmsg("")
      console.log(error)
      setError('An error occurred. Please try again.'); // Handle error
    }
  };
  return (

    <div className="registerholder shadow-sm my-3 border border-black text-black mx-auto h-fit bg-[#FFFFFF] p-3 max-w-sm flex flex-col justify-center items-center">
      <h2 className='text-black my-1 tracking-wide font-semibold'>Registration Form</h2>
      {error && <p className="error-message">{error}</p>}
      {msg && <p className="infomessage">{msg}</p>}
      <form onSubmit={handleSubmit} className='w-full  text-black text-center flex flex-col'>
        <input className='my-2 p-2 w-full border border-black rounded-md' type="text" name="username" placeholder="Name" required onChange={handleChange} />
        <input className='my-2 p-2 border border-black rounded-md' type="text" name="age" placeholder="Age max-70yrs" required onChange={handleChange} />
        <input className='my-2 p-2 border border-black rounded-md' type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
        <input className='my-2 p-2 border border-black rounded-md' type="text" name="adhaar" placeholder="Adhaar Number" onChange={handleChange} required />
        <input className='my-2 p-2 border border-black rounded-md' type="text" name="area" placeholder="Area where it will work" required onChange={handleChange} />
        <input className='my-2 p-2 border border-black rounded-md fileinput' type="file" name="photo" accept="image/*" required onChange={handleChange} />
        <input className='my-2 p-2 border border-black rounded-md' type="text" name="skills" placeholder="Skills" required onChange={handleChange} />
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
        <input type="submit" value="Register" className='bg-[#017EF4] mx-2 my-2 px-4 py-2 rounded-md shadow-md' />
      </form>
    </div>


  )
}
export default Register
