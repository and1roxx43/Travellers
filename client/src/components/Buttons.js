import React from "react";
import { NavLink } from "react-router-dom";

function Button() {
    return (
        <div>
            <ul className="btn-container">
                <li className="login-btn"><NavLink className="btn" to="/Login">Login</NavLink></li>
                <li className="register-btn"><NavLink className="btn" to="/Register">Register</NavLink></li>
            </ul>
            
        </div>
    )
}

export default Button;