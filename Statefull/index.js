const express = require("express");
//const path = require('path');
const bcrypt =require('bcrypt');
const collection = require("./config")

const app = express();

//covert data into json 
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// use EJS as view engine
app.set('view engine', 'ejs');


app.get("/" ,(req,res)=>{
  res.render("login");
})


app.get("/signup" ,(req,res)=>{
  res.render("signup");
})


//register user
app.post("/signup",async(req,res)=>{
  const data = {
    name:req.body.username,
    password:req.body.password
  }
  //check if the user already exist in the database
const existingUser = await collection.findOne({name: data.name});

if(existingUser){
  res.send("User already exists. Please choose a different Username")
}
else{

  // for hashing password using bcrypt
  const saltRounds = 10; // number of salt round for bcrypt
  const hashedPassword = await bcrypt.hash(data.password,saltRounds);
  data.password= hashedPassword;  //convert hash password into original password

  //otherwise username and password inserting in databse after clicking button
  const userData= await collection.insertMany(data);
  console.log(userData)

  //redirect page
  res.render("Home")
}
})



//Login user
app.post("/login",async(req,res)=>{
  try {
    const check = await collection.findOne({name:req.body.username});
    if(!check){
      res.send("username cannot found")
    }
    //compare the hash password from the database with plain text
    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if(isPasswordMatch){
      res.render("home")
    }
    else{
      req.send("Wrong password")
    }

  } catch (error) {
    res.send("Wrong password")
  }
})


const port = 5000;
app.listen(port, ()=>{
  console.log(`server running on Port : ${port}`);
})