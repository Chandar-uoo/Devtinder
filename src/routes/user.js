const express = require("express");
const userRouter = express.Router();
const {userauth} = require("../middleware/auth")
const connectionrequest = require("../models/connectionRequestmodel")
const User = require("../models/user")


// recived for you
userRouter.get("/user/request/receveid",userauth,async (req,res) => {
    try{
       const curruser = req.user;
       const findrequest =  await connectionrequest.find({
        toUserId:curruser._id,
        status : "Interested"
       }).populate("fromUserId",["firstName","lastName"]);
       res.json({
        message : "received request",
        pending : findrequest
       })

    }   catch(err){
        res.status(404).send({message :err.message})
    } 
})
// matched 
userRouter.get("/user/connection",userauth ,async (req,res) => {
    try {
        const loggeduser = req.user._id;
        // colletion of send and recived
        const findconnection = await connectionrequest.find({
            $or:[
                {toUserId :loggeduser,status :"accepted"},
                {fromUserId :loggeduser,status :"accepted"}
            ]
        }).populate("fromUserId",["firstName","lastName"]).populate("toUserId",["firstName","lastName"]);
            // yhis remove for unnecessary detail ike your id 
          const data = findconnection.map((row)=>{
            if(row.fromUserId.toString() == loggeduser){
                return row.toUserId
            }
            return row.fromUserId
          }   
        );

        res.json({
            message : "received request",
            pending : data
           })
    } catch (err) {
        res.status(404).send({message :err.message})
    }
})

// feed excluding connection and ignore
userRouter.get("/feed",userauth,async (req,res) => {
    try {
        // pagination
        const skip = (req.query.page) || 0;
        let limit = (req.query.limit) || 10
        limit > 50 ? 50 : limit;

        const loggeduser = req.user._id;
        const connectionpeople = await  connectionrequest.find({
            $or:[{ fromUserId:loggeduser},{ toUserId:loggeduser}]}
    ).select("fromUserId toUserId");

    const hideUser = new Set();
    connectionpeople.forEach((req)=>{
        hideUser.add(req.fromUserId.toString());
        hideUser.add(req.toUserId.toString())
    })
    const user = await User.find({
        $and:[{
            _id : {$nin : Array.from(hideUser)}
        },
        {_id:{$ne : loggeduser}}
    ]
    }).select("firstName lastName age gender about photo")
    res.send(user).skip(skip).limit(limit)
    } catch (err) {
        res.status(404).send({message :err.message})
    }
    
})
module.exports = {
    userRouter,
};