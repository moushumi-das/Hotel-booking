const { MongoClient, ObjectId } = require("mongodb");

const MONGO_URI =
"mongodb+srv://moushumi:Moushumi@cluster0.k6jm7v7.mongodb.net/?retryWrites=true&w=majority";

console.log("MONGO_URI", MONGO_URI);
const options = {
useNewUrlParser: true,
useUnifiedTopology: true,
};
const addHotel = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  try {
    const result = await db.collection("hotels").insertOne(req.body);
 
    console.log(result, result);
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, _id, data: "Not Found" });
  }
};

const getHotels = async (req, res) => {
    console.log('inside gethotels')
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  try {
   const result = await db.collection("hotels").find().toArray();
 
    console.log("hotels", result);
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, _id, data: "Not Found" });
  }
};

const getHotelById = async (req, res) => {
    console.log('inside gethotels')
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  try {
   const result = await db.collection("hotels").findOne({ _id: ObjectId(_id) });
 
    console.log("hotels", result);
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, _id, data: "Not Found" });
  }
};

const getHotelsByCity = async (req,res)=>{
    const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  const cities= req.query.cities.split(",");
  console.log('cities',cities)
   try {
   const hotels = await Promise.all(cities.map(city=>{
       return db.collection("hotels").countDocuments({city:city}) }))
    console.log("hotels", hotels);
    res.status(200).json({ status: 200, data: hotels });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, _id, data: "Not Found" });
  }
}

const getHotelsByType = async (req,res)=>{
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  
    try {
    const hotelCount=await db.collection("hotels").countDocuments({type:"hotel"});
    const cabinCount=await db.collection("hotels").countDocuments({type:"cottage"});
    const apartmentCount = await db.collection("hotels").countDocuments({type:"apartment"})
    res.status(200).json([{type:"hotel",count:hotelCount},{type:"cottage",count:cabinCount},{type:"apartment",count:apartmentCount}]);
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, _id, data: "Not Found" });
  }
}

const updateHotel = async (req, res) => {
    console.log('inside gethotels')
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  try {
   const result = await db
          .collection("hotels")
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

const deleteHotel = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("hotelBooking");
  try {
    const result = await db
      .collection("hotels")
      .deleteOne({ _id: ObjectId(req.params.hotel) });
    res.status(200).json({ status: 200, data: result });

  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

module.exports={addHotel,getHotels,deleteHotel,updateHotel,getHotelsByCity,getHotelsByType}
