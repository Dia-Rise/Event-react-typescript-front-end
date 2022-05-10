import React, { useState } from "react"
import Login from "../components/login";
import Register from "../components/register";

export default function LogInPage () {
    const [isLoginForm, setIsLoginForm] = useState(true);
    
    return (
        <>
            {isLoginForm? <Login /> : <Register/>}
            <button onClick={() => setIsLoginForm(false)}>Create an account</button>
            <button onClick={() => setIsLoginForm(true)}>Sign In</button>
        </>
        
    );
}
