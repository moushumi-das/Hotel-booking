import React from "react";
import FeaturedComponent from "../../components/featuredPlace/FeaturedPlace";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";


const Home = ()=>{
    return (
   <div>
    <Navbar/>
    <Header/>
    <div className="HomeDetails">
        <FeaturedComponent/>
    </div>
   </div>
    )
}
export default Home