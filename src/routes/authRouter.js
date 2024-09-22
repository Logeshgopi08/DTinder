const express = require("express");

const authRouter = express.Router();
const {validateSignUpData} = require("../utlis/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validatePassword = require("../models/user");

authRouter.post("/signup", async (req, res) => {
    
    try {
      validateSignUpData(req);
  
      const { firstName, lastName, emailID, password } = req.body;
  
      const passwordhash = await bcrypt.hash(password, 10);
  
      //This is instance of the User Model
      const users = new User({
        firstName,
        lastName,
        emailID,
        password: passwordhash,
      });
  
      await users.save();
      res.send("User created Successfully!!");
    } catch (error) {
      res.send("Something went Wrong" + error);
    }
  });

  authRouter.post("/login", async (req, res) => {
    try {
      const { emailID, password } = req.body;
      const user = await User.findOne({ emailID: emailID });
      if (!user) {
        throw new Error("Account is Not Found");
      }
      const isValidPassword = await user.validatePassword(password);
  
      if (isValidPassword) {
        const token = await  user.getJWT();
        if(!token){
          throw new Error("token not created");
        }
        
        res.cookie("token", token);
  
        res.send("Login Successfully!!!");
      } else {
        res.status(404).send("Password is Not valid");
      }
    } catch (error) {
      res.status(404).send("ERROR " + error.message);
    }
  });

  module.exports = authRouter;