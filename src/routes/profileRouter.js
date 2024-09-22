const express = require("express");
const profileRouter = express.Router();
const {UserAuth} = require("../middlewares/auth");


profileRouter.get("/profile/view", UserAuth, async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        throw new Error("User not Found");
      }
  
      res.send(user);
    } catch (error) {
      res.status(404).send("Error " + error.message);
    }
  });

  module.exports = profileRouter;