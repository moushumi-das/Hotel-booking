import React, { useState,useContext } from "react";
import {faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../SearchContext";
import { AuthContext } from "../../AuthContext";


const Header = ({type})=>{
      const [destination, setDestination] = useState("");

    const [openDate,setOpenDate]=useState(false)
    const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { state } = useContext(AuthContext);
      const {user}=state

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();

    const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const { dispatch } = useContext(SearchContext);

   const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
     dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
  };
    return (
        <div className="header">
            <div className="headerContainer">
                <div className="headerList">
                    <div className="headerListItem">
                    <FontAwesomeIcon icon={faBed} />             
                    <span>Stays</span>
                    </div>
                    
                    <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} />             
                    <span>Car Rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />             
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />             
                        <span>Airport taxis</span>
                    </div>
               </div>

            {type !== "list" && (
            <>
        
            <h1 className="headerTitle">Abhdbfndnsd sdn sdnnsdndn fbsd</h1>
            <p className="headerDescription">
                cnxc ncnsc zxx sjads nsmdns sz\m akj djsdj skmka sam sksj jd hxz ncxmnc mcxnc
            </p>
            {!user&&<button className="headerButton">Sign in /Register</button>}
            
            <div className="searchBar">
                <div className="searchItem">
                <input 
                type="text"
                placeholder="what's your destination"
                className="searchInput"
                onChange={(e)=>setDestination(e.target.value)}
                />
                </div>
                <div className="searchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                 <span
                  onClick={() => {
                      setOpenOptions(!openOptions);
                      console.log('options',options)
                    }}
                  className="searchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                    <div className="options">
                    <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                        <button disabled={options.adult<=1} className="optionCounterButton" onClick={() => handleOption("adult", "d")}>-</button>
                        <span className="optionCounterNumber">{options.adult}</span>
                        <button className="optionCounterButton"  onClick={() => handleOption("adult", "i")}>+</button>
                    </div>
                        
                </div>
                 <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">
                        <button disabled={options.children<=0} className="optionCounterButton" onClick={() => handleOption("children", "d")}>-</button>
                        <span className="optionCounterNumber">{options.children}</span>
                        <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                    </div>
                </div>
                 <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                        <button disabled={options.room<=1} className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                        <span className="optionCounterNumber">{options.room}</span>
                        <button className="optionCounterButton" onClick={() => handleOption("room", "i")} >+</button>
                    </div>
   
                </div>

                    </div>
                )}
               
                </div>
                <div className="searchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
             <span onClick={()=>{
                 setOpenDate(!openDate)
             }} className="searchText"> {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
             } 
            
            
                </div>
                <button className="headerBtn" onClick={handleSearch} >
                        Search
                    </button>
            </div>
             </>
             )}

        </div>    
        </div>
    )
}
export default Header