const express = require("express");
const requestRouter = express.Router();
const {UserAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", UserAuth, async (req, res) => {
   
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        console.log(toUserId);
        
         
        const allowedStatus = ["interested","ignored"];

        if(!allowedStatus.includes(status)){
          return  res.status(400).json({message:"Invalid Status Type "+ status});
        };

        const toUser = await User.findById(toUserId);
        console.log(toUser);
        
        if(!toUser){
         return res.status(400).json({message:"User Not Found"});
        };

        const existingConnection = await ConnectionRequest.findOne({
          $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
          ]
        });

        if(existingConnection){
         return res.status(400).json({message:"Connection Request Already Send !!"});
        }

        const connectionRequest = new ConnectionRequest({
          fromUserId,
          toUserId,
          status
        });

        const connectionData = await connectionRequest.save();

        res.json({
          message:req.user.firstName + " is " + status + " in " + toUser.firstName,
          connectionData
        })

    } catch (error) {
        res.status(400).json({message:"Error" + error.message});
    }
  });

requestRouter.post("/request/review/:status/:requestId",UserAuth,async(req,res)=>{

 try {
  const loggedInuser = req.user;
  const {status,requestId} = req.params;

  const allowedStatus = ["accepted","rejected"];

  if(!allowedStatus.includes(status)){
     return res.status(400).json({message:"Invalid Request Type " +status});
  }

  const connectionRequest = await ConnectionRequest.findOne({
    _id:requestId,
    toUserId:loggedInuser._id,
    status:"interested"
  });

  if(!connectionRequest){
    return res.status(400).json({message:"No Connection Request found"});
  }

  connectionRequest.status = status;

   const data = await connectionRequest.save();
  res.json({
    message:"Connection request" + status,data
  })
  
 } catch (error) {
  res.status(400).json({message:"Error :" + error.message});
 }

});

  module.exports = requestRouter;