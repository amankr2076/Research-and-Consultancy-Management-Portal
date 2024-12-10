import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet} from 'react-router-dom';

const UserRoute = ({children}) => {

    const {token} = useSelector((state) => state.auth);
    const { user } = useSelector((state)=>state.profile);

    if(token !== null && user?.ac_type==="normal_user")
        return <Outlet />
    else if(token !==null && user?.ac_type!=="normal_user")
        return <Navigate to={"/not-auth"}/>
    else
        return <Navigate to="/login" />

}

export default UserRoute
