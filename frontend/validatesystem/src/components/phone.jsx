import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const SignInButton = () => {
  const navigate = useNavigate()
  const location = useLocation()//location.state.navigateUrl contains url to which user should be navigated after successfull sign
  console.log('location obj in phone js is', location)
  const [msg, setMsg] = useState('')
  if (!location?.state)//if user comes direct to this page redirect them to home page
    navigate('/')
  const handleNavigation = (user_phone_number) => {
    navigate(`${location.state.navigateUrl}`, { state: { userPhoneNumber: user_phone_number, phoneValidated: true } })
  }
  const phoneEmailListener = (userObj) => {
    const { user_json_url, user_country_code, user_phone_number } = userObj;
    handleNavigation(user_phone_number)
  }
  window.phoneEmailListener = phoneEmailListener;
  // console.log(location.state.navigateUrl)
  const script = document.createElement('script');
  script.src = 'https://www.phone.email/sign_in_button_v1.js';
  //script.async = true;
  document.body.appendChild(script);
  // Cleanup function
  return (
    <div className='min-h-[70vh] flex-col sm:flex-row flex gap-3 bg-[#FFFFFF]  justify-center items-center p-5 border-3 border-black'>
      <div className='w-full sm:w-[50%] min-h-[70vh] sm:h-[80vh] flex justify-center overflow-hidden items-center bg-[#FFFFFF] shadow-md'>
        <img src="../../slide1.jpg" alt="" className=' bg-no-repeat hover:scale-110 transition-all duration-700' />
      </div>
      <div div className={`w-full sm:w-[50%] bg-[#FFFFFF] flex justify-center items-center min-h-[70vh] sm:h-[80vh] overflow-hidden shadow-md `}>
        <div className="pe_signin_button" data-client-id="11913510434412196502">
        </div>
       
      </div>

    </div >

  );
};

export default SignInButton;