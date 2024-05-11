import React from 'react'
import { useSelector } from 'react-redux'
function AdminMainPage() {
    const userName = useSelector((state) => state.userStore.username)
    return (

        <div className='h-[90vh] w-full '>
            <h2>Welcome Back {userName} </h2>
            <h2>Admin Dashboard</h2>
        </div>
    )
}

export default AdminMainPage
