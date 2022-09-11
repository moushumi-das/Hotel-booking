const {connect} =require("../index")
const auth=async(req,res)=>{
    const mongoConnection= connect()
    console.log(mongoConnection)
    res.send("hello from authenticated page!")
}

module.exports={auth}