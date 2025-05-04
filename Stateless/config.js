const mongoose = require('mongoose')



//database connect 
mongoose.connect('mongodb://127.0.0.1:27017/authentication-stateless')
.then(()=>{console.log("Databse connected")}).catch(()=>{
  console.log("Databse cannot be connected")
})


//create a schema
const LoginSchemas = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
})


//collection part
const collection = new mongoose.model("users",LoginSchemas);

module.exports= collection;