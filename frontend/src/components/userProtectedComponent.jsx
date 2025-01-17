import { React, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
function UserProtectedComponent() {
    const navigate = useNavigate()
    const location = useLocation()
    const userStore = useSelector((state) => state.userStore)
    console.log(location)
    useEffect(() => {
        console.log(location.state.userChoice)
        if (!userStore.authStatus || userStore.userType !== location.state.userChoice) {
            console.log('hey')
            navigate('/loginwithpassword', { state: { navigateUrl: location.pathname } })
        }
    }, [location.state])
    if (userStore.authStatus && userStore.userType == location.state.userChoice) {

        return <Outlet />

    }


}

export default UserProtectedComponent

