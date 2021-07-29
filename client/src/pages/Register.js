import React from "react";
import GoHome from "../components/HomeButton";

function Register() {
    return (
        <div>
            <div>
            <div className="login-banner"></div>

            <h1 className="login-heading">Register page</h1>
            
            <div className="form-container">
                <form>
                  
                    <input type="text" placeholder="Username" />
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="password" />
                    <input type="password" placeholder="Confirm Password" />

                    <button className="register">Register</button>
                    
                </form>
            </div>
            <GoHome />
        </div>
        </div>
    )
}

export default Register;