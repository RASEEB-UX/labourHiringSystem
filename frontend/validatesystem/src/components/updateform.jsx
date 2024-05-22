import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import axios from 'axios';
import { addWorker } from '../redux/workerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateWorker } from '../redux/workerSlice';
import { addUser } from '../redux/userSlice';
import { MdTableRestaurant } from 'react-icons/md';
function Updateform() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [apiErr, setApiErr] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const [msg, setmsg] = useState('');
    const [errors, setErrors] = useState({ newNumber: '', area: '', age: '', category: '' });
    const [apiSuccess, setApiSuccess] = useState('');
    console.log(location)
    const oldNumber = useSelector((state) => state.userStore.userMobile)
    console.log('old number is',oldNumber)
    const [mobileDoesntExists, setMobileDoesntExists] = useState(false)
    useEffect(() => {
        if (!location && !location?.state?.userPhoneNumber) {
            navigate('/loginwithpassword')
        }

    }, [])


    const handleChange = (e) => {
    
        setApiErr("")
        setmsg('')
        setApiSuccess('')
        const { name, value, files } = e.target;
        console.log(name, value)
        setErrors({ ...errors, [name]: '' })     //delete error for input box in which user is typig
    };
    const validateData = (data) => {
        let newErrors = {}
        console.log('data received in validatedata function is', data)
        console.log(!/^\d{10}$/.test(data.oldNumber))
        if ( !data.newNumber || !/^\d{10}$/.test(data.newNumber) )
            newErrors.newNumber = 'a valid 10 digit number required'
        if (!data.age || !/^[1-9][0-9]*$/.test(data.age) || data.age < 16 || data.age > 70)
            newErrors.age = 'valid age required (min 16,max 70)'
        if (!data.area || !/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(data.area) || data.area.length < 3 || data.area.length > 20)
            newErrors.area = 'valid area is required (min 3,max 20chars)'
        if (!data.category || !/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(data.category) || data.category.length < 3 || data.category.length > 70)
            newErrors.category = 'valid category is required (min 3,max 70 chars)'
        if (Object.keys(newErrors).length > 0) {
            console.log('errors created are', newErrors)
            setErrors(newErrors)
            return true
        }
        console.log(newErrors)
        return false//if everything fine now error generated return true
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setApiErr('')
            setApiSuccess('')
            const data = new FormData(e.target);
            const formData = {}//collection object for form data which user entered
            data.entries().forEach(([key, value]) => {
                formData[key] = value
            });
            console.log('user entered data is', formData)
            formData.newNumber = location.state.userPhoneNumber
            formData.oldNumber=oldNumber
            console.log(formData)
            const invalidData = validateData(formData)//send data for validation return true or false
            if (invalidData)
                return//if invalid data return
            console.log('errors present', invalidData)
            setmsg("Submitting Data ....")
            setSubmitting(true)
            const response = await axios.put('https://labourhiringsystem-1.onrender.com/api/workers/update', formData,{withCredentials:true});
            setApiSuccess('Updated Successfully')
            setSubmitting(false)
            setmsg('')
            console.log(response.data.user)
            dispatch(updateWorker({data:response.data.user,oldNumber:oldNumber})) // Handle successful submission
            dispatch(addUser(response.data.user))
        } catch (err) {
            setmsg("")
            setSubmitting(false)
            setApiSuccess('')
            if (err.response) {
                setApiErr(err.response.data.message)
                return
            }
            if (err.request)
                setApiErr(' Server Error')
        }
    };

    return (

            <div className='flex flex-col sm:flex-row min-h-[90vh] sm:h-[90vh] px-3'>
                <div className='min-h-[70vh] sm:my-2 sm:min-h-[90vh] sm:w-[50%] flex justify-center items-center'>
                    <img src="../../slide1.jpg" alt="" className='bg-transparent mix-blend-multiply' />
                </div>
                <div className="registerholder  w-full sm:w-[50%] my-3  text-black mx-auto min-h-[80vh]    flex flex-col justify-center items-center">
                    <div className='w-full max-w-sm  border  border-black shadow-md  p-12 text-center'>
                        <h2 className='text-black my-1 tracking-wide font-semibold'>Updation Form</h2>
                        {apiErr && <p className="apiErr-message text-red-700 text-center">{apiErr}</p>}
                        {msg && <p className="infomessage text-black text-center">{msg}</p>}
                        {apiSuccess && <p className="infomessage text-green text-center">{apiSuccess}</p>}
                        <form onSubmit={handleSubmit} className='w-full  text-black text-center  flex flex-col p-2'>
                            <input className='my-2 p-2  border border-black rounded-md' type="text" name="age" placeholder="Age max-70yrs" required onChange={handleChange} />
                            {errors.age && <small className='text-red-700 text-center'>{errors.age}</small>}
                          
                          <input type="text" name='area' placeholder='Enter Area' className='my-2 p-2 border border-black rounded-md'/>
                            {errors.area && <small className='text-red-700 text-center'>{errors.area}</small>}
                            <select className='my-2 p-2 border border-black rounded-md' id="category" name="category" onChange={handleChange} required>
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
                            {errors.category && <small className='text-red-700 text-center'>{errors.category}</small>}
                            <input type="submit" value={isSubmitting?"Submitting....":"Update"} className='bg-[#017EF4]  my-2 px-4 py-2 w-full rounded-md shadow-md' />
                        </form>
                    </div>
                </div>
            </div>


    )
}
export default Updateform
