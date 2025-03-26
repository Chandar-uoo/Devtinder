const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user")
const { validations } = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const Jwt = require("jsonwebtoken");
const {userauth} = require("./middleware/auth")
// crate a server by creating a express instance
const app = express();

// universal modifier 
app.use(express.json());
app.use(cookieparser());

// db logic to connect
connectDB()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.error("failed");
  });
app.listen(5000, () => {
  console.log("sucess");
});

// signup
app.post("/signup", async (req, res) => {
  try {
    validations(req)
    const { firstName, lastName, email, password, age, gender, about, photo, skills } = req.body;
    const passwordkey = await bcrypt.hash(password, 15);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordkey,
      age,
      gender,
      about,
      photo,
      skills
    });
    await user.save();
    res.send("sucess da boi")
  }
  catch (err) {
    res.status(404).send(err.message + "Error")
  }
});

// login 
app.get("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const ishere = await User.findOne({ email: email });
    if (!ishere) {
      throw new Error("invalid")
    }
    const keyvalid = await bcrypt.compare(password, ishere.password);
    if (!keyvalid) {
      throw new Error("invalid")
    }
    else {
         const token = await Jwt.sign({id:ishere.id},"DEVTINDER@123");
         res.cookie("token",token)
         res.send("you are my man")
    }
  }
  catch (err) {
    res.status(404).send(err.message + "Error")
  }
})
// user
app.get("/user", async (req, res) => {
  const userName = req.body.firstName;
  try {
    //const userreq = await User.findOne({firstName:userName}); paticular in obj
    // const userreq = await User.find({firstName:userName});in an array
    //const userreq = await User.find({});all it give
    //const userreq = await User.findOne({}); any one it give
    if (userreq.length != 0) {
      res.send(userreq);
    }
  }
  catch (err) {
    res.status(400).send("failed");
  }
})
// delete
app.delete("/delete", async (req, res) => {
  try {
    const id = req.body.id;
    const deleteUser = await User.findByIdAndDelete(id);
    res.send("sucess")
  }
  catch (err) {
    res.status(404).send("failed");
  }
})

app.patch("/update", async (req, res) => {
  const id = req.body.id;
  const update = req.body.update;
  try {
    const result = await User.findByIdAndUpdate(id, update);
    res.send("sucess update")
  } catch (err) {
    res.status(404).send("failed");
  }
});
app.get("/profile", userauth, async(req,res) => {
  // userauth middleware say when route recive and next handle middleware handle it if valid pass if not return
   try{

    const user = req.user;// recived from auth middleware
    res.send(user)
   }
   catch(err){
      res.status(404).send(err.message);
   }
})
{/*
  "password":"jeeevithaChandru@123",
  "email":"jeevithachandrubabu@12gmail.com",
  */}
