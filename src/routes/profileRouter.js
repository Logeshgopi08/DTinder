const express = require("express");
const profileRouter = express.Router();
const {UserAuth} = require("../middlewares/auth");
const { validateEditProfileData } = require("../utlis/validation");


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

  profileRouter.patch("/profile/edit",UserAuth,async(req, res)=>{

    try {
      
        if(!validateEditProfileData(req)) {
          throw new Error ("Invalid Edit Request");
        }

        const loggedUser = req.user;
        
        // console.log(req.body
        Object.keys(req.body).forEach((key)=>(loggedUser[key]= req.body[key]));

        await loggedUser.save();

        res.json({
          "message": `${loggedUser.firstName}, updated the Profile Succesfully`,
          "data" : loggedUser
        });
    } catch (error) {
        res.status(400).send("Error :" + error.message);
    }
  });

  module.exports = profileRouter;