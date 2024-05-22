import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addFeedbacks, deleteFeedback } from '../redux/feedBackSlice'
function AllFeedBackMessages() {
  const [apiErr, setApiErr] = useState('')
  const dispatch =useDispatch()
  const feedbackStore =useSelector((state) =>state.feedBackStore)
  const fetchAllFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/feedback/getallfeedbacks')
       dispatch(addFeedbacks(response.data.feedbacks))
    }
    catch (err) {
      if (err.request) {
        setApiErr("Server Error")
      }
      if (err.response) {
        setApiErr(err.response.data.message)
      }
    }
  }
useEffect(() =>{
  fetchAllFeedbacks()
},[])
  const handleDeleteFeedback = async (id) => {
    try {
      console.log(id)
      const response = await axios.delete('http://localhost:8000/api/feedback/deletefeedback', { data: { feedBackId: id } })
      dispatch(deleteFeedback(id))
      alert('feedback deleted successfully')
    }
    catch (err) {
      console.log('err in feedback page while deleting feedback', err)
    }
  }
  if (!feedbackStore.feedBacksPresent)
    return <div className='h-[90vh] flex justify-center items-center'>
      <h3 className='p-8 w-[18rem] aspect-video  flex justify-center items-center text-center bg-white shadow-md shadow-black text-2xl hover:scale-105 transition-all duration-700 hover:bg-blue-600 rounded-lg'>No Feedbacks Yet</h3>
    </div>
  return (

    <div className='p-2 min-h-[80vh] border-2  flex  flex-col min-[1030px]:flex-row flex-wrap  justify-around items-center gap-4'>
      {feedbackStore.feedBacks.length !== 0 && feedbackStore.feedBacks.map((item, key) => (
        <div key={key} className='w-full max-w-md flex hover:scale-105 transition-all duration-700 hover:bg-blue-700 hover:text-white rounded-lg justify-center  p-7  min-h-32  bg-white shadow-black shadow-md items-center flex-col border border-black'>
          <h2 className='p-3 text-2xl '>userName :{" "}{item.username}</h2>
          <h2 className='p-3  text-2xl '>mobile :{" "}{item.mobile}</h2>
          <h2 className='p-3'>message :{" "}{item.message}</h2>
          <button className='w-full p-4 bg-violet-500 rounded-md text-white text-2xl' onClick={()=>handleDeleteFeedback(item._id)}>Delete Feedback</button>
        </div>
      ))}
    </div>
  )
}

export default AllFeedBackMessages
