const { MongoClient, ObjectId } = require("mongodb");

const MONGO_URI =
"mongodb+srv://moushumi:Moushumi@cluster0.k6jm7v7.mongodb.net/?retryWrites=true&w=majority";

console.log("MONGO_URI", MONGO_URI);
const options = {
useNewUrlParser: true,
useUnifiedTopology: true,
};
const addRoom = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  try {
    const result = await db.collection("rooms").insertOne(req.body);
 
    console.log(result, result);
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, _id, data: "Not Found" });
  }
};

const getRooms = async (req, res) => {
    console.log('inside gethotels')
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  try {
   const result = await db.collection("rooms").find().toArray();
 
    console.log("rooms", result);
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, _id, data: "Not Found" });
  }
};

const getRoomById = async (req, res) => {
    console.log('inside gethotels')
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
    console.log('inside gethotels')
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

const deleteRoom = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  try {
    const result = await db
      .collection("rooms")
      .deleteOne({ _id: ObjectId(req.params.hotel) });
    res.status(200).json({ status: 200, data: result });

  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

module.exports={addRoom,getRooms,getRoomById,deleteRoom,updateRoom}