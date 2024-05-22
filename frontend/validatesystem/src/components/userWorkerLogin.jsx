import axios from 'axios'
import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser, addUserType } from '../redux/userSlice'
import { addAuthStatus, addUserMobile } from '../redux/userSlice'
function UserWorkerLogin() {
    const [apiErr, setApiErr] = useState('')
    const [apiSuccess, setApiSuccess] = useState('')
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [submitting, setSubmitting] = useState(false)
    const [msg, setMsg] = useState('')
    const [err, setErr] = useState({})
    const handleChange = (e) => {
        setMsg('')
        setApiErr('')
        setApiSuccess('')
        setErr({ ...err, [e.target.name]: '' })

    }
    const isDataValid = (data) => {
        const strongPasswordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
        let newErrors = {}
        if (!/^\d{10}$/.test(data.mobile))
            newErrors.mobile = 'Invalid Number'
        if (!strongPasswordRegex.test(data.password))
            newErrors.password = "Only Strong Registered Password"
        if (!data.userType)
            newErrors.userType = "UserType Required"
        if (Object.keys(newErrors).length > 0) {
            setErr(newErrors)
            return false
        }
        return true
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setApiSuccess('')
            setMsg('')
            setApiErr('')
            const data = new FormData(e.target)
            const formData = {}
           
            data.entries().forEach(([key, value]) => {
                formData[key] = value
            });
            console.log(formData)
            const dataIsValid = isDataValid(formData)
            if (!dataIsValid)
                return
            setMsg('Submitting Form Data')
            setSubmitting(true)
            const response = await axios.post(`https://labourhiringsystem-1.onrender.com/api/${formData.userType == 'worker' ? 'workers' : 'user'}/login`, formData, { withCredentials: true })
            dispatch(addAuthStatus(true))
            dispatch(addUserType(response.data.user.userType))
            dispatch(addUserMobile(response.data.user.mobile))
            dispatch(addUser(response.data.user))
           console.log('response is',response.data.user)
            setSubmitting(false)
            setApiSuccess("Authenticated")
            setMsg('')
        }
        catch (err) {
            console.log(err)
            setApiSuccess('')
            setMsg('')
            setSubmitting(false)
            if (err.request) {
                setApiErr("Server Error")
            }
            if (err.response) {
                setApiErr(err.response.data.message)
            }

        }
    }
    return (
        <div className="flex flex-col sm:flex-row justify-center  gap-4 items-center min-h-[90vh] w-full bg-[#FDFDFD] ">
            <div className='bg-pink sm:my-3 my-0 w-full sm:w-[50%]  min-h-[70vh] sm:h-[90vh] flex justify-center items-center '>
                <img src="../../loginpagedesign.png" alt="" className='' />
            </div>
            <div div className={`w-full sm:w-[50%] p-2 flex justify-center items-center min-h-[70vh] sm:min-h-[80vh]`}>
                <form action="" onSubmit={handleSubmit} className="flex flex-col justify-center items-center my-2 w-full p-12 border-4 border-green-500 rounded-lg">
                    <h2 className="text-center text-3xl font-bold mb-8">Login Form</h2>
                    {apiErr && <small className='text-red-500 text-2xl text-center'>{apiErr}</small>}
                    {apiSuccess && <small className='text-green-600 text-2xl text-center'>{apiSuccess}</small>}
                    {msg && <small className='text-black text-2xl text-center'>{msg}</small>}
                    <div className="mb-5 w-full">
                        <label htmlFor="mobile" className="block text-sm font-bold mb-2">mobile:</label>
                        <input type="text" id="mobile" name="mobile" onChange={handleChange} className="p-3 w-full rounded-md border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 focus:outline-none" />
                        {err.mobile && <small className='text-red-600 my-1 text-center'>{err.mobile}</small>}
                    </div>
                    <div className="mb-5 w-full">
                        <label htmlFor="password" className="block text-sm font-bold mb-2">Password:</label>
                        <input type="password" id="password" name="password" onChange={handleChange} className="p-3 w-full rounded-md border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 focus:outline-none" />
                        {err.password && <small className='text-red-600 my-1 text-center'>{err.password}</small>}
                    </div>
                    <div className="mb-5 w-full">
                        <select name="userType" id="" onChange={handleChange} className="border-2  border-gray-300 rounded px-3 py-2 w-full">
                            <option value=''>User Type</option>
                            <option value="user">User</option>
                            <option value="worker">worker</option>
                        </select>
                        {err.userType && <small className='text-red-600 text-center my-1'>{err.userType}</small>}

                    </div>
                    <button className="p-3 w-full rounded-md bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors duration-300">{submitting ? "Submitting..." : "Login"}</button>
                    <button className="p-3 w-full rounded-md my-2 bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors duration-300" onClick={()=>navigate('/')}>Create An Account</button>
                </form>

            </div>

        </div>
    )
}

export default UserWorkerLogin
