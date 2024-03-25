
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './components/home'
import Register from './components/register'
import CardComponent from './components/card'
import Update from './components/update'
import { useDispatch } from 'react-redux'
import { fetchdata } from './redux/userslice'
import { useEffect } from 'react'
import Updateform from './components/updateform'
import Cancel from './components/paymentfailure'
import PaymentSuccess from './components/paymentsuccess'
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchdata())
  }, [])
  return (
    <>
      <Navbar />

      <Routes>

        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path='/update' element={<Update/>}/>
        <Route exact path='/updateform/:id' element={<Updateform/>}/>
        <Route exact path="/available/:ct" element={<CardComponent />} />
        <Route exact path='/success' element={<PaymentSuccess/>}/>
        <Route exact path='/cancel' element={<Cancel/>}/>



      </Routes>

    </>
  )
}

export default App
