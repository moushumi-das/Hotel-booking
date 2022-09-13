import React from "react";
import "./navbar.css"
import {Link}from "react-router-dom"
const Navbar = ()=>{
    return (
        <div className="navbar">
                <div className="navContainer">
                    <Link to="/" style={{color:"white",textDecoration:"none"}}>
                    <span className="logo">luxaryBooking</span>
                    </Link>
                    <div className="navItems">
                        <div className="navButton">Register</div>
                        <div className="navButton">Login</div>
                    </div>
                    </div>

        </div>
    )
}
export default Navbar