import { useState, React } from 'react'
//4000003560000008
import { useNavigate } from 'react-router-dom'
function Home() {
    // Generate random stars
    const [registerAs, setRegisterAs] = useState('')
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { value } = e.target
        if (value == 'user')
            navigate('/userRegister')
        else if (value == 'worker')
            navigate('/register')

    }


    // Start the animation

    return (
        <div>
            <section className="intro flex flex-col sm:flex-row bg-[#FEFAF6] justify-center items-center min-h-[90vh] " id="stars">

                <div className="w-full intro-content  h-[60vh]  flex justify-center items-center text-center flex-col sm:w-[50%] sm:h-[90vh]">
                    <h1 className='my-2 text-3xl'>Welcome to LabourHub</h1>
                    <p className='my-2'>We connect laborers with employers. Find skilled workers for your projects or register as a laborer
                        to get hired.</p>
                    <p className='my-2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    <div className="location bg-blue-600 px-5 py-4 rounded-full shadow-md">Your Location</div>
                </div>
                <div className='w-full sm:flex sm:justify-center sm:items-center sm:w-[50%] h-[70vh] sm:h-[90vh] '>
                    <img src="../../newfrontpic.jpg " alt="" className='bg-cover bg-no-repeat hover:shadow-md transition-all duration-700' />
                </div>
                <select value={registerAs} name='registrationChoice' className="hidden sm:block absolute  px-12  bottom-11 py-3 text-2xl bg-[#2563EB] my-4 rounded-md" onChange={handleChange}>
                    <option value=''>Register As</option>
                    <option value='user'>User</option>
                    <option value='worker'>Worker</option>
                </select>
            </section>
            <section className='my-3'>
                <h3 className='text-center text-2xl my-2'>How It Works</h3>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 h-fit p-3'>
                    <div className='bg-[#ffff] shadow-md rounded-md border border-black h-[12rem] '>
                       
                    </div>
                    <div className='bg-[#ffff] shadow-md rounded-md border border-black h-[12rem]'>
                       
                    </div>
                    <div className='bg-[#ffff] shadow-md rounded-md border border-black h-[12rem]'></div>
                </div>
            </section>
            <h4 className='text-black text-2xl text-center'>Have Some Question?</h4>
            <div className='contactUs grid grid-cols-1 sm:grid-cols-2 gap-3 p-2 my-3 '>
                <div className='flex justify-center text-2xl items-center flex-col text-black my-2 p-4 '>
                  <img src="../../contactus.jpg.jpg" alt="" className='bg-cover bg-no-repeat' />  
                </div>
                <div className="p-4 bg-white bg-opacity-15 backdrop-blur-lg rounded shadow-lg border border-black">
                    <h2 className="text-xl font-semibold mb-4 text-center">Contact Us Form</h2>
                    <form className="">
                        <div className="flex flex-col py-2">
                            <label htmlFor="username" className="text-sm text-black">Username</label>
                            <input type="text" id="username" name="username" className="input py-2 border border-black" />
                        </div>
                        <div className="flex flex-col py-2">
                            <label htmlFor="email" className="text-sm text-black">Email</label>
                            <input type="email" id="email" name="email" className="input py-2 border border-black" />
                        </div>
                        <div className="flex flex-col py-2">
                            <label htmlFor="subject" className="text-sm text-black">Subject</label>
                            <input type="text" id="subject" name="subject" className="input py-2 border border-black" />
                        </div>
                        <div className="flex flex-col py-2">
                            <label htmlFor="problem" className="text-sm text-black">Describe the problem</label>
                            <textarea id="problem" name="problem" rows="4" className="input py-2 border border-black"></textarea>
                        </div>
                        <button type="submit" className="btn w-full p-3 bg-blue-500 rounded-md">Submit</button>
                    </form>
                </div>
            </div>
            
            <div className='footer bg-black text-white  flex justify-around items-center flex-wrap w-full gap-4 my-4'>
                <div className="footerLeftSide text-center p-5 text-2xl">
                    <h2>FAQs</h2>
                    <h2>Cancellation policy</h2>
                    <h2>Contact us</h2>
                    <h2>About us</h2>
                    <h2>Work with us</h2>
                    <h2>Our sustainability practices</h2>
                    <h2>© 2024 Hikers@Nature Private Limited</h2>
                    <h2>All images are copyrighted by their respective authors.</h2>

                </div>
                <div className="footerRightSide  text-center  p-5 text-2xl">
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
    )
}

export default Home
