import { React, useState, useEffect } from 'react'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import firebaseApp from './firebaseConfig';
import { FaShieldAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

function Otp() {
    const { phoneNumber } = useParams()
    console.log(phoneNumber)
    const [otp, setOtp] = useState('')
    const [otpErr, setOtpErr] = useState('')
    const [otpMsg, setOtpMsg] = useState('')
    const [isOtpSent, sendOtpToNumber] = useState('')
    const auth = getAuth(firebaseApp);
    const verifyOtp = async (e) => {
        e.preventDefault()
        try {
            console.log(confirmation)
            const result = await confirmation.confirm(otp)
            console.log(result)
        }
        catch (err) {
            console.log(err)
            setOtpErr('oops error while verifying otp')
        }
    }
    const sendOtp = async () => {
        try {

            const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', { 'size': 'invisible' })
            console.log(recaptchaVerifier)
            const confirmation = await signInWithPhoneNumber(auth, '+91' + phoneNumber, recaptchaVerifier)
            console.log(confirmation)
            window.confirmation = confirmation
            setOtpMsg('otp has been sent')
        }
        catch (err) {
            console.log(err)
            setOtpErr('oops error while sending otp')
        }
    }
    useEffect(() => {
        sendOtp()
    }, [phoneNumber])
    const handleChange = (e) => {
        const { value } = e.target;//extract otp from form input tag
        setOtpErr('')
        setOtpMsg('')
        setOtp(value)
    }

    return (
        <div className='w-full flex flex-col sm:flex-row gap-5 justify-center items-center px-4 min-h-[90vh]'>
            <div className='w-full  sm:w-[50%] h-[70vh] sm:h-[90vh] bg-[url(../../loginform.jpg)] bg-no-repeat bg-center'>
            </div>
            <div className='  w-full sm:w-[50%] h-[70vh] sm:h-[90vh] flex justify-center items-center'>
                <div className='w-[23rem] aspect-auto bg-[#ffff] shadow-md'>
                    <form onSubmit={verifyOtp} className=' h-full relative flex items-center flex-col'>

                        <div id='recaptcha'></div>
                        <h4 className='text-2xl text-center mb-10 relative top-4 flex justify-center'><FaShieldAlt size={50} /></h4>
                        <h4 className='text-2xl text-center mb-10 relative top-4'>OTP AUTHENTICATION</h4>
                        <small className='text-center text-black my-2'>{otpMsg}</small>
                        <small className='text-center text-red-500 my-2'>{otpErr}</small>
                        <div className='w-[98%] mx-auto  '>
                            <input type="tel" name='otp' placeholder='place enter otp here' required value={otp} onChange={handleChange} className='w-full p-4 rounded-full border border-black' />
                            <button type="submit" className='w-full rounded-md shadow-sm py-3 my-5 bg-[#1D4ED8]'>Submit</button>
                        </div>

                    </form>
                </div>
            </div>



        </div>
    )
}

export default Otp
