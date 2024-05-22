import { useSelector } from 'react-redux'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
function WorkerProfilePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const workerStore = useSelector((state) => state.workerStore)
  const userStore = useSelector((state) => state.userStore)
  const user = workerStore.workers.filter((worker) => worker.mobile == userStore.userMobile)[0]
  console.log('selected worker is',user)
  console.log('worker profile page')
  return (
   user && <div className='min-h-[90vh] flex flex-col sm:flex-row justify-center items-center gap-3 px-3  mx-auto my-3 sm:my-0 bg-[#FDFDFD]'>
      <div className='w-full sm:w-[50%] min-h-[60vh] sm:h-[90vh] flex justify-center items-center  sm:overflow-hidden'>
        <img src="../../slide1.jpg" alt="" className='bg-cover  bg-no-repeat' />
      </div>
      <div className='w-full sm:w-[50%] min-h-[90vh] sm:h-[90vh] flex justify-center items-center'>
        <div className="card w-full max-w-sm px-7 border border-green-700 bg-[#ffff] shadow-md rounded-md hover:bg-[#5755FE] transition-all duration-700">
          <img src={user.photo} alt="" className='w-20 h-20 rounded-full my-3 mx-auto border border-black shadow-sm' />
          <div className="cardbody text-center py-8 my-1">
            <h3 className='text-3xl'>Worker Profile</h3>
            <h2 className='p-2'>Username: {user.username}</h2>
            <h2 className='p-2'>Address: {user.area}</h2>
            <h2 className='p-2'>Age: {user.age}</h2>
            <h2 className='p-2'>Skills: {user.category}</h2>
            <h2 className='p-2'>Mobile: {user.mobile}</h2>
          </div>
          <button className='w-full p-2 rounded-md text-white text-2xl bg-blue-600 my-2' onClick={() => navigate({ pathname: '/signin' }, { state: { navigateUrl: '/updateform' } })}>Update </button>
        </div>
      </div>
    </div> 
  )
}

export default WorkerProfilePage
