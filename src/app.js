const express = require("express");
const { AdminAuth } = require("./middlewares/auth");

const app = express();

app.use("/",(err,req,res,next)=>{
    if(err)
    {res.status(404).send("Sorry,Something went Wrong:404 Error");}
    
});


app.use("/admin",AdminAuth);

app.use("/user",(req,res,next)=>{
    console.log("user router is clicked");
    
    res.send("user router ");
})

app.use("/admin/getData",(req,res,next)=>{
    throw new Error("j,bdih");
    res.send("Data is here");
});

app.use("/admin/userdata",(req,res,next)=>{
    res.send("userDAta is here");
});

app.use("/",(err,req,res,next)=>{
    if(err)
    {res.status(404).send("Sorry,Something went Wrong:404 Error");}
    
});


app.listen(3500,()=>{
    console.log("Server is listening on 3500.. ");
    
})