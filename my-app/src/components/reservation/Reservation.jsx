import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reservation.css";
import { useContext, useState,useEffect } from "react";
import { SearchContext } from "../../SearchContext";
import { useNavigate } from "react-router-dom";

const Reservation = ({ setOpen, hotelId }) => {
    
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [data,setData]=useState();
  const[roomNumber,setRoomNumber]=useState();
  const [selectedRoomId,setSelectedRoomId]=useState()

     const fetchedHotel = async () => {
    const response = await fetch(`/api/room/${hotelId}`);
    const result = await response.json();
  
    setData(result.data)
  };
  useEffect(() => {
    fetchedHotel();
  },[]);
  const { date } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(date[0].startDate, date[0].endDate);
console.log('alldates',alldates)
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e,roomNumber,id) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setRoomNumber(roomNumber)
    setSelectedRoomId(id)
  

    setSelectedRooms(
      checked
        ? [...selectedRooms, roomNumber]
        : selectedRooms.filter((item) => item !== roomNumber)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms?.map((roomId) => {
        const response =  fetch(`/api/availability/${selectedRoomId}/${roomNumber}`, 
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ dates: alldates,}),
        });
        const fetchData = response.json();
        return fetchData;
    })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data?.map((item) => (
          <div className="rItem" key={item?._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item?.title}</div>
              <div className="rDesc">{item?.desc}</div>
              <div className="rMax">
                Max people: <b>{item?.maxPeople}</b>
              </div>
              <div className="rPrice">${item?.price}</div>
            </div>
            <div className="rSelectRooms">
              {item?.roomNumbers?.map((roomNumber) => (
                <div className="room">
                  <label style={{'font':"14px",}}>{roomNumber?.number}</label>
                  <input
                    type="checkbox"
                    value={{number:roomNumber?.number,id:item._id}}
                    onChange={(e) => handleSelect(e,roomNumber?.number,item._id)}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reservation;