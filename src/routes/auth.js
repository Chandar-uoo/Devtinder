const express = require("express");
const authRouter = express.Router();
const {validations} = require("../utils/validation");
const User = require("../models/user")
const bcrypt = require("bcrypt")
const cookieparser = require("cookie-parser");
const Jwt = require("jsonwebtoken");

authRouter.use(express.json());
authRouter.use(cookieparser())
// signup
authRouter.post("/signup", async (req, res) => {
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
authRouter.get("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("invalid")
      }
      // for read purpse the verify is sent to mosel schem
      const keyvalid = await user.valids(password);
      if (!keyvalid) {
        throw new Error("invalid")
      }
      else { // jwt token consit of three its mssg + somekey + expire date
           const token = await user.getJwt();
           res.cookie("token",token,{expires:new Date(Date.now()+8*3000000)});
           res.send(user.firstName +"is login")
      }
    }
    catch (err) {
      res.status(404).send(err.message + "Error")
    }
  })

  // logout 
  authRouter.post("/logout",function (req,res) {
    res.cookie("token",null,{expires: new Date(Date.now())})
    res.send("sucessfull logout")
  })
  
  module.exports= {
    authRouter,
  }