import React from "react";
import { NavLink } from "react-router-dom";

export default function GoHome(){

    return (
        <ul>
            <li className="btn-container"><NavLink className="btn" to="/">Home</NavLink></li>
        </ul>
    )
}