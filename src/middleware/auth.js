 const Jwt = require("jsonwebtoken");
 const User = require("../models/user");
  const userauth = async(req, res, next) => { // this is only for /admin if this not then not even a singline ,iddleware will execute
   try {
    const {token}= req.cookies;
    if(!token){
      res.status(404).send(" please login Bro")
    }
    const decodemessage = await Jwt.verify(token,"DEVTINDER@123");
    const {id} = decodemessage;
    const user = await User.findById({_id:id});
    if(!user){
      throw new Error("err" + err.message);
    }else{
      // attach the user to req body
      req.user = user;
      next();
    }
   } catch (err) {
    res.status(404).send(err.message);
   }
  };
  module.exports = {
    userauth,
  };