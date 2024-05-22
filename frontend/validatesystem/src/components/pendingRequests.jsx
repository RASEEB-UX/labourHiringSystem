import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { addWorker } from '../redux/workerSlice'
import { useDispatch } from 'react-redux'
function PendingRequests() {
    const [data, setData] = useState([])
    const [noData, setNoData] = useState(false)
    const [apiErr, setApiErr] = useState('')
    const [msg, setMsg] = useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const getPendingRequests = async () => {
        try {
            const response = await axios.get('https://labourhiringsystem-1.onrender.com/api/pendingrequests/getallpendingrequests')
            if (response.data.pendingRequests.length == 0)
                return setNoData(!noData)
            setData(response.data.pendingRequests)
        }
        catch (err) {
            if (err.response) {
                setApiErr(err.response.data.message)
            }
            if (err.request) {
                setApiErr('oops Server Error occurred')
            }
        }

    }
    useEffect(() => {
        getPendingRequests()
    }, [])
    const handleApproval = async (workerPhoneNumber) => {
        console.log('invoked')
        try {
            setMsg('')
            setApiErr('')
            const response = await axios.post('https://labourhiringsystem-1.onrender.com/api/pendingrequests/approveworker', { userPhoneNumber: workerPhoneNumber })
            dispatch(addWorker(response.data.user))//add the approved worker to available page
            console.log(response.data)
            setMsg('worker approved successfully')
        }
        catch (err) {
            console.log(err)
            setMsg('')
            if (err.response) {
                setApiErr(err.response.data.message)
            }
            if (err.request) {
                setApiErr('server error occurred')
            }
        }
    }
    const handleRejection = async (workerPhoneNumber) => {
        try {
            setApiErr('')
            const response = await axios.post('https://labourhiringsystem-1.onrender.com/api/pendingrequests/rejectworker', { userPhoneNumber: workerPhoneNumber })
            console.log(response.data)
            setMsg('worker deleted successfully')

        }
        catch (err) {
            setMsg('')
            console.log(err)
            if (err.request) {
                setApiErr('server error occurred')
            }
            if (err.response) {
                setApiErr(err.response.data.message)
            }
            

        }
    }
    if(noData) return  <div className='flex justify-center items-center h-[70vh]'><h3 className='  font-bold text-center text-2xl w-[18rem] aspect-video flex justify-center items-center bg-[#ffff] shadow-md'>No Pending Requests</h3></div>
    return (
        <div className='overflow-auto h-[90vh] flex-col flex justify-center gap-3 items-center px-3 max-[1000px]:flex-wrap   py-2 border-2'>
            <h2 className='text-black text-center my-2 text-2xl font-bold'>{msg && msg}</h2>
            <h2 className='text-red-600 text-center my-2 text-2xl font-bold'>{apiErr && apiErr}</h2>
            {//#FEFAF6]
                data.length !== 0 && (
                    <>
                        {data.map((item, key) => (
                            <div key={key} className="imagecontainer shadow-md rounded-md flex  justify-center gap-6 items-center max-[430px]:flex-col  shadow-black p-9 bg-white max-[430px]:w-full max-w-lg ">
                                <div className="leftportion w-full min-[430px]:w-[50%] ">
                                    <div className="profile-img  bg-pink-400 h-[5rem] w-[5rem] mx-auto my-4 rounded-full">
                                        <img src={item.photo} alt="Profile Picture" className='rounded-full size-full hover:scale(2) transition-all duration-[1.2s]' />
                                    </div>

                                    <div className="profile-info text-center py-3">
                                        <h2 className='my-2 font-bold'>User Profile</h2>
                                        <p><strong>Name:</strong>{" " + item.username}</p>
                                        <p><strong>Age:</strong>{" " + item.age}</p>
                                        <p><strong>Mobile Number:</strong>{" " + item.mobile}</p>
                                        <p><strong>Area:</strong>{" " + item.area}</p>
                                        <p><strong>Category:</strong>{" " + item.category}</p>
                                    </div>
                                </div>
                                <div className="rightportion w-full min-[430px]:w-[50%] ">
                                    <div className='flex justify-center items-center flex-col gap-3'>
                                        <h2 className='text-2xl w-full p-2 text-center bg-blue-400 hover:rounded-full rounded-md cursor-pointer' onClick={()=>navigate('/adminpage/viewdocuments',{state:{userChoice:"admin",document:item.labourDocument}})}>LabourCard</h2>
                                        <h2 className='text-2xl w-full  p-2  text-center bg-blue-400 hover:rounded-full rounded-md cursor-pointer' onClick={()=>navigate('/adminpage/viewdocuments',{state:{userChoice:"admin",document:item.aadhaar}})}>AadhaarCard</h2>
                                    </div>
                                    <h3 className='text-center my-2 py-2 underline text-2xl hover:bg-purple-500 transition-all duration-700'>Documents</h3>
                                    <div className='flex justify-around items-center gap-2 flex-col '>
                                        <button className='text-2xl w-full px-4 py-2 text-center bg-blue-400 hover:rounded-full rounded-md' onClick={() => handleApproval(item.mobile)}>
                                            Approve
                                        </button>
                                        <button className='text-2xl w-full px-4 py-2 text-center bg-blue-400 hover:rounded-full rounded-md' onClick={() => handleRejection(item.mobile)}>
                                            Reject
                                        </button>

                                    </div>
                                </div>
                            </div>

                        ))}

                    </>

                )

            }
        </div>
    )
}

export default PendingRequests
