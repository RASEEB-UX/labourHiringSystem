import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAuthStatus, addUserEmail, addUserType} from './redux/userSlice';
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
const Otp = React.lazy(() => import('./components/otp'));
const UserProfilePage = React.lazy(() => import('./components/userProfilePage'));
const AdminPage = React.lazy(() => import('./components/adminPage'));
const WorkerProfilePage = React.lazy(() => import('./components/workerProfilePage'));
const UserRegister = React.lazy(() => import('./components/userRegister'));
const ProtectedComponent = React.lazy(() => import('./components/protectedComponent'));
const AdminMainPage = React.lazy(() => import('./components/adminMainPage'))
const AllFeedBackMessages=React.lazy(()=>import('./components/allFeedBackMessages'))
const SignInButton  = React.lazy(() => import('./components/phone.jsx'))

function App() {
  const dispatch = useDispatch();
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/checkauthstatus', { withCredentials: true })
      dispatch(addUserType(response.data.userType))
      dispatch(addAuthStatus(true))
      dispatch(addUserEmail(response.data.email))
    }
    catch (err) {
      console.log('error from app.js checkauthstatus function', err)

    }
  }
  useEffect(() => {
    dispatch(fetchWorkerData());
    checkAuthStatus()
  }, [dispatch]);

  return (
    <div className='bg-[#FEFAF6]'>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/otpform/:phoneNumber" element={<Otp />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path='/update' element={<Update />} />
          <Route exact path='/loginform' element={<LoginForm />} />
          <Route exact path='/userRegister' element={<UserRegister />} />
          <Route exact path='/updateform' element={<Updateform />} />
          <Route exact path="/available/:ct" element={<CardComponent />} />
          <Route exact path='/signin' element={<SignInButton />} />
         
          <Route exact path='/emailotpform' element={<EmailOtpVerification />} />
          <Route element={<ProtectedComponent />}>
            <Route exact path='/workerpage' element={<WorkerProfilePage />} />
            <Route exact path='/userpage' element={<UserProfilePage />} />
            <Route exact path='/adminpage' element={<AdminPage />} >
              <Route exact path='/adminpage' element={<AdminMainPage />} />
              <Route exact path='/adminpage/getallfeedbacks' element={<AllFeedBackMessages />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>

    </div>
  );
}

export default App;
