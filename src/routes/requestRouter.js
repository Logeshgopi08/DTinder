const express = require("express");
const requestRouter = express.Router();
const {UserAuth} = require("../middlewares/auth")

requestRouter.post("/sendrequestconnection", UserAuth, async (req, res) => {
    console.log(" Sent Request");
  
    res.send("Connection Request  send");
  });

  module.exports = requestRouter;