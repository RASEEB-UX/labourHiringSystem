import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
function Navbar() {
  const navigate = useNavigate()
  const [reached, setreached] = useState(false)
  window.addEventListener('resize', () => {
    let width = window.innerWidth;
    let reqpath=/^\/available(\/.*)?$/
    let path = window.location.pathname;
    console.log(width+"" +path)
    console.log('reached is ',reached)
    
    
    console.log('path reached ',reqpath.test(path))
    if (width <=500 && reqpath.test(path)) {
      setreached(true)
    }
    else{
      setreached(false)
    }
  }, true)
  if(reached)
  return null;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 position-sticky border rounded-1 border-dark">
        <div className="container-fluid">
          <h3 className="navbar-brand list-style-type-none">Labourhub</h3>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0 gap-5 px-5">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className='nav-item'>Features</li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/available/all">Available</Link>
              </li>
            </ul>
            <form className="d-flex">

              <button className="btn  bg-primary px-5 text-white" type="button" onClick={() => navigate('/register')}>Register</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
