import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom"

export default function PrivateRoute ({...props}) {
    //GRABS THE isLoggedIn FROM THE STATS, SET IN THE authSlice FILE
    const { isLoggedIn } = useSelector((state:any) => state.auth);

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;

}