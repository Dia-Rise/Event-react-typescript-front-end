import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";

export default function Login() {
    const [loginData, setLoginData] = useState({email: "", password: ""});
    const dispatch = useDispatch();
    const history = useNavigate();
    const { isLoggedIn } = useSelector((state:any) => state.auth);

    //ON SUBMIT, PREVENT DEFAULT BEHAVOUR, SEND REQUEST TO API TO LOG THE USER IN.
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch<any>(loginUser(loginData))
    };

    //IF LOGGED IN, REDIRECT TO HOME PAGE
    useEffect(() => {
        if (isLoggedIn) {
            history("/");
        }
    }, [isLoggedIn, history]);


    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <label>Email</label>
                <input type="email" name="email" required onChange={ (e) => setLoginData( (prev) => ( {...prev, [e.target.name]: e.target.value} ) ) } />

                <label>Password</label>
                <input type="password" name="password" required autoComplete="on" onChange={ (e) => setLoginData( (prev) => ( {...prev, [e.target.name]: e.target.value} ) ) } />

                <button type="submit" disabled={loginData.email.trimStart().length === 0 || loginData.password.trimStart().length === 0} >Log In</button>
            </form>
        </div>
    );

}