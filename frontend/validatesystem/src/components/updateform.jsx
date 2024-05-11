import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { addWorker } from '../redux/workerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateWorker } from '../redux/workerSlice';
function Updateform() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const data = useSelector((state) => state.workerStore.workers)
    const [formData, setFormData] = useState({
        // photo: null,
        // username: '',
        // adhaar: '',
        // mobile: '',
        // area: '',
        // age: '',
        // category: ''
    });
    useEffect(() => {
        if (location && location?.state?.userPhoneNumber) {
            const user = data.find((item) => item.mobile == location.state.userPhoneNumber)
            console.log('user is', user)
            setFormData(user)
        }


        else {
            navigate('/update')
        }

    }, [data])
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

            const response = await axios.put('http://localhost:8000/api/workers/update', formDataToSend);
            setmsg("Form submission succesfull")

            console.log(response.data.user)
            dispatch(updateWorker(formData)) // Handle successful submission
            setTimeout(() => { navigate(`/available/${response.data.user.category}`) }, 2000)
        } catch (error) {
            setmsg("")
            console.log(error)
            setError('An error occurred. Please try again.'); // Handle error
        }
    };
    console.log(formData)
    return (
        formData &&
        <div className="registerholder shadow-sm my-3 border border-black text-black mx-auto h-fit bg-[#FFFFFF] p-3 max-w-sm flex flex-col justify-center items-center">
            <h2 className='text-black my-1 tracking-wide font-semibold'>Updation Form</h2>
            {error && <p className="error-message">{error}</p>}
            {msg && <p className="infomessage">{msg}</p>}
            <form onSubmit={handleSubmit} className='w-full  text-black text-center flex flex-col'>
                <input readOnly className='my-2 p-2 w-full border border-black rounded-md' type="text" name="username" placeholder="Name" required onChange={handleChange} value={formData.username} />
                <input className='my-2 p-2 border border-black rounded-md' type="text" name="age" placeholder="Age max-70yrs" required onChange={handleChange} value={formData.age} />
                <input className='my-2 p-2 border border-black rounded-md' type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required value={formData.mobile} />
                <input className='my-2 p-2 border border-black rounded-md' type="text" name="area" placeholder="Area where it will work" required value={formData.area} onChange={handleChange} />

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
                <input type="submit" value="Update" className='bg-[#017EF4] mx-2 my-2 px-4 py-2 rounded-md shadow-md' />
            </form>
        </div>


    )
}
export default Updateform
