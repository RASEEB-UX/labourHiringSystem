import { React, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
function ProtectedComponent() {
    const navigate = useNavigate()

    const authStatus = useSelector((state) => state.userStore.authStatus)
    const userType = useSelector((state) => state.userStore.userType)
    const location = useLocation()
    console.log( location)
    useEffect(() => {
        if(!location?.state?.userChoice)
            return navigate('/')
        if( location.state.userChoice=='worker')
            {
                console.log('redirecvted to signin')
                navigate('/signin',{state:{navigateUrl:'/workerpage'}})
                return
            }
        if (!authStatus || userType !== location.state.userChoice) {
            console.log('bad guy')
            navigate('/loginform')
        }
    }, [authStatus, userType,location.state])
    if (authStatus && userType == location.state.userChoice) 
        return <Outlet />

}

export default ProtectedComponent
