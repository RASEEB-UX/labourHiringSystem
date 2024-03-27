import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Update = () => {
    const navigate=useNavigate()
  const [aadhaar, setAadhaar] = useState('');
  const data=useSelector((state)=>state.workers.users)
const [err,seterror]=useState('')
  const handleSubmit = (event) => {
    event.preventDefault();
    const ispresent=data.find((item)=>item.adhaar==aadhaar)
    console.log(ispresent)
    if(!ispresent)
    return seterror("user not found")
    navigate(`/updateform/${ispresent.adhaar}`)
    // Here you can perform any action with the Aadhaar value, such as sending it to a server
    console.log('Aadhaar:', aadhaar);
    // Reset the form after submission
   // setAadhaar(event.target.value);
  };
  const handleChange=(e)=>{
    seterror('')
setAadhaar(e.target.value)
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-7 items-center h-screen w-full bg-[#D7E2F8] overflow-hidden">
        <div className='bg-pink  w-1/7 '>
            <img src="../../updatepic2.jpg" alt="" className=' border-black'/>
        </div>
      <form onSubmit={handleSubmit} className="bg-white border border-black w-[80%]  sm:w-auto  shadow-lg rounded px-8 pt-6 pb-8 mb-4 ">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aadhaar">
            Aadhaar
          </label>
          <span className='text-sm text-center text-red-600'>
            {err}
            </span>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="aadhaar"
            type="text"
            placeholder="Enter Aadhaar Number"
            value={aadhaar}
            onChange={handleChange}
            required
            
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
