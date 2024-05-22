import React from 'react'
import { useSelector } from 'react-redux'
function AdminMainPage() {
    // const userName = useSelector((state) => state.userStore.user.username)
    return (

        <div className='min-h-[90vh] sm:h-[90vh] px-2'>
            
            <h2>Admin Dashboard</h2>
            <div className='grid grid-cols-2 min-[900px]:grid-cols-3 min-h-[80vh] gap-7 sm:min-h-[40vh] border-blue-900 my-2 sm:my-0'>
            <div className='bg-[#5755FE]'></div>
            <div className='bg-[#5755FE]'></div>
            <div className='bg-[#5755FE] '></div>
            </div>
        </div>
    )
}

export default AdminMainPage
