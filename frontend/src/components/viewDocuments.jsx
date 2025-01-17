import React from 'react'
import { useLocation } from 'react-router-dom'
function ViewDocuments() {
    const location= useLocation()
  return (
  <div className='min-h-[80vh] sm:h-[90vh]  border border-black flex justify-center items-center gap-4 flex-wrap'>
      <div className='w-full min-h-[80vh] sm:h-[80vh] flex justify-center   items-center '>
        <img src={location.state.document} alt="" className='w-[30rem] aspect-auto'/>
      </div>
     
    </div>
  )
}

export default ViewDocuments
