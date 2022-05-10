import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser  } from "../redux/authSlice";

export default function Register() {
    const [registerData, setRegisterData] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const dispatch = useDispatch();
    const history = useNavigate();
    const { isLoggedIn } = useSelector((state:any) => state.auth);

     //ON SUBMIT, PREVENT DEFAULT BEHAVOUR, SEND REQUEST TO API TO LOG THE USER IN.
    const handleSubmit = (e:any) => {
        e.preventDefault();
        dispatch<any>(registerUser(registerData));
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
                <label>First Name</label>
                <input type="text" name="firstName" required onChange={ (e) => setRegisterData( (prev) => ( {...prev, [e.target.name]: e.target.value} ) ) } />

                <label>Last Name</label>
                <input type="text" name="lastName" required onChange={ (e) => setRegisterData( (prev) => ( {...prev, [e.target.name]: e.target.value} ) ) } />

                <label>Email</label>
                <input type="email" name="email" required onChange={ (e) => setRegisterData( (prev) => ( {...prev, [e.target.name]: e.target.value} ) ) } />

                <label>Password</label>
                <input type="password" name="password" required autoComplete="on" onChange={ (e) => setRegisterData( (prev) => ( {...prev, [e.target.name]: e.target.value} ) ) } />

                <button type="submit" disabled={
                    registerData.firstName.trimStart().length === 0 || 
                    registerData.password.trimStart().length === 0 ||
                    registerData.lastName.trimStart().length === 0 ||
                    registerData.email.trimStart().length === 0} >Register</button>
            </form>
        </div>
    );

}