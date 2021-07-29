import React from "react";
import GoHome from "../components/HomeButton";

function Login() {
    return (
        <div>
            <div className="login-banner"></div>

            <h1 className="login-heading">Login page</h1>
            
            <div className="form-container">
                <form>
                  
                    <input type="text" placeholder="Username" />
            
                    <input type="password" placeholder="password" />

                    <button className="register">Login</button>
                    
                </form>
            </div>
            <GoHome />
        </div>
    )
}

export default Login;