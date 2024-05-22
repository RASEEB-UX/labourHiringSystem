import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Update = () => {
  const navigate = useNavigate()
  const [aadhaar, setAadhaar] = useState('');
  const data = useSelector((state) => state.workerStore.workers)
  const [err, seterror] = useState('')
  const handleNavigation = (user_phone_number) => {
    if(data.length!==0)
      {
        const numberExists = data.find((item) => item.mobile == user_phone_number)
        if (numberExists) {
          navigate('/updateform', { state: { userPhoneNumber: user_phone_number } })
        }
        else {
          alert('No record found with this phoneNumber')
          // Send user_json_url to your backend to retrieve user info (i.e. country code and phone number) from this URL.
        }
      }
      else{
        navigate('/updateform', { state: { userPhoneNumber: user_phone_number } })
      }
   
  }
    console.log('inside useEffect')
    const phoneEmailListener = (userObj) => {
      console.log('script called me')
      const { user_json_url, user_country_code, user_phone_number } = userObj;
      console.log('received correct otp ')
     handleNavigation(user_phone_number)
    }
    // Load external script
    window.phoneEmailListener = phoneEmailListener;
    const script = document.createElement('script');
    script.src = 'https://www.phone.email/sign_in_button_v1.js';
    script.async = true;
    document.body.appendChild(script);

  return (
    <div className="flex flex-col sm:flex-row justify-center  gap-4 items-center min-h-[90vh] w-full bg-[#FDFDFD] ">
      <div className='bg-pink sm:my-3 my-0 w-full sm:w-[60%]  min-h-[70vh] sm:h-[90vh] flex justify-center items-center '>
        <img src="../../slide1.jpg" alt="" className='' />
      </div>
      <div div className={`w-full sm:w-[40%]  flex justify-center items-center min-h-[70vh] sm:h-[80vh]`}>
        <div className="pe_signin_button" data-client-id="11913510434412196502">
        </div>
      </div>

    </div>
  );
};

export default Update;
