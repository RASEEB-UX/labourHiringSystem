import React from 'react'
import { useState } from 'react';
import './register.css'
import axios from 'axios';
import { addUser } from '../redux/userslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Register() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
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

        try {
          const formDataToSend = new FormData();
          Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
          });
          setmsg("plz wait sending your data")
          const response = await axios.post('http://localhost:8000/api/users/register', formDataToSend);
          setmsg("Form submission succesfull")
   
          console.log(response.data.user)
          dispatch(addUser(response.data.user)) // Handle successful submission
         setTimeout(()=>{navigate(`/available/${formData.category}`)},2000)
        } catch (error) {
          setmsg("")
          console.log(error)
          setError('An error occurred. Please try again.'); // Handle error
        }
      };
    return (
        <div className='registercontainer'>
            <div className="registerholder">
                <h2>Registration Form</h2>
                {error && <p className="error-message">{error}</p>}
                {msg && <p className="infomessage">{msg}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Name" required onChange={handleChange} />
                    <input type="text" name="age" placeholder="Age max-70yrs" required onChange={handleChange}/>
                    <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
                    <input type="text" name="adhaar" placeholder="Adhaar Number" onChange={handleChange}  required />
                    <input type="text" name="area" placeholder="Area where it will work" required onChange={handleChange}/>
                    <input type="file" name="photo" accept="image/*" required className="fileinput" onChange={handleChange} />
                    <input type="text" name="skills" placeholder="Skills" required onChange={handleChange}/>
                    <select id="category" name="category" onChange={handleChange}  value={formData.category} required>
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
                    <input type="submit" value="Register" />
                </form>
            </div>

        </div>
    )
}
export default Register
