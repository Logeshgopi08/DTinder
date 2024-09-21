const express = require("express");
const { AdminAuth } = require("./middlewares/auth");
const connectDb = require("./config/database");
const User = require("./models/user");
const { Types } = require("mongoose");
const { validateSignUpData } = require("./utlis/validation");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const Jwt = require("jsonwebtoken");
const { UserAuth } = require("./middlewares/auth");
const getJWT  = require("./models/user");
const validatePassword = require("./models/user");

const app = express();

app.use(express.json());
app.use(cookieparser());

app.post("/signup", async (req, res) => {
  console.log(req.body);

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

app.post("/login", async (req, res) => {
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

app.get("/profile", UserAuth, async (req, res) => {
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

app.post("/sendrequestconnection", UserAuth, async (req, res) => {
  console.log(" Sent Request");

  res.send("Connection Request  send");
});

connectDb()
  .then(() => {
    console.log("Database is connected");

    app.listen(3500, () => {
      console.log("Server is listening on 3500.. ");
    });
  })
  .catch((err) => {
    console.log("Database is Not connected");
    console.log(err);
  });
