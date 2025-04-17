const express = require("express")
const profileRouter = express.Router();
const { userauth } = require("../middleware/auth");
const { onupdatecheck } = require("../utils/validation")
const validator = require("validator")
const bcrypt = require("bcrypt")
// universal check

profileRouter.get("/profile", userauth, async (req, res) => {
   // userauth middleware say when route recive and next handle middleware handle it if valid pass if not return
   try {
      const user = req.user;// recived from auth middleware
      res.send(user)
   }
   catch (err) {
      res.status(404).send(err.message);
   }
})


profileRouter.patch("/profile/update", userauth, async (req, res) => {

   try {
      // validate datas
      if (!onupdatecheck(req)) {
         throw new Error("details are not valid");
      }

      // update
      const loggeduser = req.user;
      Object.keys(req.body).forEach((key) => loggeduser[key] = req.body[key])
      await loggeduser.save();
      // res send
      res.json({
         success: true,
         message: "User updated successfully",
         user: loggeduser
      });
   } catch (err) {
      res.status(404).send(err.message);
   }
})


profileRouter.patch("/profile/password",userauth,async (req,res) => { 
   try{
      const { oldpassword,newpassword } = req.body;
      if(!newpassword || !oldpassword){
         throw new Error("details are not present")
      }
      if(oldpassword == newpassword){
         throw new Error("details must be new")
      }
      
      const user = req.user;
      
      // check old password is valid
      const matched = await user.valids(oldpassword);
      if(!matched){
         throw new Error("Password is wrong") 
      }
      // check new password are valid
      if(!validator.isStrongPassword(newpassword)){
         throw new Error("details is weaker") 
      }
      user.password = await bcrypt.hash(newpassword,15);
     
      // save
      const save = user.save();
      res.json({
         message:"succes of change",
         user : user
      })
   }catch(err){
     res.status(404).send({message:err.message})
   }
   
})
module.exports = {
   profileRouter,
}