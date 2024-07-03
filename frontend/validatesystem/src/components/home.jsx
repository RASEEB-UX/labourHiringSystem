import { useState, React } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCheckCircle, FaUsers, FaMoneyBillWave } from 'react-icons/fa';


function Home() {
    const advertisementStore = useSelector((state) => state.advertisementStore);
    const advertisementPresent = advertisementStore.advertisementPresent;
    const authStatus = useSelector((state) => state.userStore.authStatus);
    const userStore = useSelector((state) => state.userStore);
    console.log(advertisementStore);

    const [registerAs, setRegisterAs] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [msg, setMsg] = useState('');
    const [apiErr, setApiErr] = useState('');
    const [apiSuccess, setApiSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value } = e.target;
        if (value === 'user') navigate('/userRegister');
        else if (value === 'worker') navigate('/register');
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!authStatus) {
                return setApiErr('Sign In First');
            }
            const data = new FormData(e.target);
            let formData = {};
            data.forEach((value, key) => {
                formData[key] = value;
            });
            formData.mobile = userStore.userMobile;
            formData.username = userStore.user.username;
            console.log(formData);
            setApiErr('');
            setMsg('');
            setApiSuccess('');
            setSubmitting(true);

            setMsg('Submitting Feedback...');
            const response = await axios.post('https://labourhiringsystem-1.onrender.com/api/feedback/addfeedback', formData);
            console.log('feedback response is', response.data);
            setMsg('');
            setSubmitting(false);
            setApiSuccess(response.data.message);
        } catch (err) {
            setMsg('');
            setApiSuccess('');
            setSubmitting(false);
            if (err.request) {
                setApiErr("Server Error Occurred");
            }
            if (err.response) {
                setApiErr(err.response.data.message);
            }
        }
    };

    return (
        <div>
            {advertisementPresent && (
                <div>
                    <marquee className='bg-blue-300 p-4 rounded-sm text-black text-2xl'>
                        {advertisementStore.advertisementObj.advertisement}
                    </marquee>
                </div>
            )}
            <section className="intro flex flex-col sm:flex-row bg-[#FEFAF6] justify-center items-center min-h-[90vh] " id="stars">
                <div className="w-full intro-content h-[60vh] flex justify-center items-center text-center flex-col sm:w-[50%] sm:h-[90vh]">
                    <h1 className='my-2 text-3xl'>Welcome to LabourHub</h1>
                    <p className='my-2'>We connect laborers with employers. Find skilled workers for your projects or register as a laborer to get hired.</p>
                    <p className='my-2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className='w-full flex justify-center items-center sm:w-[50%] min-h-[90vh]'>
                    <div className='carousel rounded-box h-[90vh] w-full'>
                        <div className="carousel-item w-full">
                            <img src="../../worker3.png" className="w-full" alt="Worker" />
                        </div>
                        <div className="carousel-item w-full">
                            <img src="../../worker2.png" className="w-full" alt="Worker" />
                        </div>
                        <div className="carousel-item w-full">
                            <img src="../../worker1.png" className="w-full" alt="Worker" />
                        </div>
                        <div className="carousel-item w-full">
                            <img src="../../worker4.png" className="w-full" alt="Worker" />
                        </div>
                        <div className="carousel-item w-full">
                            <img src="../../worker5.png" className="w-full" alt="Worker" />
                        </div>
                    </div>
                </div>
            </section>

            <div className='flex justify-center items-center my-2'>
                <select value={registerAs} name='registrationChoice' className="px-12 bottom-11 py-3 text-2xl bg-[#2563EB] my-4 rounded-md" onChange={handleChange}>
                    <option value=''>Register As</option>
                    <option value='user'>User</option>
                    <option value='worker'>Worker</option>
                </select>
            </div>
            <div>
                <marquee className='bg-blue-300 p-4 rounded-sm text-black text-2xl'>For Any Business Related Queries Mail us at labourHiring@gmail.com or 97971234556</marquee>
            </div>
            <section className='my-7  '>
                <h3 className='text-center text-2xl my-2'>How It Works</h3>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3  p-3 my-5 '>
                    <div className='bg-white m-3 shadow-md rounded-md border min-h-[12rem] border-black p-4 flex flex-col justify-between '>
                        <div className='flex justify-center'>
                            <FaCheckCircle className='text-blue-600 text-4xl' />
                        </div>
                        <div className='text-center relative  '>
                            <h2 className='text-xl font-semibold text-blue-600'>Efficient Hiring Process</h2>
                            <p className='mt-2 text-gray-700'>Find the right labor quickly with our streamlined hiring process. Save time and reduce hassle with our easy-to-use platform.</p>
                        </div>
                        <div className='text-center relative bottom-[-35px]'>
                            <button className=' bg-blue-500  text-white px-4 py-2 rounded hover:bg-blue-600 transition'>Learn More</button>
                        </div>
                    </div>
                    <div className='bg-white m-3 shadow-md rounded-md border border-black min-h-[12rem] p-4 flex flex-col justify-between'>
                        <div className='flex justify-center'>
                            <FaUsers className='text-green-600 text-4xl' />
                        </div>
                        <div className='text-center'>
                            <h2 className='text-xl font-semibold text-green-600'>Verified Workforce</h2>
                            <p className='mt-2 text-gray-700'>Our platform ensures that all workers are thoroughly vetted and verified. Hire with confidence knowing you are getting skilled and reliable labor.</p>
                        </div>
                        <div className='text-center relative bottom-[-35px]'>
                            <button className='mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition'>Learn More</button>
                        </div>
                    </div>
                    <div className='bg-white m-3 shadow-md rounded-md border border-black min-h-[12rem] p-4 flex flex-col justify-between'>
                        <div className='flex justify-center'>
                            <FaMoneyBillWave className='text-red-600 text-4xl' />
                        </div>
                        <div className='text-center'>
                            <h2 className='text-xl font-semibold text-red-600'>Cost-Effective Solutions</h2>
                            <p className='mt-2 text-gray-700'>Get the best value for your money. Our platform offers competitive pricing and flexible hiring options to meet your budget and needs.</p>
                        </div>
                        <div className='text-center relative bottom-[-35px]'>
                            <button className='mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'>Learn More</button>
                        </div>
                    </div>
                </div>
            </section>
            <h4 className='text-black my-2 text-2xl text-center'>Have Some Questions?</h4>
            <div className='contactUs grid grid-cols-1 sm:grid-cols-2 gap-3 p-2 my-3'>
                <div className='flex justify-center text-2xl items-center flex-col text-black my-2 p-4'>
                    <img src="../../contactus.jpg.jpg" alt="Contact Us" className='bg-cover bg-no-repeat' />
                </div>
                <div className="p-4 bg-white bg-opacity-15 backdrop-blur-lg rounded shadow-lg my-3 border border-black">
                    <h2 className="text-xl font-semibold mb-4 text-center">Contact Us Form</h2>
                    {apiErr && <small className='text-red-700 text-2xl text-center my-1'>{apiErr}</small>}
                    {msg && <small className='text-black text-2xl text-center my-1'>{msg}</small>}
                    {apiSuccess && <small className='text-green-700 text-center my-1'>{apiSuccess}</small>}
                    <form className="" onSubmit={handleSubmit}>
                        <div className="flex flex-col py-3">
                            <label htmlFor="problem" className="text-sm text-black py-3">Message</label>
                            <textarea id="problem" name="message" rows="4" className="input py-[6rem] ring"></textarea>
                        </div>
                        <button type="submit" className="btn w-full p-3 bg-blue-500 rounded-md my-2">{submitting ? "Submitting Feedback..." : "Submit"}</button>
                    </form>
                </div>
            </div>
           
            <div className='footer bg-black text-white flex justify-around items-center flex-wrap w-full gap-4 my-4'>
                <div className="footerLeftSide text-center p-5 text-2xl">
                    <h2>FAQs</h2>
                    <h2>Cancellation policy</h2>
                    <h2>Contact us</h2>
                    <h2>About us</h2>
                    <h2>Work with us</h2>
                    <h2>Our sustainability practices</h2>
                    <h2>© 2024 LabourHub Private Limited</h2>
                    <h2>All images are copyrighted by their respective authors.</h2>
                </div>
                <div className="footerRightSide text-center p-5 text-2xl">
                    <h3 className='text-3xl text-yellow-500'>Contact Us</h3>
                    <h3>080 468 01269</h3>
                    <h3>Mon to Sat - 9.30 AM to 7.30 PM</h3>
                    <h3>Sun - 9.30 AM to 6.30 PM</h3>
                    <h3 className='text-3xl text-yellow-500'>Srinagar Office</h3>
                    <h3 className='text-3xl text-yellow-500'>Karanagar Srinagar</h3>
                    <h3>Delhi Office</h3>
                    <h3>Chandni Chowk</h3>
                </div>
            </div>
        </div>
    );
}

export default Home;
