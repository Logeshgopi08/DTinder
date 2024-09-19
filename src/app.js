const express = require("express");
const { AdminAuth } = require("./middlewares/auth");
const connectDb = require("./config/database");
const User = require("./models/user");
const { Types } = require("mongoose");

const app = express();

app.post('/signup', async(req,res)=>{

    //This is instance of the User Model
    const users = new User({
        firstName:"vijay",
        lastName:"Thalapathy",
        emailID:"thalapathy.com",
        password:"1224387"
    });

    try {
        await users.save();
        res.send("User created Successfully!!");
    } catch (error) {
        res.send("Something went Wrong"+ error)
    }
})

connectDb().then(()=>{
    console.log("Database is connected");
    
    app.listen(3500,()=>{
        console.log("Server is listening on 3500.. ");
        
    });
}).catch((err)=>{
    console.log("Database is Not connected");
    console.log(err);
    
});


