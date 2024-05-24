import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAuthStatus, addUserEmail, addUserMobile, addUserType } from './redux/userSlice';
import { addAdvertisement } from './redux/advertisementSlice.js'
import axios from 'axios';
import Navbar from './components/navbar';
import { fetchWorkerData } from './redux/workerSlice';
const EmailOtpVerification = React.lazy(() => import('./components/emailOtpVerification'));
const LoginForm = React.lazy(() => import('./components/loginForm'));
const Home = React.lazy(() => import('./components/home'));
const Register = React.lazy(() => import('./components/register'));
const CardComponent = React.lazy(() => import('./components/card'));
const Update = React.lazy(() => import('./components/update'));
const Updateform = React.lazy(() => import('./components/updateform'));
const UserProfilePage = React.lazy(() => import('./components/userProfilePage'));
const AdminPage = React.lazy(() => import('./components/adminPage'));
const WorkerProfilePage = React.lazy(() => import('./components/workerProfilePage'));
const UserRegister = React.lazy(() => import('./components/userRegister'));
const ProtectedComponent = React.lazy(() => import('./components/protectedComponent'));
const AdminMainPage = React.lazy(() => import('./components/adminMainPage'))
const AllFeedBackMessages = React.lazy(() => import('./components/allFeedBackMessages'))
const SignInButton = React.lazy(() => import('./components/phone.jsx'))
const WorkerProtectedComponent = React.lazy(() => import('./components/workerProtectedComponent.jsx'))
const RegisterProtectedComponent = React.lazy(() => import('./components/registerProtected.jsx'))
const UserProtectedComponent = React.lazy(() => import('./components/userProtectedComponent.jsx'))
const PendingRequestsComponent = React.lazy(() => import('./components/pendingRequests.jsx'))
const ViewDocumentsComponent = React.lazy(() => import('./components/viewDocuments.jsx'))
const Advertisement = React.lazy(() => import('./components/advertisement.jsx'))
const UserWorkerLogin = React.lazy(() => import('./components/userWorkerLogin.jsx'))
function App() {
  const dispatch = useDispatch();
  const fetchAdvertisement = async () => {
    try {
      const advertisementResponse = await axios.get('http://localhost:8000/api/advertisement/getAdvertisement')
      console.log(advertisementResponse)
      dispatch(addAdvertisement(advertisementResponse.data.advertisement))
    }
    catch (err) {
      console.log(err)
    }
  }
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('https://labourhiringsystem-1.onrender.com/api/checkauthstatus', { withCredentials: true })
      dispatch(addUserType(response.data.userType))
      dispatch(addAuthStatus(true))
      dispatch(addUserEmail(response.data.email))
      dispatch(addUserMobile(response.data.mobile))
    }
    catch (err) {
      console.log('error from app.js checkauthstatus function', err)

    }
  }
  useEffect(() => {
    dispatch(fetchWorkerData());
    checkAuthStatus()
    fetchAdvertisement()
  }, [dispatch]);

  return (
    <div className='bg-[#FEFAF6]'>
      <Navbar />
      <Suspense fallback={
        <div className='h-[90vh] flex justify-center items-center'>
          <div className='text-2xl'>Loading... <span className="loading loading-spinner loading-xs"></span></div>
        </div>}>
        <Routes>
          <Route exact path="/" element={<Home />} />


          <Route exact path='/update' element={<Update />} />
          <Route exact path='/loginform' element={<LoginForm />} />
          {/* protected component for registration pages of user and worker*/}
          <Route element={<RegisterProtectedComponent />}>
            <Route exact path="/register" element={<Register />} />
            <Route exact path='/userRegister' element={<UserRegister />} />
          </Route>
          <Route exact path='/updateform' element={<Updateform />} />
          <Route exact path="/available" element={<CardComponent />} />
          <Route exact path='/signin' element={<SignInButton />} />
          <Route exact path='/loginwithpassword' element={<UserWorkerLogin />} />
          <Route exact path='/emailotpform' element={<EmailOtpVerification />} />
          {/* protected component for admin page,userpage */}
          <Route element={<ProtectedComponent />}>

            <Route exact path='/adminpage' element={<AdminPage />} >
              <Route exact path='/adminpage' element={<AdminMainPage />} />

              <Route exact path='/adminpage/getallfeedbacks' element={<AllFeedBackMessages />} />
              <Route exact path='/adminpage/advertisement' element={<Advertisement />} />
              <Route exact path='/adminpage/getpendingrequests' element={<PendingRequestsComponent />} />
              <Route exact path='/adminpage/viewdocuments' element={<ViewDocumentsComponent />} />
            </Route>
          </Route>
          <Route element={<UserProtectedComponent />}>
            <Route exact path='/userpage' element={<UserProfilePage />} />
            <Route exact path='/workerpage' element={<WorkerProfilePage />} />
          </Route>
          {/* protected component for worker profile page*/}
        </Routes>
      </Suspense>

    </div>
  );
}

export default App;
