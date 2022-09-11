import React from "react";
import FeaturedComponent from "../../components/featuredPlace/FeaturedPlace";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import './home.css'
import PopularPropertyList from "../../components/popularHomes/PopularProperty.jsx"
import FeaturedProperties from "../../components/propertyList/PropertyList.jsx"
import EmailList from "../../components/subscriptions/EmailList";
import Footer from "../../components/footer/Footer"
const Home = ()=>{
    return (
   <div>
    <Navbar/>
    <Header/>
    <div className="homeDetails">
        <FeaturedComponent/>
        <h1 className="propertyDetails">Browser by property type</h1>
        <PopularPropertyList/>
        <h1 className="propertyDetails">Popular homes</h1>
        <FeaturedProperties/>
        <EmailList/>
        <Footer/>


    </div>
   </div>
    )
}
export default Home