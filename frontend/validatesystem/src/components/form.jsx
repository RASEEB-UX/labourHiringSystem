import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyFormComponent.css'; // Import CSS file for styling

const Form = () => {
  const navigate=useNavigate()
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
    setmsg("")
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
      setmsg('plz wait submitting data')
      const response = await axios.post('http://localhost:8000/api/users/register', formDataToSend);
      setmsg("Form Submission successfull")
      setTimeout(()=>{ navigate('/available')},2000)
      console.log(response.data); // Handle successful submission
     
    } catch (error) {
      setError('An error occurred. Please try again.'); // Handle error
    }
  };

  return (
    <div className="form-container">
      <h2>Enter Your Details</h2>
      {error && <p className="error-message">{error}</p>}
      {msg && <p className="infomessage">{msg}</p>}
      <form onSubmit={handleSubmit}>
       
        <div className="form-group-row">
          <div className="form-group-half">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" onChange={handleChange} required/>
          </div>
          <div className="form-group-half">
            <label htmlFor="adhaar">Adhaar:</label>
            <input type="text" id="adhaar" name="adhaar" onChange={handleChange}required />
          </div>
        </div>
        <div className="form-group-row">
          <div className="form-group-half">
            <label htmlFor="number">Number:</label>
            <input type="text" id="number" name="mobile" onChange={handleChange} required />
          </div>
          <div className="form-group-half">
            <label htmlFor="age">Age:</label>
            <input type="text" id="age" name="age" onChange={handleChange} required  placeholder='max age 70yrs'/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" name="photo" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills:</label>
          <input type="text" id="skills" name="skills" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="area">Area:</label>
          <input type="text" id="area" name="area" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
