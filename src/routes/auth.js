const express = require("express");
const authRouter = express.Router();
const { validations } = require("../utils/validation");
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
    const token = await user.getJwt();
    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3000000) });
    res.send("sucess da boi")
  }
  catch (err) {
    res.status(404).send(err.message + "Error")
  }
});

// login 
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("invalid credentilas")
    }
    // for read purpse the verify is sent to mosel schem
    const keyvalid = await user.valids(password);
    if (!keyvalid) {
      throw new Error("invalid credentilas")
    }
    else { // jwt token consit of three its mssg + somekey + expire date
      const token = await user.getJwt();
      res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3000000) });
      res.send(user)
    }
  }
  catch (err) {
    res.status(404).send(err.message)
  }
})

// logout 
authRouter.post("/logout", function (req, res) {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
  res.status(200).json({ message: "Successfully logged out" });
})

module.exports = {
  authRouter,
}