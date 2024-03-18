
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './components/home'
import Register from './components/register'
import CardComponent from './components/card'
import MyFormComponent from './components/form'
import { useDispatch } from 'react-redux'
import { fetchdata } from './redux/userslice'
import { useEffect } from 'react'
import Availablenav from './components/availablenav'
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
        <Route exact path="/availablenav" element={<Availablenav />} />
        <Route exact path="/form" element={<MyFormComponent />} />
        <Route exact path="/available/:ct" element={<CardComponent />} />


      </Routes>

    </>
  )
}

export default App
