 import React from "react";
 import "./featuredPlace.css"
const FeaturedComponent=()=>{
    return (
        <div className="featuredPlace">
            <div className="featuredItem">
                <img src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=" alt="" className="itemImg"/>
                <div className="itemTitles">
                     <h1>Bangladesh</h1>
                    <h2>Lawachara, Sylhet</h2>
                </div>
            </div>
      
           <div className="featuredItem">
                <img
                src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=" alt=""className="itemImg"/>
                <div className="itemTitles">
                    <h1>Singapore</h1>
                    <h2>123 patrion road</h2>
                </div>
            </div>

            <div className="featuredItem">
                <img
                src="https://cf.bstatic.com/xdata/images/xphoto/max500/170335205.webp?k=d93f0fd679117580857507c964cdd3cea26571923cda7c21871f9bd9acc2b241&o="
                alt="" className="itemImg"/>
                <div className="itemTitles">
                    <h1>Reno</h1>
                    <h2>533 properties</h2>
                </div>
            </div>
           <div className="featuredItem">
                <img src="https://cf.bstatic.com/xdata/images/xphoto/max500/167580228.webp?k=081bfa5713fa309507294247377ac4d4b9c23d45bbb3161711c97ba2847b7bfc&o=" alt="" className="itemImg"/>
                <div className="itemTitles">
                    <h1>Austin</h1>
                    <h2>532 properties</h2>
                </div>
            </div>
        </div>
    )
}
export default FeaturedComponent