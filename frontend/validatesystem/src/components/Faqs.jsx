import React from 'react';
import { Link } from 'react-router-dom';
function Faqs() {
  return (
    <div className="container mx-auto p-4">
      <h4 className="text-2xl font-bold mb-4 text-center">Do You Have Questions?</h4>
      <h4 className="text-xl text-center mb-6">We have answers (well, most of the times!)</h4>
      <p className="mb-6">
        Below you’ll find answers to the most common questions you may have on LabourHub & Online Advertising. If you still can’t find the answer you’re looking for, just <Link to="/" className="text-blue-500">Contact us!</Link>
      </p>
      <div className=' min-h-[30vh] my-2  '>
        <img src="../../faqsimage.png" alt="" className='mx-auto' />
      </div>
      <div className="faq-section">

        <div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4">
          <div className="collapse-title text-lg font-medium">
            What is LabourHub?
          </div>
          <div className="collapse-content">
            <p>LabourHub is a hiring platform that connects laborers with employers. Our mission is to make the hiring process easy and efficient.</p>
          </div>
        </div>

        <div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4">
          <div className="collapse-title text-lg font-medium">
            How do I create an account?
          </div>
          <div className="collapse-content">
            <p>To create an account, click on the Register button on the center of the homepage and fill in the required details. This option can also be seen by clicking hambergur menu on mobile screens</p>
          </div>
        </div>

        <div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4">
          <div className="collapse-title text-lg font-medium">
            How can I advertise my products on LabourHub?
          </div>
          <div className="collapse-content">
            <p>You can advertise your products by  booking an advertisement slot.For that you can contact one of the numbers given on home page. Navigate to the home page and you can also contact us in message section on home page.</p>
          </div>
        </div>

        <div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4">
          <div className="collapse-title text-lg font-medium">
            What are the benefits of advertising on LabourHub?
          </div>
          <div className="collapse-content">
            <p>Advertising on LabourHub helps you reach a targeted audience looking for construction products or labourer services. It increases your visibility and chances of getting your products sold quickly</p>
          </div>
        </div>

        <div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4">
          <div className="collapse-title text-lg font-medium">
            How can I contact support?
          </div>
          <div className="collapse-content">
            <p>You can contact our support team by visiting the 'Contact Us' page and filling out the contact form. We are here to help!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faqs;
