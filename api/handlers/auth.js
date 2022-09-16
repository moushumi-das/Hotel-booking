const { MongoClient } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const MONGO_URI =
"mongodb+srv://moushumi:Moushumi@cluster0.k6jm7v7.mongodb.net/?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
// signup method will create a new user
const signUp = async (req, res) => {
  const data = req.body;
  try {
    await client.connect();
    const db = client.db("hotelBooking");
    const isUser = await db.collection("users").findOne({ email: data.email });
    if (!isUser) {
      const newUser = await db.collection("users").insertOne(data);
      res
        .status(200)
        .json({ status: 200, message: "user added", data: newUser });
    } else {
      res.status(202).json({ status: 400, message: "user already exist" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};
// updateUser will update the user information
const updateUser = async (req, res) => {
  const data = req.body;
  try {
    await client.connect();

    const db = client.db("hotelBooking");
    if (data?.userName) {
      await db.collection("users").updateOne(
        { _id: orderItem.item._id },
        {
          $set: {
            userName: data.userName,
          },
        }
      );
      res.status(200).json({ status: 200, message: "userName updated" });
    }
    if (data?.email) {
      await db.collection("users").updateOne(
        { _id: orderItem.item._id },
        {
          $set: {
            email: data.email,
          },
        }
      );
      res
        .status(200)
        .json({ status: 200, message: "user email has been updated" });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: "User not added" });
  }
};
// signIn method will check if we have this user in Database
const signIn = async (req, res) => {
  const data = req.body;
  console.log("user details",data)
  try {
    await client.connect();
    const db = client.db("hotelBooking");
    const isUser = await db.collection("users").findOne({ email: data.email });

    if (isUser && isUser.password.toString() === data.password) {
      //creating token for athunticated user using jsonWebToken
      const token = jwt.sign(
        { name: isUser.userName, email: isUser.email },
        "secret123"
      );
      res.status(200).json({
        status: 200,
        message: "user logedIn",
        data: isUser,
        token: token,
      });
    } else {
      res.status(400).json({ status: 400, message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: "User not found" });
  }
};
module.exports = { signUp, signIn,updateUser }; 