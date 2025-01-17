import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AdminMainPage() {
    const [analytics, setAnalytics] = useState({ workers: 0, users: 0, feedBacks: 0, pendingRequests: 0 })
    useEffect(() => {
        const getWebsiteAnalytics = async () => {
            try {
                const response = await axios.get('https://labourhiringsystem-1.onrender.com/api/admin/websiteanalytics')
                console.log(response.data)
                setAnalytics({ workers: response.data.workers, users: response.data.users, feedBacks: response.data.feedBacks, pendingRequests: response.data.pendingRequests })
            }
            catch (err) {
                console.log(err)
            }
        }
        getWebsiteAnalytics()
    }, [])
    return (

        <div className='min-h-[90vh]  sm:h-[90vh] px-2'>
           
            <h2 className='text-center text-2xl p-3 font-serif font-semibold'>Website Analytics </h2>
            <div className='grid grid-cols-1 p-2  min-[900px]:grid-cols-3  min-h-[100vh] gap-7 sm:min-h-[80vh] border-blue-900 my-2 sm:my-0'>
                <div className=' bg-gradient-to-tr    shadow-lg shadow-gray-500 from-[#ee9ca7] to-[#ffdde1] text-center content-center text-2xl text-black p-9'><span className='p-2'>Workers</span>{analytics.workers}<span></span></div>
                <div className=' bg-gradient-to-tr shadow-lg shadow-gray-500 from-[#ee9ca7] to-[#ffdde1]  text-center content-center text-2xl text-black p-9'><span className='p-2'>FeedBacks</span>{analytics.feedBacks}<span></span></div>
                <div className=' bg-gradient-to-tr shadow-lg shadow-gray-500 from-[#ee9ca7] to-[#ffdde1]  text-center content-center text-2xl text-black  p-9'><span className='p-2'>Users</span>{analytics.users}<span></span></div>
                <div className='bg-gradient-to-tr shadow-lg shadow-gray-500 from-[#ee9ca7] to-[#ffdde1]  text-center  content-center text-2xl text-black  p-9 '>
                    <span className='p-2 '>pending</span>{analytics.pendingRequests}<span></span>
                   
                </div>
            </div>
          
        </div>
    )
}

export default AdminMainPage
