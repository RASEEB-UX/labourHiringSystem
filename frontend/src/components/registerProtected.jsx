import { React, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
function WorkerProtectedComponent() {
    const navigate = useNavigate()
    const location = useLocation()
    console.log( location)
    useEffect(() => {
        if (!location.state) {
           navigate('/signin',{state:{navigateUrl:location.pathname}})
        }
    }, [location.state])
    if (location.state?.phoneValidated) 
        return <Outlet />

}

export default WorkerProtectedComponent
