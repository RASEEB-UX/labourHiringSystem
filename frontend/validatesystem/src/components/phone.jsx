import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const SignInButton = () => {
  const navigate = useNavigate()
  const location = useLocation()//location.state.navigateUrl contains url to which user should be navigated after successfull sign
  const [msg, setMsg] = useState('')
  const workerData = useSelector((state) => state.workerStore.workers)
  const userData = useSelector((state) => state.userStore.users)
  useEffect(() => {
    console.log('inside useEffect')
    const phoneEmailListener = (userObj) => {
      console.log('script called me')
      const { user_json_url, user_country_code, user_phone_number } = userObj;
      console.log('received correct otp ')
      const numberExistsInWorkerDb = workerData.find((item) => item.mobile == user_phone_number)
      const numberExistsInUserDb = userData.find((item) => item.mobile == user_phone_number)
      if (numberExistsInUserDb || numberExistsInWorkerDb) {
        console.log('phone exists')
        alert('This number already exists')
        return
      }
      else {
        console.log('valid mobile locally')
        console.log('phone exists', numberExists)
        console.log('userCAme for', location.state)
        navigate(`${location.state.navigateUrl}`, { state: { userPhoneNumber: user_phone_number } })
        // You can submit your form here or redirect user to post login dashboard page
        // Send user_json_url to your backend to retrieve user info (i.e. country code and phone number) from this URL.
      };
      // Load external script
    }
    if (!location?.state)//if user comes direct to this page redirect them to home page
          navigate('/')
    console.log('redirect url is', location.state?.navigateUrl)
    window.phoneEmailListener = phoneEmailListener;
    const script = document.createElement('script');
    script.src = 'https://www.phone.email/sign_in_button_v1.js';
    script.async = true;
    document.body.appendChild(script);
    // Cleanup function
    return () => {
      document.body.removeChild(script);
      delete window.phoneEmailListener;
    };
  }, []);
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