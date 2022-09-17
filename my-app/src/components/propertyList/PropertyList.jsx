import "./propertyList.css";
 import React,{useEffect,useState} from "react";
import SearchItem from "../searchItem/SearchItem";

const FeaturedProperties = () => {
      const [featuredHotel, setFeaturedHotel] = useState("");

     const fetchedFeaturedHotel = async () => {
    const response = await fetch(`/api/featured-hotel`);
    const result = await response.json();
  
    setFeaturedHotel(result)
    return result;
  };
  useEffect(() => {
    fetchedFeaturedHotel();
  },[]);
  return (
    <div className="fp">
        <>
        {featuredHotel.data?.map((hotel)=>(
              <div className="fpItem">
            <img
                src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
                alt=""
                className="fpImg"
            />
            <span className="fpName">{hotel?.name}</span>
            <span className="fpCity">{hotel?.city}</span>
            <span className="fpPrice">Starting from {hotel?.cheapestPrice}</span>
            {hotel.rating && <div className="fpRating">
                <button>{hotel.rating}</button>
                <span>Excellent</span>
            </div>}
        </div>
        )
            
      
        )}
        
        </>
    </div>
    );
};

export default FeaturedProperties;