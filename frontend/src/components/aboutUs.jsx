import React from 'react';

function AboutUs() {
    return (
        <div className='flex flex-col justify-center items-center min-h-[90vh] p-4 bg-gray-100'>
            <div className='w-full max-w-4xl'>
                <div className='mb-8 p-6 bg-white shadow-lg rounded-lg hover:scale-105 transition-all duration-700 '>
                    <h4 className='text-2xl font-bold mb-4 text-gray-800 hover:text-blue-600 transition duration-300'>About Us</h4>
                    <p className='text-gray-700'>Welcome to LabourHub, your trusted partner in connecting skilled laborers with employers in need. In today's fast-paced and evolving world, the demand for reliable and hardworking labor is more critical than ever. Our platform is designed to bridge the gap between illiterate workers and those who require their essential services, ensuring a seamless hiring process that benefits both parties.</p>
                </div>
                <div className='mb-8 p-6 bg-white shadow-lg rounded-lg hover:scale-105 transition-all duration-700 '>
                    <h4 className='text-2xl font-bold mb-4 text-gray-800 hover:text-blue-600 transition duration-300'>Our Mission</h4>
                    <p className='text-gray-700'>At LabourHub, we believe in the dignity of labor and the importance of providing equal opportunities for everyone, regardless of their educational background. Our mission is to empower illiterate workers by offering them a platform where they can showcase their skills and connect with potential employers. We aim to create a more inclusive job market that values hard work, dedication, and practical skills.</p>
                </div>
                <div className='mb-8 p-6 bg-white shadow-lg hover:scale-105 transition-all duration-700  rounded-lg'>
                    <h4 className='text-2xl font-bold mb-4 text-gray-800 hover:text-blue-600 transition duration-300'>Why LabourHub</h4>
                    <h5 className='text-xl font-semibold mb-2 text-gray-800'>Addressing a Critical Need</h5>
                    <p className='text-gray-700'>In today's economy, many industries rely heavily on manual labor for various tasks, from construction and manufacturing to agriculture and domestic services. However, finding reliable and skilled workers can be challenging, especially for employers looking to fill positions quickly. LabourHub addresses this need by providing a comprehensive database of available workers, making the hiring process efficient and straightforward.</p>
                    <h5 className='text-xl font-semibold mb-2 mt-4 text-gray-800'>Empowering Workers</h5>
                    <p className='text-gray-700'>For many illiterate workers, traditional job search methods can be daunting and ineffective. LabourHub offers these individuals a chance to find stable employment and improve their livelihoods. By creating a user-friendly platform, we make it easier for workers to find job opportunities that match their skills and experience.</p>
                    <h5 className='text-xl font-semibold mb-2 mt-4 text-gray-800'>Enhancing Efficiency</h5>
                    <p className='text-gray-700'>Employers often face difficulties in sourcing labor for short-term or urgent projects. Our platform streamlines the hiring process by allowing employers to quickly find and hire workers who meet their specific needs. This not only saves time but also ensures that projects are completed on schedule with the right workforce.</p>
                    <h5 className='text-xl font-semibold mb-2 mt-4 text-gray-800'>Fostering Community Growth</h5>
                    <p className='text-gray-700'>By connecting workers with employers, LabourHub contributes to the economic growth and development of local communities. We help reduce unemployment rates among illiterate workers and provide them with the opportunity to contribute meaningfully to society. This, in turn, helps businesses thrive and fosters a more robust local economy.</p>
                </div>
                <div className='mb-8 p-6 hover:scale-105 transition-all duration-700  bg-white shadow-lg rounded-lg'>
                    <h4 className='text-2xl font-bold mb-4 text-gray-800 hover:text-blue-600 transition duration-300'>Join Us Today</h4>
                    <p className='text-gray-700'>LabourHub is more than just a hiring platform; it is a community dedicated to improving the lives of workers and enhancing the efficiency of businesses. Join us today and be part of a transformative movement that values hard work, promotes inclusivity, and drives economic growth. Together, we can build a better future for everyone.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;

