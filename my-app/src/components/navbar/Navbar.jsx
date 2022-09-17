import React,{useContext} from "react";
import "./navbar.css"
import {Link}from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const Navbar = ()=>{
      const { state } = useContext(AuthContext);
      const {user}=state
    return (
        <div className="navbar">
                <div className="navContainer">
                    <Link to="/" style={{color:"white",textDecoration:"none"}}>
                    <span className="logo">luxaryBooking</span>
                    </Link>
                    {user ? user.userName : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <Link to="/login">
            <button className="navButton">Login</button>
            </Link>
          </div>
            
        )}
                    </div>

        </div>
    )
}
export default Navbar