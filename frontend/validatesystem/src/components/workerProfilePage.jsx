import React from 'react'

function WorkerProfilePage() {
  return (
    <div className='h-[90vh] flex flex-col sm:flex-row justify-center items-center gap-3 px-3'>
      <div className='w-full sm:w-[50%] min-h-[60vh] sm:h-[90vh] flex justify-center items-center border-2 border-red-600'>
        <img src="../../standingperson.jpg" alt="" className='bg-cover bg-no-repeat' />
      </div>
      <div className='w-full sm:w-[50%] min-h-[90vh] sm:h-[90vh] flex justify-center items-center border-2 border-green-500'>

      </div>
    </div>
  )
}

export default WorkerProfilePage
