const { MongoClient, ObjectId } = require("mongodb");

const MONGO_URI =
"mongodb+srv://moushumi:Moushumi@cluster0.k6jm7v7.mongodb.net/?retryWrites=true&w=majority";

console.log("MONGO_URI", MONGO_URI);
const options = {
useNewUrlParser: true,
useUnifiedTopology: true,
};
const addRoom = async (req, res) => {
    const hotelId = req.params.hotelid;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  try {
    const result = await db.collection("rooms").insertOne(req.body);
   const hotel=await db.collection("hotels").findOne({ _id:ObjectId(hotelId) })

    const updatedHotel= await db.collection("hotels").updateOne({_id:ObjectId(hotelId)},{ $push:{rooms:result.insertedId}})

    res.status(200).json({ status: 200, data: result});
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, _id, data: "Not Found" });
  }
 

};

const getRooms = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  try {
   const result = await db.collection("rooms").find().toArray();
 
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, _id, data: "Not Found" });
  }
};

const getRoomById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  try {
   const result = await db.collection("rooms").findOne({ _id: ObjectId(_id) });
 
    console.log("rooms", result);
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, _id, data: "Not Found" });
  }
};

const updateRoom = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  try {
   const result = await db
          .collection("rooms")
          .updateOne(
            { _id: ObjectId(req.params._id) },
            { $set: { ...req.body } }
          );
    res.status(200).json({ status: 200, _id, data: result });

  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, _id, data: "Not Found" });
  }
};

const updateRoomAvailability = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  try {
  const rooms = await db.collection("rooms").findOne({ _id: ObjectId(req.params.id) });
  const roomNum=req.params.roomnumber
   const updatesAvailableDates = rooms.roomNumbers.map((item) =>
      item.number.toString() === roomNum ? { ...item, unavailableDates: [...item.unavailableDates,...req.body.dates ]} : item
    );
    await db
      .collection("rooms")
      .updateOne(
        { _id: ObjectId(rooms._id) },
        { $set: { roomNumbers: updatesAvailableDates } }
      );
    
    res.status(200).json({ status: 200,  data: rooms });

  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404,  data: "Not Found" });
  }
};
const deleteRoom = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const hotelId = req.params.hotelid;
  await client.connect();
  const db = client.db("hotelBooking");
  try {
    const result = await db
      .collection("rooms")
      .deleteOne({ _id: ObjectId(req.params.room) });
       
    const updatedHotel= await db.collection("hotels").updateOne({_id:ObjectId(hotelId)},{ $pull:{rooms:ObjectId(req.params.room)}})
    res.status(200).json({ status: 200, data: result });

  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

module.exports={addRoom,getRooms,getRoomById,deleteRoom,updateRoom,updateRoomAvailability}