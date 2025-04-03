const express = require("express");
const requestRouter = express.Router();
const {userauth} = require("../middleware/auth");
const connectionrequestSchema =require("../models/connectionRequestmodel");

 // send request thing
requestRouter.post("/connectionrequest/:status/:touserid",userauth, async (req,res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.touserid;
        const status = req.params.status;
        const allowedstatus = ["Interested","Igonore"];

        if(!allowedstatus.includes(status)){
            throw new Error("send request invalid");    
        }
        if(fromUserId == toUserId){
           throw new Error("its is wrong way of sending") 
        }
        const alreadyPresent = await connectionrequestSchema.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        })
        if(alreadyPresent){
           return res.status(400).send({message : " invalid already present"})
        }
        
        const connectionrequest = new connectionrequestSchema({
            fromUserId,
            toUserId,
            status
        });
        await connectionrequest.save();
        res.json({
            message:"sucessfull requuest sent",
            apiDetails :connectionrequest
        });
    }catch(err){
        res.status(404).send(err.message)
    }
})
  // reciving request respond
requestRouter.post("/connectionRequest/reveiw/:status/:requestUserId",userauth,async (req,res) => {
      try{
        const {status,requestUserId} = req.params;
      const allowedstatus = ["accepted","rejected"];

      if(!allowedstatus.includes(status)){
        return res.status(404).send({message :'invalid request'});
      }
      const user = req.user;
      console.log(requestUserId)
      const requestfind = await connectionrequestSchema.findOne({
        _id:requestUserId,
        toUserId:user._id,
        status:"Interested"
      });
      if(!requestfind){
        return res.status(404).send({message :'not findable'});
      }
      requestfind.status = status;
      const datas = await requestfind.save();
      res.send({
        message:"its accepted",
        datas
      })
      }catch(err){
        res.status(404).send(err.message)
      }

})
module.exports ={ 
    requestRouter,
}