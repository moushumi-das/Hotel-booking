const express = require("express");
const morgan = require("morgan");
const {auth} =require("./handlers/auth")
const {addHotel,getHotels,deleteHotel, updateHotel}=require("./handlers/hotels");
const {getRooms,addRoom,getRoomById,deleteRoom,updateRoom} =require("./handlers/rooms");

require("dotenv").config();
const app = express()
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.static("public"))

const { MongoClient, ObjectId } = require("mongodb");


const MONGO_URI =
  "mongodb+srv://moushumi:Moushumi@cluster0.k6jm7v7.mongodb.net/?retryWrites=true&w=majority";

console.log("MONGO_URI", MONGO_URI);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connect=async()=>{
    try {
    const client = new MongoClient(MONGO_URI, options); 
    await client.connect();
    return client
    console.log("mongoDb is connected")
} catch (error) {
    throw error
    }
}
app.get("/",(req,res)=>{res.send("hello first request!")})
app.get("/api/auth",auth)
app.get("/api/available-hotels",getHotels)
app.post("/api/hotel",addHotel)
app.delete("/api/delete-hotel/:hotel", deleteHotel)
app.patch("/api/update-hotel/:hotel",updateHotel)

app.get("/api/available-rooms",getRooms)
app.post("/api/room",addRoom)
app.delete("/api/delete-room/:room", deleteRoom)
app.patch("/api/update-room/:room",updateRoom)
app.get("*", (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
    });
})
app.listen(8000, () => {
    // connect()
    console.log(`Listening on port 8000`)
});


module.exports={connect}